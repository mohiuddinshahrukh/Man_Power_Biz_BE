const express = require("express");
const { getAllUsers } = require("../../controllers/getAllUsersController");
const { adminProtect } = require("../../middleware/authMiddleware");
const {
  updateUser,
} = require("../../controllers/admin-controllers/updateAUser");
const {
  deleteUser,
} = require("../../controllers/admin-controllers/deleteAUser");
const { getAUser } = require("../../controllers/admin-controllers/getAUser");
const {
  getAllServiceCateogries,
  addServiceCategory,
  getAServiceCateogry,
  updateServiceCategory,
  deleteServiceCategory,
} = require("../../controllers/admin-controllers/serviceCategoriesController");
const {
  getAllServices,
  getAService,
  addService,
  updateService,
  deleteService,
} = require("../../controllers/admin-controllers/serviceController");
const getAllPackages = require("../../controllers/admin-controllers/package-controllers/getAllPackagesController");
const getAPackage = require("../../controllers/admin-controllers/package-controllers/getAPackageController");
const addPackage = require("../../controllers/admin-controllers/package-controllers/addPackageController");
const deletePackage = require("../../controllers/admin-controllers/package-controllers/deletePackageController");
const updatePackage = require("../../controllers/admin-controllers/package-controllers/editPackageController");
const getAllBookings = require("../../controllers/admin-controllers/booking-controllers/getAllBookings");
const addBooking = require("../../controllers/admin-controllers/booking-controllers/addBooking");
const updateBooking = require("../../controllers/admin-controllers/booking-controllers/updateBooking");
const getABooking = require("../../controllers/admin-controllers/booking-controllers/getAbooking");
const deleteBooking = require("../../controllers/admin-controllers/booking-controllers/deleteBooking");
const createPaymentIntent = require("../../controllers/admin-controllers/payment-controllers/createPaymentIntent");
const makePayment = require("../../controllers/admin-controllers/payment-controllers/makePayment");
const getCustomerWithPayments = require("../../controllers/admin-controllers/payment-controllers/getCustomersWithPendingPayments");
const getAllPayments = require("../../controllers/admin-controllers/payment-controllers/getAllPayments");
const getAdminDashboard = require("../../controllers/admin-controllers/dashboardController");
const router = express.Router();

// User routes
router.get("/getAllUsers", adminProtect, getAllUsers);
router.get("/getAUser/:id", adminProtect, getAUser);
router.put("/updateUser/:id", adminProtect, updateUser);
router.delete("/deleteUser/:id", adminProtect, deleteUser);

// Service category routes
router.get("/getAllServicesCategories", adminProtect, getAllServiceCateogries);
router.get("/getAServicesCategory/:id", adminProtect, getAServiceCateogry);
router.post("/addServicesCategory", adminProtect, addServiceCategory);
router.put("/updateServiceCategory/:id", adminProtect, updateServiceCategory);
router.delete(
  "/deleteServiceCategory/:id",
  adminProtect,
  deleteServiceCategory
);

//Service
router.get("/getAllServices", adminProtect, getAllServices);
router.get("/getAServices/:id", adminProtect, getAService);
router.post("/addService", adminProtect, addService);
router.put("/updateService/:id", adminProtect, updateService);
router.delete("/deleteService/:id", adminProtect, deleteService);

// Package
router.get("/getAllPackages", adminProtect, getAllPackages);
router.get("/getAPackage/:id", adminProtect, getAPackage);
router.post("/addPackage", adminProtect, addPackage);
router.put("/editPackage/:id", adminProtect, updatePackage);
router.delete("/deletePackage/:id", adminProtect, deletePackage);

// Bookings
router.get("/getAllBookings", adminProtect, getAllBookings);
router.get("/getABooking/:id", adminProtect, getABooking);
router.post("/addBooking", adminProtect, addBooking);
router.put("/updateBooking/:id", adminProtect, updateBooking);
router.delete("/deleteBooking/:id", adminProtect, deleteBooking);

// Payment
router.post("/createPaymentIntent", adminProtect, createPaymentIntent);
router.post("/makePayment", adminProtect, makePayment);
router.get(
  "/get-customers-with-pending-payments",
  adminProtect,
  getCustomerWithPayments
);
router.get("/get-all-payments", adminProtect, getAllPayments);

// Dashboard Admin
router.get("/get-admin-dashboard", adminProtect, getAdminDashboard);

module.exports = router;
