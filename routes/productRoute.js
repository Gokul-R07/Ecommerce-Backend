const router = require("express").Router();
const Product = require("../models/products.js");
router.post("/add", async (req, res) => {
  try {
    await new Product(req.body).save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
});
router.get("/get", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
});
module.exports = router;
