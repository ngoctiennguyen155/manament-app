const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
} = require("firebase/firestore/lite");
const firebaseConfig = {
  apiKey: "AIzaSyB9v21xzh4jvZJeeCK5u1OHPDH9YlpakaA",
  authDomain: "camerark-50b2a.firebaseapp.com",
  databaseURL:
    "https://camerark-50b2a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "camerark-50b2a",
  storageBucket: "camerark-50b2a.appspot.com",
  messagingSenderId: "44127796673",
  appId: "1:44127796673:web:17f7d54e91aecc72c44340",
  measurementId: "G-R4Z735NQ83",
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const User = collection(db, "Users");
const Product = collection(db, "Products");
const Transaction = collection(db, "Transaction");
const ModelProduct = collection(db, "ModelProducts");
const database = {
  User,
  Product,
  Transaction,
  ModelProduct,
};
module.exports = database;
