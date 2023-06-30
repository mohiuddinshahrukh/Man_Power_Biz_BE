const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send({
    status: 200,
    message: "Success",
    data: null,
  });
});
module.exports = router;
