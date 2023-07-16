const asyncHandler = require("express-async-handler");
const Booking = require("../../../models/bookingModel");
const Service = require("../../../models/serviceModel");
const Package = require("../../../models/packageModel");
const User = require("../../../models/userModel");
const mongoose = require("mongoose");

const updateBooking = asyncHandler(async (req, res) => {
  try {
    const {
      bookingCity,
      bookingZip,
      bookingDate,
      bookingService,
      bookingPackage,
      bookingCustomer,
      bookingContactNumber,
      bookingEmailAddress,
      bookingDescription,
      bookingStatus,
      bookingPrice,
      bookingPaymentStatus,
      bookingPaidAmount,
    } = req.body;

    const bookingId = req.params.id; // Assuming the booking ID is passed as a route parameter
    if (!bookingId) {
      return res.json({
        status: 400,
        error: true,
        msg: `Booking id is required to find a booking`,
      });
    } else if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.json({
        status: 400,
        error: true,
        msg: `Booking id is not of the type mongoose object ID`,
      });
    } else {
      let booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.json({
          status: 400,
          error: true,
          msg: `A booking with the provided booking id: ${bookingId} doesn't exist`,
        });
      }
    }
    if (
      !bookingCity ||
      !bookingZip ||
      !bookingDate ||
      !bookingService ||
      !bookingPackage ||
      !bookingCustomer ||
      !bookingContactNumber ||
      !bookingEmailAddress ||
      !bookingDescription ||
      !bookingPrice ||
      !bookingPaidAmount
    ) {
      // Perform input validation
      return res.json({
        status: 400,
        error: true,
        msg: `A required parameter is missing`,
      });
    }

    // Check if object IDs are valid
    if (
      !mongoose.Types.ObjectId.isValid(bookingService) ||
      !mongoose.Types.ObjectId.isValid(bookingPackage) ||
      !mongoose.Types.ObjectId.isValid(bookingCustomer)
    ) {
      return res.json({
        status: 400,
        error: true,
        msg: `The provided object IDs are not valid`,
      });
    }

    // Fetch related entities
    const [fetchService, fetchPackage, fetchCustomer] = await Promise.all([
      Service.findById(bookingService),
      Package.findById(bookingPackage),
      User.findById(bookingCustomer),
    ]);

    // Check if related entities exist
    if (!fetchCustomer) {
      return res.json({
        status: 400,
        error: true,
        msg: `The provided customer ID doesn't exist`,
      });
    }
    if (!fetchPackage) {
      return res.json({
        status: 400,
        error: true,
        msg: `The provided package ID doesn't exist`,
      });
    }
    if (!fetchService) {
      return res.json({
        status: 400,
        error: true,
        msg: `The provided service ID doesn't exist`,
      });
    }

    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        bookingCity,
        bookingZip,
        bookingDate,
        bookingService,
        bookingPackage,
        bookingCustomer,
        bookingContactNumber,
        bookingEmailAddress,
        bookingDescription,
        bookingStatus,
        bookingPrice,
        bookingPaymentStatus,
        bookingPaidAmount,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.json({
        status: 400,
        error: true,
        msg: `The booking couldn't be updated`,
      });
    }

    return res.json({
      status: 200,
      error: false,
      data: updatedBooking,
      msg: `Booking updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      error: true,
      msg: `${error}`,
    });
  }
});

module.exports = updateBooking;
