const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", require("../routes/userRoutes.js"));
app.use("/api/v1/admin", require("../routes/admin-routes/userRoutes.js"));
app.use(
  "/api/v1/customer",
  require("../routes/customer-routes/customer-routes.js")
);
app.use(
  "/api/v1/conversations",
  require("../routes/chatting-routes/conversations-route.js")
);
app.use(
  "/api/v1/messages",
  require("../routes/chatting-routes/messages-route.js")
);

app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    status: 404,
  });
});

module.exports = app;
