const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const serviceCategoryModel = mongoose.Schema(
  {
    categoryTitle: {
      type: String,
      required: [true, "Please provide a service category title"],
      unique: true,
    },
    categoryDescription: {
      type: String,
      required: [true, "Please provide a service category description"],
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The admin id is required to add this data"],
    },
    image: {
      type: [String],
      required: [false, "Please provide cover image for the service category"],
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
    categoryServices: {
      type: [Schema.Types.ObjectId],
      ref: "Service",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ServiceCategory", serviceCategoryModel);
