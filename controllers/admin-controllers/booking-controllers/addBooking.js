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
    } = req.body;

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
      res.json({
        status: 400,
        error: true,
        msg: `A required parameter is missing`,
      });
    } else {
      if (
        !mongoose.Types.ObjectId.isValid(bookingService) ||
        !mongoose.Types.ObjectId.isValid(bookingPackage) ||
        !mongoose.Types.ObjectId.isValid(bookingCustomer)
      ) {
        res.json({
          status: 400,
          error: true,
          msg: `The provided object id's are not of the type mongoose object id`,
        });
      } else {
        let fetchService = await Service.findById(bookingService);
        let fetchPackage = await Package.findById(bookingPackage);
        let fetchCustomer = await User.findById(bookingCustomer);
        if (!fetchCustomer) {
          res.json({
            status: 400,
            error: true,
            msg: `The provided customer id doesn't exist`,
          });
        } else if (!fetchPackage) {
          res.json({
            status: 400,
            error: true,
            msg: `The provided package id doesn't exist`,
          });
        } else if (!fetchService) {
          res.json({
            status: 400,
            error: true,
            msg: `The provided service id doesn't exist`,
          });
        } else {
          let bookingId =
            bookingCity +
            "_" +
            bookingZip +
            "_" +
            fetchCustomer.fullName[0] +
            "_" +
            new Date().toISOString().toLocaleString().split("T")[0] +
            "_" +
            uuid.v4().split("-")[0];
          let newBooking = await Booking.create({
            bookingId: bookingId,
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
            bookingRemainingAmount:
              typeof (bookingPrice - bookingPaidAmount) != "NaN"
                ? bookingPrice - bookingPaidAmount
                : 0,
          });
          if (!newBooking) {
            res.json({
              status: 400,
              error: true,
              msg: `The booking couldn't be created`,
            });
          } else {
            fetchPackage.packageBookings.push(newBooking._id);
            let updatedPkg = await fetchPackage.save();
            if (!updatedPkg) {
              res.json({
                status: 400,
                error: true,
                msg: `Booking couldn't be added to packages`,
              });
            } else {
              res.json({
                status: 200,
                error: false,
                data: newBooking,
                msg: `Booking created successfully`,
              });
            }
          }
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
module.exports = addBooking;
