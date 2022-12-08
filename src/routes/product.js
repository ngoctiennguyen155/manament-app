const router = require("express").Router();
const { getDocs } = require("firebase/firestore/lite");
// const model = require("../models");
const database = require("../config");
const { getDatabase, ref, child,set,get } =require("firebase/database");

router.get("/", async (req, res) => {
  // try {
  //   // const { Product } = database;
  //   // const citySnapshot = await getDocs(Product);
  //   // const cityList = citySnapshot.docs.map((doc) => doc.data());
  //   // // const products = await model.product.find({});
  //   // console.log({ cityList });
  //   // return res.json({ a: "123" });
  // } catch (error) {
  //   return res.status(500).send(error);
  // }
  const dbRef = ref(getDatabase());
  get(child(dbRef, `api/products`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return res.json(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
});

module.exports = router;
///https://firebase.google.com/docs/database/web/read-and-write#web-version-9_2
//https://www.youtube.com/watch?v=rWcyvazW5lg