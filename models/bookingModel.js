const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = mongoose.Schema(
  {
    bookingCity: {
      required: [true, "Please provide a booking city"],
      type: String,
    },
    bookingZip: {
      required: [true, "Please provide a booking zip"],
      type: String,
    },
    bookingDate: {
      required: [true, "Please provide a booking date"],
      type: Date,
    },
    bookingService: {
      required: [true, "Please provide a service for the booking"],
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    bookingPackage: {
      required: [true, "Please provide a package for the booking"],
      type: Schema.Types.ObjectId,
      ref: "Package",
    },
    bookingCustomer: {
      required: [true, "Please provide a customer for the booking"],
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bookingContactNumber: {
      required: [true, "Please provide a booking contact number"],
      type: String,
    },
    bookingEmailAddress: {
      required: [true, "Please provide a booking email address"],
      type: String,
    },
    bookingDescription: {
      required: [true, "Please provide a booking description"],
      type: String,
    },
    bookingStatus: {
      type: String,
      enum: ["IN PROGRESS", "COMPLETED", "CANCELLED"],
      default: "IN PROGRESS",
      uppercase: true,
    },
    bookingPrice: {
      required: [true, "Please provide booking price"],
      type: Number,
    },
    bookingPaymentStatus: {
      type: String,
      required: [true, "Please provide the payment booking status"],
      enum: ["ADVANCE", "FULL", "REFUNDED"],
      default: "ADVANCE",
    },
    bookingPaidAmount: {
      type: Number,
      required: [true, "Please provide the paid amount"],
    },
    bookingRemainingAmount: {
      type: Number,
      required: [true, "Please provide the remaining amount"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
