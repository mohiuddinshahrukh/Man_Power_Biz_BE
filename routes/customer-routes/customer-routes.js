const express = require("express");
const getServiceCategories = require("../../controllers/customer-controllers/topServiceCategories");
const router = express.Router();

// Landing Page Routes
router.get("/get-landing-page-services", getServiceCategories);

module.exports = router;
