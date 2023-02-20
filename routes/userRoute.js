const router = require("express").Router();
const User = require("../models/user.js");
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "Email already exits" });

    let newUser;
    if (req.body.email == "admin@gmail.com") {
      newUser = { ...req.body, isAdmin: true };
    } else {
      newUser = { ...req.body, isAdmin: false };
    }
    await new User(newUser).save();
    
    res.status(200).send({ message: "User created  successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});
module.exports = router;
