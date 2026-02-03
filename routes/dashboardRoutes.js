const express = require("express");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const DashboardController = require("../controllers/DashboardController");
const RoleMiddleware = require("../middlewares/RoleMiddleware");
const dashboardRouter = express.Router();

dashboardRouter.use("/", AuthMiddleware.hasDashboardAccess);

dashboardRouter.get("/", DashboardController.index);
dashboardRouter.get("/data", RoleMiddleware.isAdmin, DashboardController.data);

module.exports = dashboardRouter;
