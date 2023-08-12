const mongoose = require("mongoose");
const Payment = require("../../../models/paymentModel");

const getCustomerPayments = async (req, res) => {
  try {
    const customer = req.params.id;
    if (!customer) {
      res.json({
        status: 400,
        error: true,
        msg: `Customer id is required`,
      });
    } else if (!mongoose.Types.ObjectId.isValid(customer)) {
      res.json({
        status: 400,
        error: true,
        msg: `Customer id is not of the type mongoose object id`,
      });
    }
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
      let filteredPayments = allPayments.filter((payment) => {
        if (payment.customer._id == customer) {
          return payment;
        }
      });
      const flattenedPayments = filteredPayments.map((payment) => {
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

module.exports = getCustomerPayments;
