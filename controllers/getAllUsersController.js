const User = require("../models/userModel");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      res.json({
        status: 400,
        error: true,
        msg: `Users Couldn't be fetched`,
      });
    } else {
      res.json({
        status: 200,
        data: users,
        error: false,
        msg: "Users returned successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: true,
      msg: "There was an error while fetching the users",
    });
  }
};

module.exports = { getAllUsers };
