const Payment = require("../../../models/paymentModel");

const getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payment.find().populate({
      path: "customer",
      select: "fullName email",
    });

    if (!allPayments) {
      res.json({
        status: 400,
        error: true,
        msg: `All payments couldn't be fetched`,
      });
    } else {
      const flattenedPayments = allPayments.map((payment) => {
        const flattenedPayment = {
          ...payment._doc, // Extract top-level properties
          fullName: payment.customer.fullName,
          email: payment.customer.email,
        };

        delete flattenedPayment.customer; // Remove the nested customer object
        return flattenedPayment;
      });

      res.json({
        status: 200,
        data: flattenedPayments,
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
