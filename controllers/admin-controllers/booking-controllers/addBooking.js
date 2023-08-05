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
      bookingId,
    } = req.body;

    // Input validation
    if (
      !bookingCity ||
      !bookingService ||
      !bookingPackage ||
      !bookingCustomer
    ) {
      return res.status(400).json({
        error: true,
        msg: "Required parameters are missing",
      });
    }

    // Fetch services and packages
    const fetchedServices = await Promise.all(
      bookingService.map(async (element) => {
        if (!mongoose.Types.ObjectId.isValid(element._id)) {
          throw new Error("Invalid service ID");
        }
        return Service.findById(element._id);
      })
    );

    const fetchedPackages = await Promise.all(
      bookingPackage.map(async (element) => {
        if (!mongoose.Types.ObjectId.isValid(element._id)) {
          throw new Error("Invalid package ID");
        }
        const packageDoc = await Package.findById(element._id);
        return {
          package: packageDoc,
          quantity: element.quantity || 1, // Default to 1 if quantity is not provided
        };
      })
    );

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
      bookingService: fetchedServices.map((service) => service._id),
      bookingPackage: fetchedPackages.map((pkg) => ({
        package: pkg.package._id,
        quantity: pkg.quantity,
      })),
      bookingCustomer: fetchCustomer._id,
      bookingContactNumber,
      bookingEmailAddress,
      bookingDescription,
      bookingStatus,
      bookingPrice,
      bookingPaymentStatus: bookingPaymentStatus.toUpperCase(),
      bookingPaidAmount,
      bookingRemainingAmount: Math.max(bookingPrice - bookingPaidAmount, 0),
    });

    // Update package bookings
    await Promise.all(
      fetchedPackages.map(async (fetchedPackage) => {
        fetchedPackage.package.packageBookings.push(newBooking._id);
        await fetchedPackage.package.save();
      })
    );

    return res.status(200).json({
      error: false,
      data: newBooking,
      msg: "Booking created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      msg: "An error occurred while processing your request",
    });
  }
});

module.exports = addBooking;
