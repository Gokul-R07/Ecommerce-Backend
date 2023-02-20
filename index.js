const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
require("dotenv").config();
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const checkOutRoutes = require("./routes/checkOutRoute");
const orderRoutes = require("./routes/orderRoute");
const productRoutes = require("./routes/productRoute");

//sk_test_51MRaP5SGu4BohUN08MHxckUpwEIn3LAGgSGqqbFP8WUy2JYA4ftWO8aGSk3o0l4iGcjOrrsc71iI7hF7LCzp3Jwr0091KU8rEh

const db = require("./db");
db();

app.use("/register", userRoutes);
app.use("/login", authRoutes);
app.use("/checkout", checkOutRoutes);
app.use("/order", orderRoutes);
app.use("/product", productRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running", port);
});
