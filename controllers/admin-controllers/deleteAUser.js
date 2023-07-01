const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const __isEqual = require("lodash.isequal");
const __isEmpty = require("lodash.isempty");

const deleteUser = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a user id to update a user`,
      });
    } else {
      const userToDelete = await User.findById(req.params.id);
      if (!userToDelete) {
        res.json({
          status: 400,
          error: true,
          msg: `A user with the given id doesn't exist`,
        });
      } else {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
          res.json({
            status: 400,
            error: true,
            msg: `User couldn't be deleted`,
          });
        } else {
          res.json({
            status: 200,
            data: deletedUser,
            error: false,
            msg: `User deleted successfully`,
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

module.exports = { deleteUser };
