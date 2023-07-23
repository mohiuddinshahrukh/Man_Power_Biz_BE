const asyncHandler = require("express-async-handler");
const Booking = require("../../../models/bookingModel");

const getAllBookings = asyncHandler(async (req, res) => {
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
    const bookingsData = allBookings.map((booking) => {
      const { ...bookingData } = booking.toObject();
      const { _id: customerId, ...customerData } = bookingData.bookingCustomer;
      const { _id: packageId, ...packageData } = bookingData.bookingPackage;
      const { _id: serviceId, ...serviceData } = bookingData.bookingService;
      return {
        ...bookingData,
        ...customerData,
        ...packageData,
        ...serviceData,
      };
      // ...booking.bookingPackage,
      // ...booking.bookingService,
    });
    if (!allBookings) {
      res.json({
        status: 400,
        error: true,
        msg: `Error in getting bookings`,
      });
    } else {
      res.json({
        status: 200,
        error: false,
        data: bookingsData,
        msg: `Successfully fetched all bookings`,
      });
    }
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
