const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../../models/userModel");
const Booking = require("../../models/bookingModel");

const getMyBookings = asyncHandler(async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      res.json({
        status: 400,
        error: true,
        msg: `Id is missing in body`,
      });
    } else if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.json({
        status: 400,
        error: true,
        msg: `Id is not of the type mongoose object id`,
      });
    } else {
      const fetchedUser = await User.findById(_id);
      if (!fetchedUser) {
        res.json({
          status: 400,
          error: true,
          msg: `A user cannot be found against the given id`,
        });
      } else {
        const fetchedBookings = await Booking.find()
          .populate({
            path: "bookingCustomer",
          })
          .populate({
            path: "bookingPackage.package",
          })
          .populate({
            path: "bookingService",
            options: { lean: true },
          });

        const leanBookings = fetchedBookings.map((booking) => {
          const { ...bookingData } = booking.toObject();
          const customerData = bookingData.bookingCustomer
            ? {
                _id: bookingData.bookingCustomer._id,
                ...bookingData.bookingCustomer,
              }
            : {};
          const packageQuantities = bookingData.bookingPackage.map(
            (pkg) => pkg.quantity
          );

          return {
            ...bookingData,
            ...customerData,
            packageQuantities,
          };
        });

        if (!leanBookings) {
          res.json({
            status: 400,
            error: true,
            msg: `Error while fetching all bookings`,
          });
        } else {
          console.log("These are lean bookings", leanBookings);
          const filteredBookings = leanBookings.filter(
            (booking) =>
              booking.bookingCustomer && booking.bookingCustomer._id == _id
          );

          res.json({
            status: 200,
            error: false,
            data: filteredBookings,
            msg: `All booking fetched successfully`,
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

module.exports = getMyBookings;
