const expressAsyncHandler = require("express-async-handler");
const Booking = require("../../../models/bookingModel");

const getAllBookings = expressAsyncHandler(async (req, res) => {
  try {
    const allBookings = await Booking.find()
      .populate({
        path: "bookingCustomer",
        select: "email",
      })
      .populate({
        path: "bookingPackage.package",
      })
      .populate({
        path: "bookingService",
        select:
          "serviceTitle serviceContactPhone serviceInfoEmail serviceWhatsAppPhone",
      });

    if (!allBookings) {
      return res.json({
        status: 400,
        error: true,
        msg: `Error in getting bookings`,
      });
    }

    res.json({
      status: 200,
      error: false,
      data: allBookings,
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
