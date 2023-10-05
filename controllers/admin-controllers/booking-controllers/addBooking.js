const asyncHandler = require("express-async-handler");
const Booking = require("../../../models/bookingModel");
const Service = require("../../../models/serviceModel");
const Package = require("../../../models/packageModel");
const User = require("../../../models/userModel");
const uuid = require("uuid");
const moment = require("moment-timezone"); // Import the moment-timezone library
const mongoose = require("mongoose");

const addBooking = asyncHandler(async (req, res) => {
  try {
    const {
      bookingCity,
      bookingZip,
      bookingDate, // Assuming this is in the format "9/1/2023, 12:00:00 AM"
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
      bookingServices,
      // ... (other fields)
    } = req.body;

    // Parse the booking date received from the frontend
    const localDate = moment.tz(bookingDate, "M/D/YYYY, h:mm:ss A", "UTC");

    // Convert the user local date to UTC
    const utcDate = localDate.utc();

    if (
      !bookingCity ||
      !bookingZip ||
      !bookingDate ||
      !bookingPackage ||
      !bookingCustomer ||
      !bookingContactNumber ||
      !bookingEmailAddress ||
      !bookingDescription ||
      !bookingStatus ||
      !bookingPrice ||
      !bookingPaymentStatus ||
      (bookingPaymentStatus.toUpperCase() === "CARD" && !bookingPaidAmount) ||
      !bookingServices
    ) {
            return res.json({
        status: 400,
        error: true,
        msg: "Missing required fields or invalid data",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bookingCustomer._id)) {
      return res.json({
        status: 400,
        error: true,
        msg: "Invalid customer ID",
      });
    }

    const fetchCustomer = await User.findById(bookingCustomer._id);
    if (!fetchCustomer) {
      return res.json({
        status: 400,
        error: true,
        msg: "Customer not found",
      });
    }

    const packageArray = bookingPackage.map((pkg) => ({
      package: pkg.package._id,
      quantity: pkg.quantity,
    }));

    const serviceArray = bookingServices.map((service) => service._id);

    const newBooking = await Booking.create({
      bookingId:
        bookingId ||
        `${bookingCity}_${bookingZip}_${fetchCustomer.fullName[0]}_${
          utcDate.toISOString().split("T")[0]
        }_${uuid.v4().split("-")[0]}`,
      bookingCity,
      bookingZip,
      bookingDate: utcDate.toDate(), // Use the converted UTC date
      bookingPackage: packageArray,
      bookingService: serviceArray,
      bookingCustomer: fetchCustomer._id,
      bookingContactNumber,
      bookingEmailAddress,
      bookingDescription,
      bookingStatus,
      bookingPrice,
      bookingPaymentStatus:
        bookingPaymentStatus.toUpperCase() === "CARD"
          ? "FULL"
          : bookingPaymentStatus.toUpperCase(),
      bookingPaidAmount:
        bookingPaymentStatus.toUpperCase() === "CARD" ? bookingPrice : 0,
      bookingRemainingAmount: Math.max(bookingPrice - bookingPaidAmount, 0),
    });

    const updateUser = await User.findByIdAndUpdate(bookingCustomer._id, {
      $push: { bookings: newBooking._id },
    });

    if (!updateUser) {
      return res.json({
        status: 400,
        error: true,
        msg: "User couldn't be updated.",
      });
    }

    await Promise.all(
      packageArray.map(async (pkg) => {
        const fetchedPackage = await Package.findById(pkg.package);
        if (fetchedPackage) {
          fetchedPackage.packageBookings.push(newBooking._id);
          await fetchedPackage.save();
        }
      })
    );

    return res.json({
      status: 200,
      error: false,
      data: newBooking,
      msg: "Booking created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      error: true,
      msg: `${error}`,
    });
  }
});

module.exports = addBooking;
