const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = mongoose.Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the customer ID"],
    },
    bookingId: {
      type: String,
      required: [true, "Please provide the booking ID"],
    },
    payment: {
      type: String,
      required: [true, "Please provide the payment booking status"],
      enum: ["COD", "ADVANCE", "FULL", "REFUNDED"],
      default: "COD",
    },
    paymentAmount: {
      required: [true, "Please provide booking price"],
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
