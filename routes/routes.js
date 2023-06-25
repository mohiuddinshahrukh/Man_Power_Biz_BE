import express from "express";
const router = express.Router();

router.route("/").get((req, res) => {
  res.send({
    status: 200,
    message: "Success",
    data: null,
  });
});
export default router;
