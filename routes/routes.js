const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

// 2. Route-specific middleware
// app.use("/api", AuthMiddleware);
router.get("/home", (req, res) => {
	res.send("Home page welcome");
});
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
