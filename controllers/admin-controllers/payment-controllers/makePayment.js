const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Booking = require("../../../models/bookingModel");
const Payment = require(".././../../models/paymentModel");
const makePayment = asyncHandler(async (req, res) => {
  try {
    const { bookingId, amount, customerId, paymentMethod } = req.body;
    if (!bookingId) {
      res.json({
        status: 400,
        error: true,
        msg: `Booking id is required to create a payment`,
      });
    } else if (!customerId) {
      res.json({
        status: 400,
        error: true,
        msg: `Customer id is required to create a payment`,
      });
    } else if (!amount) {
      res.json({
        status: 400,
        error: true,
        msg: `Booking amount is required to create a payment`,
      });
    } else if (typeof amount != "number") {
      res.json({
        status: 400,
        error: true,
        msg: `Amount must be a number`,
      });
    } else if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      res.json({
        status: 400,
        error: true,
        msg: `The booking id: ${bookingId} is not of the type mongoose object id`,
      });
    } else {
      let booking = await Booking.findById(bookingId);
      if (!booking) {
        res.json({
          status: 400,
          error: true,
          msg: `A booking against the given booking id: ${bookingId} couldn't be found`,
        });
      } else if (!booking.bookingRemainingAmount > 0) {
        res.json({
          status: 400,
          error: true,
          msg: `This booking is already paid for`,
        });
      } else {
        let updatedBooking = await Booking.findByIdAndUpdate(
          bookingId,
          {
            bookingPaymentStatus: "FULL",
            bookingPaidAmount: (booking.bookingPaidAmount += amount),
            bookingRemainingAmount: amount - booking.bookingRemainingAmount,
          },
          {
            new: true,
          }
        )
          .populate({
            path: "bookingCustomer",
            select: "fullName email",
            options: { lean: true },
          })
          .populate({
            path: "bookingPackage",
            select: "packageTitle",
            options: { lean: true },
          })
          .populate({
            path: "bookingService",
            select:
              "serviceTitle serviceContactPhone serviceInfoEmail serviceWhatsAppPhone",
            options: { lean: true },
          });
        const bookingsData = [updatedBooking].map((booking) => {
          const { ...bookingData } = booking.toObject();
          const { _id: customerId, ...customerData } =
            bookingData.bookingCustomer;
          const { _id: packageId, ...packageData } = bookingData.bookingPackage;
          const { _id: serviceId, ...serviceData } = bookingData.bookingService;
          return {
            ...bookingData,
            ...customerData,
            ...packageData,
            ...serviceData,
          };
        });
        if (!bookingsData) {
          res.json({
            status: 400,
            error: true,
            msg: `Booking couldn't be updated, payment failed`,
          });
        } else {
          const createPayment = await Payment.create({
            customer: customerId,
            bookingId: bookingId,
            payment: paymentMethod,
            paymentAmount: amount,
          });

          if (!createPayment) {
            res.json({
              status: 400,
              error: true,
              msg: `Payment couldn't be created, payment failed`,
            });
          } else {
            res.json({
              status: 200,
              data: bookingsData[0],
              error: false,
              msg: `Payment successfully created and booking updated`,
            });
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

module.exports = makePayment;
