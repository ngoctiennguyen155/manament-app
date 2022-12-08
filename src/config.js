
const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyB9v21xzh4jvZJeeCK5u1OHPDH9YlpakaA",
  authDomain: "camerark-50b2a.firebaseapp.com",
  databaseURL: "https://camerark-50b2a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "camerark-50b2a",
  storageBucket: "camerark-50b2a.appspot.com",
  messagingSenderId: "44127796673",
  appId: "1:44127796673:web:17f7d54e91aecc72c44340",
  measurementId: "G-R4Z735NQ83"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const User = db.collection("Users")
const Product = db.collection("Products")
const Transaction = db.collection("Transaction")
const ModelProduct = db.collection("ModelProducts")
const database = {
  User,
  Product,
  Transaction,
  ModelProduct
}
module.exports = database