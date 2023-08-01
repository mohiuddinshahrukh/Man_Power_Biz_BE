const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../../models/userModel");
const genToken = require("../../helpers/genToken");

const loginCustomer = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({
        status: 400,
        error: true,
        msg: `Email and password are required fields`,
      });
    } else if (
      !/^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
        email
      )
    ) {
      res.json({
        status: 400,
        error: true,
        msg: `Email failed regex`,
      });
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(password)) {
      res.json({
        status: 400,
        error: true,
        msg: `Password failed regex`,
      });
    } else {
      let existingUser = await User.findOne({ email });
      if (
        existingUser &&
        (await bcrypt.compare(password, existingUser.password))
      ) {
        res.json({
          status: 200,
          data: {
            _id: existingUser._id,
            fullName: existingUser.fullName,
            email: existingUser.email,
            userType: existingUser.userType,
            status: existingUser.status,
            contactNumber: existingUser.contactNumber,
            whatsappNumber: existingUser.whatsappNumber,
          },
          error: false,
          msg: "User Logged in Successfully",
          token: genToken(existingUser._id, existingUser.userType),
        });
      } else {
        res.json({
          status: 400,
          error: true,
          msg: "Invalid user credentials",
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

module.exports = loginCustomer;
