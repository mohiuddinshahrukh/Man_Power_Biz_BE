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
const router = express.Router();

router.get("/getAllUsers", adminProtect, getAllUsers);
router.get("/getAUser/:id", adminProtect, getAUser);
router.put("/updateUser/:id", adminProtect, updateUser);
router.delete("/deleteUser/:id", adminProtect, deleteUser);

module.exports = router;
