
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoNFbS548PhPO1XmfXfDBiSfHzJ5WRvDY",
  authDomain: "jefram-stores.firebaseapp.com",
  projectId: "jefram-stores",
  storageBucket: "jefram-stores.firebasestorage.app",
  messagingSenderId: "669495715459",
  appId: "1:669495715459:web:1d6bedbba9dc27cf8e1db6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const API = "https://script.google.com/macros/s/AKfycby3UPHH1526LrIoHe3cPM7mfiI8jwqzPO1v3hn01vai-QLN2f9tVE2Kzjt67CkGGV6qtg/exec";

let cart = [];
let products = [];
let currentUserPhone = localStorage.getItem("user_phone") || null;
let currentUserDocId = null;

async function loadProducts(){
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    products = [];
    snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
    displayProducts(products);
  } catch(e) {
    console.error('Error loading products:', e);
    // Fallback to API if Firebase fails
    let res = await fetch(API + "?action=getProducts");
    products = await res.json();
    displayProducts(products);
  }
}

function displayProducts(data){
  let html = "";

  data.forEach(p => {
    html += `
      <div class="card">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add</button>
      </div>
    `;
  });

  document.getElementById("products").innerHTML = html;
}

function searchProducts(){
  let q = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(q));
  displayProducts(filtered);
}

async function addToCart(p){
  cart.push(p);
  await saveCartToFirebase();
  renderCart();
}

function renderCart(){
  let html = "";
  let total = 0;

  cart.forEach(c=>{
    html += `${c.name} - ${c.price}<br>`;
    total += Number(c.price);
  });

  html += `<hr>Total: ${total}`;

  document.getElementById("cart").innerHTML = html;
}

async function saveUser(){
  let phone = document.getElementById("phone").value;
  if(!phone) { alert("Enter phone number"); return; }
  try {
    const existing = await getDocs(query(collection(db, 'customers'), where("phone", "==", phone)));
    if (!existing.empty) {
      existing.forEach(d => { currentUserDocId = d.id; });
    } else {
      const docRef = await addDoc(collection(db, 'customers'), { phone, registeredAt: new Date().toISOString(), cart: [] });
      currentUserDocId = docRef.id;
    }
    currentUserPhone = phone;
    localStorage.setItem("user_phone", phone);
    await loadCartFromFirebase();
    alert("Registered!");
  } catch(e) {
    console.error('Error saving user:', e);
    // Fallback to API
    fetch(API + "?action=saveUser&phone=" + phone);
    localStorage.setItem("user_phone", phone);
    alert("Registered!");
  }
}

async function checkout(){
  let phone = currentUserPhone;

  if(!phone){
    alert("Enter phone first");
    return;
  }

  let msg = "Hello Jefram Stores,%0AOrder:%0A";
  let total = 0;

  cart.forEach(c=>{
    msg += `${c.name} - ${c.price}%0A`;
    total += Number(c.price);
  });

  msg += `%0ATotal: ${total}`;

  try {
    await addDoc(collection(db, 'orders'), { customer: { phone }, items: cart, total, status: 'pending', createdAt: new Date().toISOString() });
  } catch(e) {
    console.error('Error saving order:', e);
    // Fallback to API
    fetch(API + `?action=saveOrder&phone=${phone}&items=${encodeURIComponent(JSON.stringify(cart))}&total=${total}`);
  }

  cart = [];
  await saveCartToFirebase();
  renderCart();
  window.open("https://wa.me/256742533656?text=" + msg);
}

async function saveCartToFirebase() {
  if (!db || !currentUserDocId) return;
  try {
    await updateDoc(doc(db, 'customers', currentUserDocId), { cart: cart });
  } catch(e) { console.error('Error saving cart:', e); }
}

async function loadCartFromFirebase() {
  if (!db || !currentUserDocId) return;
  try {
    const docSnap = await getDoc(doc(db, 'customers', currentUserDocId));
    if (docSnap.exists() && docSnap.data().cart) {
      cart = docSnap.data().cart;
      renderCart();
    }
  } catch(e) { console.error('Error loading cart:', e); }
}

if (currentUserPhone) {
  const existing = await getDocs(query(collection(db, 'customers'), where("phone", "==", currentUserPhone)));
  if (!existing.empty) {
    existing.forEach(d => { currentUserDocId = d.id; });
    await loadCartFromFirebase();
  }
}
renderCart();
loadProducts();

