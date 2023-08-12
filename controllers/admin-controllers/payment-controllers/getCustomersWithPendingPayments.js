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
    } else {
      let unpaidBookings = [];

      customers.forEach((customer) => {
        const unpaidCustomerBookings = customer.bookings.filter((booking) => {
          return booking.bookingPaymentStatus?.toUpperCase() !== "FULL";
        });
        unpaidBookings.push(...unpaidCustomerBookings);
      });

      res.json({
        status: 200,
        data: unpaidBookings,
        error: false,
        msg: `Successfully fetched bookings with pending payments`,
      });
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
