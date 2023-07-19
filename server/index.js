const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")('sk_test_51LZZvfE15s0GgNMh7grQVCHvbVX5RUp49ZAZ4e2nko9gkFeCLr8qcAR5HIPdzlhU3ZYbxHD7HtKZ1OUbin1LnJiP00VGDxvZZm');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/urbanservices", () => {
  console.log("do something");
});

app.use("/api/v1/users", require("../routes/userRoutes.js"));
app.use("/api/v1/admin", require("../routes/admin-routes/userRoutes.js"));
app.use("/api/v1/admin/create-payment-intent", async (req, res) => {
  console.log("Request received");
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    status: 404,
  });
});
module.exports = app;
