const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(
  "sk_test_51LZZvfE15s0GgNMh7grQVCHvbVX5RUp49ZAZ4e2nko9gkFeCLr8qcAR5HIPdzlhU3ZYbxHD7HtKZ1OUbin1LnJiP00VGDxvZZm"
);
const createPaymentIntent = asyncHandler(async (req, res) => {
  try {
    const { amount, currency, customer, email } = req.body;
    if (!amount) {
      res.json({
        status: 400,
        error: true,
        msg: `Amount is required to make payment`,
      });
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        receipt_email: email,
        currency: currency ? currency : "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      if (!paymentIntent) {
        res.json({
          status: 400,
          error: true,
          msg: `Couldn't create payment intent`,
        });
      } else {
        res.json({
          status: 200,
          error: false,
          data: paymentIntent.client_secret,
          fullIntent: paymentIntent,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      error: true,
      msg: `${error}`,
    });
  }
});

module.exports = createPaymentIntent;
