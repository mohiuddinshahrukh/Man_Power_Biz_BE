const express = require("express");
const { getAllUsers } = require("../../controllers/getAllUsersController");
const { adminProtect } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/getAllUsers", adminProtect, getAllUsers);

module.exports = router;
