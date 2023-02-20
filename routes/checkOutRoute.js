const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/add", async (req, res) => {
  try {
    const product = await stripe.products.create({
      name: req.body.productName,
      metadata: {
        brandName: req.body.brandName,
      },
      default_price_data: {
        currency: "inr",
        unit_amount: req.body.price * 100,
      },
    });
    res.status(200).json(product.default_price);
  } catch (error) {
    console.log(error);
  }
});

router.post("/stripe-payment", async (req, res) => {
  const items = req.body.cartItem;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.stripeId,
      quantity: item.qty,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url:
      "https://shopify-site.vercel.app/success=true",
    cancel_url: "https://shopify-site.vercel.app/cancel",
  });
  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

module.exports = router;
