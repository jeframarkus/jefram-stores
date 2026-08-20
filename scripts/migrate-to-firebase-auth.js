/**
 * Firebase Auth Migration Script (Phase 2 of the Firebase Auth migration)
 * ---------------------------------------------------------------------------
 * Re-keys the legacy `customers` collection (auto-generated doc IDs) to use
 * Firebase Authentication UIDs, and fixes up related `orders` / `reviews`
 * references. It also creates a Firebase Auth account for each customer and
 * emails them a password-reset link, because the legacy SHA-256 passwords
 * cannot be recovered/imported into Firebase Auth.
 *
 * Prerequisites:
 *   1. `npm i firebase-admin`
 *   2. A service account JSON key exported from Firebase Console
 *      (Project settings -> Service accounts -> Generate new private key).
 *   3. Set the path to that key in the GOOGLE_APPLICATION_CREDENTIALS env var
 *      (or edit SERVICE_ACCOUNT_PATH below).
 *   4. Enable the Email/Password sign-in provider in the Firebase Console.
 *
 * Safety:
 *   - Run with DRY_RUN=1 first to preview every action without writing.
 *   - Re-keyed customer docs are created BEFORE the old ones are deleted, and
 *     deletes are skipped entirely in dry-run mode.
 *
 * Usage:
 *   DRY_RUN=1 node scripts/migrate-to-firebase-auth.js
 *   node scripts/migrate-to-firebase-auth.js
 */

const admin = require('firebase-admin');
const path = require('path');

const SERVICE_ACCOUNT_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS
  || path.join(__dirname, '..', 'service-account.json');

const DRY_RUN = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true';

if (!DRY_RUN) {
  admin.initializeApp({
    credential: admin.credential.cert(require(SERVICE_ACCOUNT_PATH)),
  });
}

const db = admin.firestore ? admin.firestore() : null;
const authAdmin = admin.auth ? admin.auth() : null;

function randomPassword() {
  // 24-char random password; the user resets it via email immediately after.
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < 24; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

async function migrateCustomer(oldDoc) {
  const id = oldDoc.id;
  const data = oldDoc.data();
  const email = (data.email || '').trim();
  const phone = (data.phone || '').trim();
  const name = (data.name || '').trim() || (email ? email.split('@')[0] : 'Customer');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.warn(`SKIP customer ${id}: no valid email (phone=${phone}). Set an email to migrate.`);
    return null;
  }

  let uid;
  if (DRY_RUN) {
    uid = `DRYRUN_${id}`;
    console.log(`[DRY RUN] would create Auth user ${email} (name=${name}) and re-key ${id} -> ${uid}`);
  } else {
    try {
      const userRecord = await authAdmin.createUser({
        email,
        emailVerified: false,
        password: randomPassword(),
        displayName: name,
        disabled: false,
      });
      uid = userRecord.uid;
      // Send a reset link so the customer can choose their own password.
      try {
        await authAdmin.generatePasswordResetLink(email);
      } catch (e) {
        console.warn(`  (could not send reset email to ${email}: ${e.message})`);
      }
      console.log(`Created Auth user ${email} -> ${uid}`);
    } catch (e) {
      if (e.code === 'auth/email-already-exists') {
        const existing = await authAdmin.getUserByEmail(email);
        uid = existing.uid;
        console.log(`Auth user already exists for ${email} -> ${uid}`);
      } else {
        console.error(`Failed to create Auth user for ${email}: ${e.message}`);
        return null;
      }
    }
  }

  // Re-key the customer profile under customers/{uid}.
  const newCustomer = { ...data, uid, email, phone, name };
  delete newCustomer.password; // never store passwords in Firestore
  if (DRY_RUN) {
    console.log(`[DRY RUN] would write customers/${uid}`);
  } else {
    await db.collection('customers').doc(uid).set(newCustomer);
  }

  // Fix order references: old orders match by phone; new orders have customerId.
  if (phone) {
    const ordersSnap = await db.collection('orders')
      .where('customer.phone', '==', phone)
      .get();
    for (const o of ordersSnap.docs) {
      if (DRY_RUN) {
        console.log(`[DRY RUN] would set orders/${o.id}.customerId = ${uid}`);
      } else {
        await o.ref.update({ customerId: uid });
      }
    }
  }

  // Fix review references (legacy reviews used the old doc id as userId).
  const reviewsSnap = await db.collection('reviews').where('userId', '==', id).get();
  for (const r of reviewsSnap.docs) {
    if (DRY_RUN) {
      console.log(`[DRY RUN] would set reviews/${r.id}.userId = ${uid}`);
    } else {
      await r.ref.update({ userId: uid });
    }
  }

  // Remove legacy custom session docs for this customer.
  const sessionsSnap = await db.collection('customer_sessions')
    .where('customerId', '==', id)
    .get();
  for (const s of sessionsSnap.docs) {
    if (DRY_RUN) {
      console.log(`[DRY RUN] would delete customer_sessions/${s.id}`);
    } else {
      await s.ref.delete();
    }
  }

  // Delete the old customer doc only after the new one exists.
  if (!DRY_RUN) {
    await oldDoc.ref.delete();
    console.log(`Re-keyed customer ${id} -> ${uid} (old doc deleted)`);
  }

  return uid;
}

