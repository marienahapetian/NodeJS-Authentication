const express = require("express");
const cors = require("cors");
const baseRoutes = require("./routes/baseRoutes");
const { default: helmet } = require("helmet");
const Logger = require("./services/Logger");
const authRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json()); // ✅ THIS is what fixes req.body

// remove poweredby express header
// app.use(
// 	helmet({
// 		xPoweredBy: false,
// 	}),
// );

app.disable("x-powered-by");

app.use((req, res, next) => {
	Logger.write(req);
	next();
});

app.use("/", baseRoutes);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

module.exports = app;
