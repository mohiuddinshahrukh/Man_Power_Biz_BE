const express = require("express");
const getServiceCategories = require("../../controllers/customer-controllers/topServiceCategories");
const getSpecificServiceCategory = require("../../controllers/customer-controllers/specificServiceCategory");
const loginCustomer = require("../../controllers/customer-controllers/loginCustomer");
const signUpCustomer = require("../../controllers/customer-controllers/signUpCustomer");
const createPaymentIntent = require("../../controllers/admin-controllers/payment-controllers/createPaymentIntent");
const addBooking = require("../../controllers/admin-controllers/booking-controllers/addBooking");
const getMyBookings = require("../../controllers/customer-controllers/get-my-bookings");
const getMe = require("../../controllers/customer-controllers/get-me");
const editProfile = require("../../controllers/customer-controllers/edit-profile");
const editPassword = require("../../controllers/customer-controllers/edit-password");
const getAllServiceCategories = require("../../controllers/customer-controllers/get-all-service-categories");
const getCustomerPayments = require("../../controllers/admin-controllers/payment-controllers/getCustomerPayments");
const getCustomerDashboard = require("../../controllers/customer-controllers/customerDashboard");
const router = express.Router();

// Customer Routes
router.get("/get-landing-page-services", getServiceCategories);
router.get("/get-specific-service-category/:id", getSpecificServiceCategory);
router.get("/get-all-service-categories", getAllServiceCategories);
router.get("/get-my-bookings/:id", getMyBookings);
router.get("/get-me/:id", getMe);
// Payments
router.get("/get-customer-payments/:id", getCustomerPayments);
router.put("/edit-profile/:id", editProfile);
router.put("/edit-password/:id", editPassword);
router.post("/login-customer", loginCustomer);
router.post("/signup-customer", signUpCustomer);
router.post("/customer-payment-intent", createPaymentIntent);
router.post("/customer-create-payment", addBooking);

// Dashboard
router.get("/get-customer-dashboard/:id", getCustomerDashboard);

module.exports = router;
