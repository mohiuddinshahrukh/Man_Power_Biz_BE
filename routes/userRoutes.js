const express = require("express");
const router = express.Router();
const {
  addUser,
  loginUser,
  getUserData,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/addUser", addUser);
router.post("/login", loginUser);
router.get("/getMe", protect, getUserData);

module.exports = router;
