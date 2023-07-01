const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");

const getAUser = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a user id to update a user`,
      });
    } else {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) {
        res.json({
          status: 400,
          error: true,
          msg: `A user with the id: ${req.params.id} couldn't be found!`,
        });
      } else {
        res.status(200).json({
          status: 200,
          data: user,
          error: false,
          msg: "User details fetched successfully",
        });
      }
    }
  } catch (error) {
    console.log(err);
    res.json({
      status: 400,
      error: true,
      msg: `The following error occurred: ${err}`,
    });
  }
});

module.exports = { getAUser };
