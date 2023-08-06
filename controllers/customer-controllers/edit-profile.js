const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const mongoose = require("mongoose");

const editProfile = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `An id is required as a parameter`,
      });
    } else {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.json({
          status: 400,
          error: true,
          msg: `The provided id is not of the type mongoose object id`,
        });
      }
    }
  } catch (error) {}
});

module.exports = editProfile;
