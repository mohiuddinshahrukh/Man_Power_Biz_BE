const express = require("express");
const router = express.Router();
const {
  addUser,
  loginUser,
  getUserData,
} = require("../controllers/userController");
const { protect, adminProtect } = require("../middleware/authMiddleware");

router.post("/addUser", addUser);
router.post("/login", loginUser);
router.get("/getMe", adminProtect, getUserData);

module.exports = router;
