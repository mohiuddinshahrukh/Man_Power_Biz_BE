import express from "express";
import cors from "cors";
import router from "../routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/urbanservices", router);
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    status: 404,
  });
});

export default app;
