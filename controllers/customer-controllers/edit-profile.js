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
      } else {
        const existingUser = await User.findById(id);
        if (!existingUser) {
          res.json({
            status: 400,
            error: true,
            msg: `The user couldn't be found for the given id`,
          });
        } else {
          const { contactNumber, whatsappNumber } = req.body;
          if (!contactNumber || !whatsappNumber) {
            res.json({
              status: 400,
              error: true,
              msg: `Contact Number & WhatsApp are required parameters`,
            });
          } else {
            const updatedUser = await User.findByIdAndUpdate(
              id,
              {
                contactNumber,
                whatsappNumber,
              },
              {
                new: true,
              }
            );
            if (!updatedUser) {
              res.json({
                status: 400,
                error: true,
                msg: `Contact Number & WhatsApp couldn't be updated`,
              });
            } else {
              res.json({
                status: 200,
                error: false,
                data: updatedUser,
                msg: `Details updated successfully`,
              });
            }
          }
        }
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

module.exports = editProfile;
