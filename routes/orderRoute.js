const router = require("express").Router();
const Order = require("../models/order.js");
router.post("/", async (req, res) => {
  try {
    await new Order(req.body).save();
    res.status(200).send({ message: "Orders details are stored" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
module.exports = router;
