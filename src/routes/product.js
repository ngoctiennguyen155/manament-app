const router = require("express").Router();
const { getDocs } = require("firebase/firestore/lite");
// const model = require("../models");
const database = require("../config");
router.get("/", async (req, res) => {
  try {
    const { Product } = database;
    const citySnapshot = await getDocs(Product);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    // const products = await model.product.find({});
    console.log({ cityList });
    return res.json({ a: "123" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
