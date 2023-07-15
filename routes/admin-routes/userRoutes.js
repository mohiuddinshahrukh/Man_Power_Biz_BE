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
module.exports = router;
