const asyncHandler = require("express-async-handler");
const Booking = require("../../../models/bookingModel");
const { default: mongoose } = require("mongoose");

const getABooking = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      return res.json({
        status: 400,
        error: true,
        msg: `An ID is required to fetch a booking`,
      });
    } else if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.json({
        status: 400,
        error: true,
        msg: `The provided ID is not of the type mongoose object ID`,
      });
    } else {
      let fetchBooking = await Booking.findById(req.params.id);
      if (!fetchBooking) {
        return res.json({
          status: 400,
          error: true,
          msg: `Booking couldn't be found against the given id: ${req.params.id}`,
        });
      } else {
        return res.json({
          status: 200,
          error: false,
          data: fetchBooking,
          msg: `Booking fetched successfully`,
        });
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
module.exports = getABooking;
