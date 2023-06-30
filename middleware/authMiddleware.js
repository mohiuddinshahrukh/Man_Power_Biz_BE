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

module.exports = { protect: customerProtect, adminProtect };
