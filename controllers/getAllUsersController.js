const User = require("../models/userModel");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      status: 200,
      data: users,
      error: false,
      msg: "Users returned successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      error: true,
      msg: "There was an error while fetching the users",
    });
  }
};

module.exports = { getAllUsers };