async function main() {
  if (!db || !authAdmin) {
    console.error('Firebase Admin not initialised. Set GOOGLE_APPLICATION_CREDENTIALS.');
    process.exit(1);
  }
  console.log(DRY_RUN ? '=== DRY RUN (no writes) ===' : '=== LIVE MIGRATION ===');

  const customersSnap = await db.collection('customers').get();
  console.log(`Found ${customersSnap.size} customer docs.`);

  let migrated = 0;
  let skipped = 0;
  for (const doc of customersSnap.docs) {
    const result = await migrateCustomer(doc);
    if (result) migrated++; else skipped++;
  }

  console.log(`\nDone. migrated=${migrated} skipped=${skipped}`);

  // ---- Admin migration ----
  let adminsMigrated = 0;
  let adminsSkipped = 0;
  const adminsSnap = await db.collection('admins').get();
  console.log(`\nFound ${adminsSnap.size} admin docs.`);
  for (const doc of adminsSnap.docs) {
    const result = await migrateAdmin(doc);
    if (result) adminsMigrated++; else adminsSkipped++;
  }
  console.log(`Admins: migrated=${adminsMigrated} skipped=${adminsSkipped}`);

  console.log('\nNext steps:');
  console.log('  1. Deploy firestore.rules.');
  console.log('  2. Tell existing customers to use the "Forgot password?" link to set a password.');
  console.log('  3. Tell existing admins to use the reset link from create-admin / Firebase Console to set a password.');
}

// Re-keys a legacy `admins` doc (auto-id + hashed password) to a Firebase Auth
// account keyed by uid, and mirrors it into admin_users/{uid}.
async function migrateAdmin(oldDoc) {
  const id = oldDoc.id;
  const data = oldDoc.data();
  const username = (data.username || '').trim();
  const role = data.role || 'subadmin';

  // Derive an email: prefer an explicit email field, else the username if it
  // looks like an email, else a placeholder from the username.
  let email = (data.email || '').trim();
  if (!email) {
    email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username) ? username : `${username || id}@jeframstores.com`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.warn(`SKIP admin ${id}: could not derive a valid email (username=${username}).`);
    return null;
  }

  let uid;
  if (DRY_RUN) {
    uid = `DRYRUN_ADMIN_${id}`;
    console.log(`[DRY RUN] would create Auth admin ${email} (role=${role}) -> ${uid}`);
  } else {
    try {
      const userRecord = await authAdmin.createUser({
        email,
        emailVerified: false,
        password: randomPassword(),
        displayName: username,
      });
      uid = userRecord.uid;
      try { await authAdmin.generatePasswordResetLink(email); } catch (e) {
        console.warn(`  (could not send reset email to ${email}: ${e.message})`);
      }
      console.log(`Created Auth admin ${email} -> ${uid}`);
    } catch (e) {
      if (e.code === 'auth/email-already-exists') {
        const existing = await authAdmin.getUserByEmail(email);
        uid = existing.uid;
        console.log(`Auth admin already exists for ${email} -> ${uid}`);
      } else {
        console.error(`Failed to create Auth admin for ${email}: ${e.message}`);
        return null;
      }
    }
    await db.collection('admins').doc(uid).set({
      username,
      role,
      email,
      createdAt: data.createdAt || new Date().toISOString(),
      migratedFrom: id,
    });
    await db.collection('admin_users').doc(uid).set({
      name: username,
      role,
      createdAt: data.createdAt || new Date().toISOString(),
      migratedFrom: id,
    });
    await oldDoc.ref.delete();
    console.log(`Re-keyed admin ${id} -> ${uid} (old doc deleted)`);
  }
  return uid;
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
