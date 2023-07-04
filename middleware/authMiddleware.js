const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const customerProtect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //   Get token
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({
        status: 401,
        error: true,
        msg: "User is unauthorized",
      });
    }
  }
  if (!token) {
    res.status(401).json({
      status: 401,
      error: true,
      msg: "No token provided in request",
    });
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //   Get token
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
      console.log("This is the decoded token: ", decoded);
      console.log("This is the decoded ID: ", decoded.id);

      let user = await User.findById(decoded.id);
      if (!user) {
        res.json({
          status: 400,
          error: true,
          msg: `A user with the id: ${req.params.id} couldn't be found!`,
        });
      } else {
        console.log("USER: ", user);
        req.user = user;
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({
        status: 401,
        error: true,
        msg: "User is unauthorized",
      });
    }
  }
  if (!token) {
    res.status(401).json({
      status: 401,
      error: true,
      msg: "No token provided in request",
    });
  }
});

module.exports = { protect: customerProtect, adminProtect };
