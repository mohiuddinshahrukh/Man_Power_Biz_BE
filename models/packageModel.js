const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const packageSchema = mongoose.Schema(
  {
    packageService: {
      unique: true,
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    packageTitle: {
      type: String,
      required: [true, "Please provide a package title"],
      unique: true,
    },
    pacakgeDescription: {
      type: String,
      required: [true, "Please provide a package description"],
    },
    pakagePrice: {
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
    packageBookings: {},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Package", packageSchema);
