const Payment = require("../../models/paymentModel");
const User = require("../../models/userModel");
const Booking = require("../../models/bookingModel");
const Package = require("../../models/packageModel");
const mongoose = require("mongoose");

const getCustomerDashboard = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({
        status: 400,
        error: true,
        msg: `Customer id is required`,
      });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({
        status: 400,
        error: true,
        msg: `Customer id is not of the type mongoose object id`,
      });
    } else {
      const allPayments = await Payment.find().populate({
        path: "customer",
        select: "fullName email",
      });

      if (!allPayments) {
        res.json({
          status: 400,
          error: true,
          msg: `All payments couldn't be fetched`,
        });
      } else {
        let filteredPayments = allPayments.filter((payment) => {
          if (payment.customer._id == id) {
            return payment;
          }
        });
        const flattenedPayments = filteredPayments.map((payment) => {
          const flattenedPayment = {
            ...payment._doc, // Extract top-level properties
            fullName: payment.customer.fullName,
            email: payment.customer.email,
          };

          delete flattenedPayment.customer; // Remove the nested customer object
          return flattenedPayment;
        });

        const allUsersCount = await User.find();
        const allBookingsCount = await Booking.find();
        const allPackagesCount = await Package.find();

        if (!allUsersCount || !allBookingsCount || !allPackagesCount) {
          res.json({
            status: 400,
            error: true,
            msg: `Couldn't fetch customer dashboard`,
          });
        } else {
          const filteredBookings = allBookingsCount.filter((booking) => {
            return booking.bookingCustomer == id;
          });
          const totalPaymentAmount = flattenedPayments.reduce(
            (total, payment) => total + payment.paymentAmount,
            0
          );

          const totalBookingsPayment = filteredBookings.reduce(
            (total, booking) => total + booking.bookingPaidAmount,
            0
          );

          res.json({
            status: 200,
            error: false,
            data: [
              {
                totalPaymentAmount: totalPaymentAmount,
                totalBookingsAmount: totalBookingsPayment,
                bookings: filteredBookings.length,
              },
            ],
            msg: `Dashboard fetched`,
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
};
module.exports = getCustomerDashboard;
