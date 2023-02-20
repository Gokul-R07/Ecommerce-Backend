const router = require("express").Router();
const User = require("../models/user.js");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "User not found" });
    if (user.password == req.body.password) {
      return res.status(200).send(user);
    } else return res.status(401).send({ message: "Password is incorrect" });
  } catch (error) {
    res.status(500).send({ message: "Login failed" });
  }
});

module.exports = router;
