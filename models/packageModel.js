const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const packageSchema = mongoose.Schema(
  {
    packageService: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Please provide a package service"],
    },
    packageTitle: {
      type: String,
      required: [true, "Please provide a package title"],
    },
    packageDescription: {
      type: String,
      required: [true, "Please provide a package description"],
    },
    packagePrice: {
      type: Number,
      required: [true, "Please provide a package price"],
    },
    packageStatus: {
      type: Boolean,
      default: true,
    },
    packageCoverImage: {
      type: String,
    },
    packageImages: [
      {
        type: String,
      },
    ],
    packageVideos: [
      {
        type: String,
      },
    ],
    packageBookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Package", packageSchema);
