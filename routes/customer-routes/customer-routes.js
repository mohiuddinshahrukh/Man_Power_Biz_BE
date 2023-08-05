const express = require("express");
const getServiceCategories = require("../../controllers/customer-controllers/topServiceCategories");
const getSpecificServiceCategory = require("../../controllers/customer-controllers/specificServiceCategory");
const loginCustomer = require("../../controllers/customer-controllers/loginCustomer");
const signUpCustomer = require("../../controllers/customer-controllers/signUpCustomer");
const createPaymentIntent = require("../../controllers/admin-controllers/payment-controllers/createPaymentIntent");
const addBooking = require("../../controllers/admin-controllers/booking-controllers/addBooking");
const getMyBookings = require("../../controllers/customer-controllers/get-my-bookings");
const router = express.Router();

// Landing Page Routes
router.get("/get-landing-page-services", getServiceCategories);
router.get("/get-specific-service-category/:id", getSpecificServiceCategory);
router.get("/get-my-bookings/:id", getMyBookings);
router.post("/login-customer", loginCustomer);
router.post("/signup-customer", signUpCustomer);
router.post("/customer-payment-intent", createPaymentIntent);
router.post("/customer-create-payment", addBooking);

module.exports = router;
