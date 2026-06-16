# Firebase Security Rules for Jefram Stores

This document outlines the recommended Firebase Firestore security rules for the Jefram Stores e-commerce application.

## Critical Security Note

**Your Firebase API keys are currently exposed in the frontend code.** While this is common for Firebase web apps, it's critical to implement proper security rules to prevent unauthorized access to your database.

## Recommended Security Rules

Copy these rules to your Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Configuration - Only readable by everyone, writable by authenticated admins
    match /config/{document} {
      allow read: if true;
      allow write: if request.auth != null && isAdmin(request.auth.uid);
    }
    
    // Products - Readable by everyone, writable by authenticated admins
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && isAdmin(request.auth.uid);
    }
    
    // Categories - Readable by everyone, writable by authenticated admins
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && isAdmin(request.auth.uid);
    }
    
    // Customers - Users can read/write their own data, admins can read all
    match /customers/{customerId} {
      allow read: if request.auth != null && 
                  (request.auth.uid == customerId || isAdmin(request.auth.uid));
      allow write: if request.auth != null && request.auth.uid == customerId;
      allow create: if request.auth != null; // Allow registration
    }
    
    // Orders - Customers can read their own orders, admins can read/write all
    match /orders/{orderId} {
      allow read: if request.auth != null && 
                  (isOrderOwner(orderId, request.auth.uid) || isAdmin(request.auth.uid));
      allow create: if request.auth != null; // Allow customers to create orders
      allow update: if request.auth != null && isAdmin(request.auth.uid); // Only admins can update status
      allow delete: if false; // Prevent deletion
    }
    
    // Admins - Only readable/writable by existing admins
    match /admins/{adminId} {
      allow read: if request.auth != null && isAdmin(request.auth.uid);
      allow write: if false; // Use Firebase Console or Cloud Functions to create admins
    }
    
    // Coupons - Readable by everyone, writable by admins
    match /coupons/{couponId} {
      allow read: if true;
      allow write: if request.auth != null && isAdmin(request.auth.uid);
    }
    
    // Reviews - Readable by everyone, writable by authenticated users
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                           request.auth.uid == resource.data.userId;
    }
  }
}

// Helper functions
function isAdmin(uid) {
  // Check if user is in admins collection
  return exists(/databases/$(database)/documents/admins/$(uid));
}

function isOrderOwner(orderId, uid) {
  // Check if order belongs to the user
  return get(/databases/$(database)/documents/orders/$(orderId)).data.customer.phone == 
         get(/databases/$(database)/documents/customers/$(uid)).data.phone;
}
```

## Implementation Steps

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: jefram-stores
3. **Navigate to Firestore Database**: Click on "Firestore Database" in the left menu
4. **Go to Rules tab**: Click on the "Rules" tab
5. **Replace existing rules**: Copy the rules above and replace the existing rules
6. **Publish changes**: Click "Publish" to apply the new rules

## Additional Security Recommendations

### 1. Use Firebase Authentication
Currently, the app uses custom user management. Consider migrating to Firebase Authentication for better security:
- Email/password authentication
- Phone authentication
- Google sign-in

### 2. Implement Cloud Functions
For sensitive operations, use Firebase Cloud Functions:
- Payment processing
- Email notifications
- Order status updates
- Admin user creation

### 3. Restrict API Key Usage
In Google Cloud Console:
1. Go to API & Services → Credentials
2. Edit your Firebase API key
3. Set application restrictions (HTTP referrers, IP addresses)
4. Set API restrictions (only enable required APIs)

### 4. Enable App Check
Firebase App Check helps protect your backend resources:
- Prevents abuse from unauthorized apps
- Works with reCAPTCHA, Device Check, and App Attest

### 5. Monitor Database Usage
Set up alerts for:
- Unusual read/write patterns
- High database usage
- Failed authentication attempts

## Testing Security Rules

After implementing the rules, test them:

1. **Test public access**: Try accessing products without authentication (should work)
2. **Test admin protection**: Try modifying products without admin access (should fail)
3. **Test customer data**: Try accessing another customer's data (should fail)
4. **Test order creation**: Try creating an order as a customer (should work)

## Migration Notes

**Important**: After implementing these rules, you'll need to:

1. **Recreate admin users**: The current plain-text passwords won't work with the new security model. Use the updated `create-admin.html` which now hashes passwords.

2. **Update admin collection**: The security rules expect admin documents to have the same ID as the Firebase Auth UID. You'll need to either:
   - Use Firebase Authentication for admin users
   - Modify the security rules to work with your current custom admin system

3. **Test thoroughly**: Test all user flows after implementing the rules to ensure nothing breaks.

## Current Admin System Note

Your current admin system uses custom authentication (username/password stored in Firestore). The security rules above assume Firebase Authentication. To use your current system, modify the `isAdmin()` function:

```javascript
function isAdmin(uid) {
  // For custom admin system, check if user is logged in as admin
  // This requires passing admin session info differently
  return request.auth != null; // Simplified - adjust based on your auth system
}
```

**Recommendation**: Migrate to Firebase Authentication for better security and simpler rule management.
