const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();
const addUser = asyncHandler(async (req, res) => {
  try {
    const {
      fullName,
      email,
      contactNumber,
      whatsappNumber,
      password,
      userType,
    } = req.body;
    if (
      !fullName ||
      !email ||
      !contactNumber ||
      !whatsappNumber ||
      !password ||
      !userType
    ) {
      res.json({
        status: 400,
        error: true,
        msg: "Please provide all required fields",
      });
    } else {
      //   Checking if email already exits
      const userExists = await User.findOne({ email });
      console.log("Here", userExists);
      if (userExists) {
        res.json({
          status: 400,
          error: true,
          msg: `User with email: ${email} already exits`,
        });
      } else {
        console.log("Hashing password");
        //   Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating the user
        const user = await User.create({
          fullName,
          email,
          contactNumber,
          whatsappNumber,
          password: hashedPassword,
          userType,
        });

        if (user) {
          res.status(201).json({
            status: 201,
            data: user,
            error: false,
            msg: "User Created Successfully",
            token: genToken(user._id, user.userType),
          });
        } else {
          res.json({
            status: 400,
            error: true,
            msg: "User creation failed",
          });
        }
      }
    }
  } catch (err) {
    console.log("Error: ", err);
    res.json({
      status: 400,
      error: true,
      msg: `The following error occurred: ${err}`,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({
      status: 400,
      error: true,
      msg: "Email or password missing",
    });
  } else {
    let user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        status: 200,
        data: {
          email: user.email,
          userType: user.userType,
        },
        error: false,
        msg: "User Logged in Successfully",
        token: genToken(user._id, user.userType),
      });
    } else {
      res.json({
        status: 400,
        error: true,
        msg: "Invalid user credentials",
      });
    }
  }
});

const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    status: 200,
    data: user,
    error: false,
    msg: "User fetched Successfully",
  });
});

const genToken = (id, userType) => {
  if (userType === "admin") {
    return jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, {
      expiresIn: "30d",
    });
  } else {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  }
};

module.exports = { addUser, loginUser, getUserData };
