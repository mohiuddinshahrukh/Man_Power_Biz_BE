const express = require("express");
const getServiceCategories = require("../../controllers/customer-controllers/topServiceCategories");
const getSpecificServiceCategory = require("../../controllers/customer-controllers/specificServiceCategory");
const router = express.Router();

// Landing Page Routes
router.get("/get-landing-page-services", getServiceCategories);
router.get("/get-specific-service-category/:id", getSpecificServiceCategory);

module.exports = router;
