const User = require("../../../models/userModel");
const getCustomerWithPayments = async (req, res) => {
  try {
    const allUsers = await User.find().populate({
      path: "bookings",
    });
    if (!allUsers) {
      res.json({ status: 400, error: true, msg: `Error in fetching users` });
    } else {
      const customers = allUsers.filter((user) => {
        if (user.userType == "customer" && user.bookings.length > 0) {
          return user;
        }
      });
      if (!customers) {
        res.json({
          status: 400,
          error: true,
          msg: `Error in fetching Customers array`,
        });
      } else {
        res.json({
          status: 200,
          data: allUsers,
          error: false,
          msg: `Error in fetching Customers array`,
        });
      }
    }
  } catch (error) {
    res.json({
      status: 400,
      error: true,
      msg: `${error}`,
    });
  }
};

module.exports = getCustomerWithPayments;
