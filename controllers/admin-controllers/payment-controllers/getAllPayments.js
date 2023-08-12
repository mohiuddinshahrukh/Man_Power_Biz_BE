const Payment = require("../../../models/paymentModel");

const getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payment.find();
    if (!allPayments) {
      res.json({
        status: 400,
        error: true,
        msg: `All payments couldn't be fetched`,
      });
    } else {
      res.json({
        status: 200,
        data: allPayments,
        error: false,
        msg: `All payments fetched`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: true,
      msg: `${error}`,
    });
  }
};
module.exports = getAllPayments;
