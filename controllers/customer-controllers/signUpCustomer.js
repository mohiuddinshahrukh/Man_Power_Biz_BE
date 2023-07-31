const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const genToken = require("../../helpers/genToken");
const signUpCustomer = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, password, contactNumber, whatsappNumber } =
      req.body;
    if (!fullName || !email || !password || !contactNumber || !whatsappNumber) {
      res.json({
        status: 400,
        error: true,
        msg: `full-name, email, password, contactNumber, whatsapp number are required fields`,
      });
    } else if (
      !/^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
        email
      )
    ) {
      res.json({
        status: 400,
        error: true,
        msg: `Email has failed regex`,
      });
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(password)) {
      res.json({
        status: 400,
        error: true,
        msg: `Password has failed regex`,
      });
    } else if (!/^[a-zA-Z\s]*$/.test(fullName)) {
      res.json({
        status: 400,
        error: true,
        msg: `Name has failed regex`,
      });
    } else if (!/^[1-9]\d{9}$/.test(contactNumber)) {
      res.json({
        status: 400,
        error: true,
        msg: `Contact number has failed regex`,
      });
    } else if (!/^[1-9]\d{9}$/.test(whatsappNumber)) {
      res.json({
        status: 400,
        error: true,
        msg: `WhatsApp number has failed regex`,
      });
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.json({
          status: 400,
          error: true,
          msg: `A user with the same email already exists`,
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = await User.create({
          fullName,
          email,
          contactNumber,
          whatsappNumber,
          password: hashedPassword,
        });
        if (!createdUser) {
          res.json({
            status: 400,
            error: true,
            msg: `User couldn't be created`,
          });
        } else {
          res.status(201).json({
            status: 201,
            data: createdUser,
            error: false,
            msg: "Customer Created Successfully",
            token: genToken(createdUser._id, createdUser.userType),
          });
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

module.exports = signUpCustomer;
