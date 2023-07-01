const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const __isEqual = require("lodash.isequal");
const __isEmpty = require("lodash.isempty");

const updateUser = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a user id to update a user`,
      });
    } else if (__isEmpty(req.body)) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide required data to update a user`,
      });
    } else {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.json({
          status: 400,
          error: true,
          msg: `A user with the id: ${req.params.id} couldn't be found!`,
        });
      } else {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        ).select("-password");
        if (!updatedUser) {
          res.json({
            status: 400,
            error: true,
            msg: `User could not be updated in find and update`,
          });
        } else if (__isEqual(updatedUser, req.body)) {
          res.json({
            status: 400,
            error: true,
            msg: `User updated but old values and new values are the same`,
          });
        } else {
          res.json({
            status: 200,
            data: updatedUser,
            error: false,
            msg: `User updated successfully!`,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      error: true,
      msg: `The following error occurred: ${err}`,
    });
  }
});
module.exports = { updateUser };
