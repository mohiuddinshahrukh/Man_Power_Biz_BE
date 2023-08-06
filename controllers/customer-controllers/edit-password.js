const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const editPassword = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      return res.json({
        status: 400,
        error: true,
        msg: "id is a required parameter",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.json({
        status: 400,
        error: true,
        msg: "id is not of the type mongoose object id",
      });
    }

    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.json({
        status: 400,
        error: true,
        msg: "No user exists against given id",
      });
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.json({
        status: 400,
        error: true,
        msg: "Current password & New password are required",
      });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );
    if (!passwordMatch) {
      return res.json({
        status: 400,
        error: true,
        msg: "Your current password does not match the stored password.",
      });
    }

    if (newPassword === currentPassword) {
      return res.json({
        status: 400,
        error: true,
        msg: "Current password and new password cannot be the same.",
      });
    }

    const salt = await bcrypt.genSalt(10); // Using the existing user's salt
    console.log("WTF IS THIS SALT?", salt);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({
        status: 400,
        error: true,
        msg: "The user couldn't be updated",
      });
    }

    return res.json({
      status: 200,
      error: false,
      data: updatedUser,
      msg: "User password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      error: true,
      msg: "An error occurred",
    });
  }
});

module.exports = editPassword;
