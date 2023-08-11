const asyncHandler = require("express-async-handler");
const Booking = require("../../../models/bookingModel");
const Service = require("../../../models/serviceModel");
const Package = require("../../../models/packageModel");
const User = require("../../../models/userModel");
const uuid = require("uuid");
const mongoose = require("mongoose");

const addBooking = asyncHandler(async (req, res) => {
  try {
    const {
      bookingCity,
      bookingZip,
      bookingDate,
      bookingPackage,
      bookingCustomer,
      bookingContactNumber,
      bookingEmailAddress,
      bookingDescription,
      bookingStatus,
      bookingPrice,
      bookingPaymentStatus,
      bookingPaidAmount,
      bookingId,
    } = req.body;

    // Validate customer
    if (!mongoose.Types.ObjectId.isValid(bookingCustomer._id)) {
      return res.status(400).json({
        error: true,
        msg: "Invalid customer ID",
      });
    }
    const fetchCustomer = await User.findById(bookingCustomer._id);
    if (!fetchCustomer) {
      return res.status(400).json({
        error: true,
        msg: "Customer not found",
      });
    }

    // Create booking package array
    const packageArray = bookingPackage.map((pkg) => ({
      package: pkg.package._id,
      quantity: pkg.quantity,
    }));

    // Create booking
    const newBooking = await Booking.create({
      bookingId:
        bookingId ||
        `${bookingCity}_${bookingZip}_${fetchCustomer.fullName[0]}_${
          new Date().toISOString().split("T")[0]
        }_${uuid.v4().split("-")[0]}`,
      bookingCity,
      bookingZip,
      bookingDate,
      bookingPackage: packageArray,
      bookingCustomer: fetchCustomer._id,
      bookingContactNumber,
      bookingEmailAddress,
      bookingDescription,
      bookingStatus,
      bookingPrice,
      bookingPaymentStatus:
        bookingPaymentStatus.toUpperCase() == "CARD"
          ? "FULL"
          : bookingPaymentStatus.toUpperCase(),
      bookingPaidAmount:
        bookingPaymentStatus.toUpperCase() == "CARD" ? bookingPrice : 0,
      bookingRemainingAmount: Math.max(bookingPrice - bookingPaidAmount, 0),
    });

    const updateUser = await User.findByIdAndUpdate(bookingCustomer, {
      $push: { bookings: newBooking._id },
    });
    if (!updateUser) {
      res.json({
        error: true,
        status: 400,
        msg: "User couldn't be updated.",
      });
    } else {
      // Update package bookings
      await Promise.all(
        packageArray.map(async (pkg) => {
          const fetchedPackage = await Package.findById(pkg.package);
          if (fetchedPackage) {
            fetchedPackage.packageBookings.push(newBooking._id);
            await fetchedPackage.save();
          }
        })
      );

      return res.status(200).json({
        error: false,
        data: newBooking,
        msg: "Booking created successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      msg: "An error occurred while processing your request",
    });
  }
});

module.exports = addBooking;
