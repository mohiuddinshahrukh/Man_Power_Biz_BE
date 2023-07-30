const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = mongoose.Schema(
  {
    serviceAddedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a added by id"],
    },
    serviceCategory: {
      type: Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: [true, "Please provide a category id"],
    },
    serviceTitle: {
      unique: true,
      type: String,
      required: [true, "Please provide a service title"],
    },
    serviceDescription: {
      type: String,
      required: [true, "Please provide service description"],
    },
    serviceCity: {
      type: String,
      required: [
        true,
        "Please provide a city for your required service to be registered in",
      ],
    },
    serviceZipCode: [{ type: String }],
    servicePackages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Package",
      },
    ],
    serviceStatus: {
      type: Boolean,
      default: true,
    },
    serviceImages: [{ type: String }],
    serviceVideos: [{ type: String }],
    servicePDF: [{ type: String }],
    serviceCoverImage: {
      type: String,
    },
    serviceAddress: {
      type: String,
      required: [false, "Please provide an address for the service"],
    },
    serviceContactPhone: {
      type: String,
      required: [true, "Please provide a phone number for the service"],
    },
    serviceWhatsAppPhone: {
      type: String,
      required: [true, "Please provide a WhatsApp for the service"],
    },
    serviceInfoEmail: {
      type: String,
      required: [true, "Please provide an email"],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
