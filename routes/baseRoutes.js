const express = require("express");
const baseRouter = express.Router();

// 2. Route-specific middleware
baseRouter.get("/home", (req, res) => {
	res.send("Home page welcome");
});

module.exports = baseRouter;
