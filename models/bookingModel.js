const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: [true, "Please provide booking ID"],
      unique: true,
    },
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
      type: [Schema.Types.ObjectId],
      ref: "Service",
    },
    bookingPackage: {
      required: [true, "Please provide a package for the booking"],
      type: [Schema.Types.ObjectId],
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

    bookingPaymentStatus: {
      type: String,
      required: [true, "Please provide the payment booking status"],
      enum: ["COD", "ADVANCE", "FULL", "REFUNDED"],
      default: "COD",
    },
    bookingPrice: {
      required: [true, "Please provide booking price"],
      type: Number,
    },
    bookingPaidAmount: {
      type: Number,
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
