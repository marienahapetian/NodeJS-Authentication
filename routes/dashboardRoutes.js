const express = require("express");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const DashboardController = require("../controllers/DashboardController");
const dashboardRouter = express.Router();

dashboardRouter.use("/", AuthMiddleware.hasDashboardAccess);

dashboardRouter.get("/", DashboardController.index);

module.exports = dashboardRouter;
