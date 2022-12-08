const router = require("express").Router();
const model = require("../models");
const database = require("../config")
router.get("/", async (req, res) => {
  const {Product} = database
  try {
    const get = await Product.get();
    // const products = await model.product.find({});
    return res.json({ get });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
