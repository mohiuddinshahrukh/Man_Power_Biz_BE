const User = require("../../../models/userModel");
const getCustomerWithPayments = async (req, res) => {
  try {
    const customers = await User.find({
      userType: "customer",
      bookings: { $exists: true, $not: { $size: 0 } },
    }).populate({
      path: "bookings",
    });

    if (!customers) {
      return res.json({
        status: 400,
        error: true,
        msg: `Error in fetching customers with bookings`,
      });
    }

    res.json({
      status: 200,
      data: customers,
      error: false,
      msg: `Successfully fetched customers with bookings`,
    });
  } catch (error) {
    res.json({
      status: 400,
      error: true,
      msg: `${error}`,
    });
  }
};

module.exports = getCustomerWithPayments;
