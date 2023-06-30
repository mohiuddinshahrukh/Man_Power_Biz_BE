const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
    },
    contactNumber: {
      type: String,
      required: [true, "Please provide a contact number"],
    },
    whatsappNumber: {
      type: String,
      required: [true, "Please provide a WhatsApp number"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    userType: {
      type: String,
      required: [true, "Please select a user type"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
