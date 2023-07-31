const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const genToken = (id, userType) => {
  if (userType === "admin") {
    return jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, {
      expiresIn: "30d",
    });
  } else {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  }
};

module.exports = genToken;
