const Payment = require("../../models/paymentModel");
const User = require("../../models/userModel");
const Booking = require("../../models/bookingModel");
const Package = require("../../models/packageModel");

const getAdminDashboard = async (req, res) => {
  try {
    const allPayments = await Payment.find();
    const allUsersCount = await User.find();
    const allBookingsCount = await Booking.find();
    const allPackagesCount = await Package.find();

    if (
      !allPayments ||
      !allUsersCount ||
      !allBookingsCount ||
      !allPackagesCount
    ) {
      res.json({
        status: 400,
        error: true,
        msg: `Couldn't fetch customer dashboard`,
      });
    } else {
      const totalPaymentAmount = allPayments.reduce(
        (total, payment) => total + payment.paymentAmount,
        0
      );

      const totalBookingsPayment = allBookingsCount.reduce(
        (total, booking) => total + booking.bookingPaidAmount,
        0
      );

      res.json({
        status: 200,
        error: false,
        data: {
          totalPaymentAmount: totalPaymentAmount,
          totalBookingsAmount: totalBookingsPayment,
          users: allUsersCount.length,
          bookings: allBookingsCount.length,
          packages: allPackagesCount.length,
        },
        msg: `Dashboard fetched`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: true,
      msg: `${error}`,
    });
  }
};
module.exports = getAdminDashboard;
