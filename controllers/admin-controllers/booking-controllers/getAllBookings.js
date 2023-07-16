const asyncHandler = require("express-async-handler");
const Booking = require("../../../models/bookingModel");

const getAllBookings = asyncHandler(async (req, res) => {
  try {
    const allBookings = await Booking.find();
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
        data: allBookings,
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
