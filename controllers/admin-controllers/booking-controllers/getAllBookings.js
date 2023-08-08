const expressAsyncHandler = require("express-async-handler");
const Booking = require("../../../models/bookingModel");

const getAllBookings = expressAsyncHandler(async (req, res) => {
  try {
    const allBookings = await Booking.find()
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

    if (!allBookings) {
      return res.json({
        status: 400,
        error: true,
        msg: `Error in getting bookings`,
      });
    }

    const bookingsData = allBookings.map((booking) => {
      const { ...bookingData } = booking.toObject();
      const customerData = bookingData.bookingCustomer
        ? {
            _id: bookingData.bookingCustomer._id,
            ...bookingData.bookingCustomer,
          }
        : {};
      const packageData = bookingData.bookingPackage
        ? { _id: bookingData.bookingPackage._id, ...bookingData.bookingPackage }
        : {};
      const serviceData = bookingData.bookingService
        ? { _id: bookingData.bookingService._id, ...bookingData.bookingService }
        : {};

      return {
        ...bookingData,
        ...customerData,
        ...packageData,
        ...serviceData,
      };
    });

    res.json({
      status: 200,
      error: false,
      data: bookingsData,
      msg: `Successfully fetched all bookings`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      error: true,
      msg: `${error}`,
    });
  }
});

module.exports = getAllBookings;
