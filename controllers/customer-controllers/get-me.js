const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../../models/userModel");

const getMe = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 400,
        error: true,
        msg: `User id is required to fetch a user`,
      });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({
        status: 400,
        error: true,
        msg: `The provided User Id is not of the type mongoose object id`,
      });
    } else {
      const fetchedUser = await User.findById(id).select("-password");
      if (!fetchedUser) {
        res.json({
          status: 400,
          error: true,
          msg: `No user found against given id`,
        });
      } else {
        res.json({
          status: 200,
          error: false,
          data: fetchedUser,
          msg: `User fetched successfully`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: true,
      msg: `${error}`,
    });
  }
});

module.exports = getMe;
