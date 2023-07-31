const express = require("express");
const getServiceCategories = require("../../controllers/customer-controllers/topServiceCategories");
const getSpecificServiceCategory = require("../../controllers/customer-controllers/specificServiceCategory");
const loginCustomer = require("../../controllers/customer-controllers/loginCustomer");
const signUpCustomer = require("../../controllers/customer-controllers/signUpCustomer");
const router = express.Router();

// Landing Page Routes
router.get("/get-landing-page-services", getServiceCategories);
router.get("/get-specific-service-category/:id", getSpecificServiceCategory);
router.post("/login-customer", loginCustomer);
router.post("/signup-customer", signUpCustomer);

module.exports = router;
