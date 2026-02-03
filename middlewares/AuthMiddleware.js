const AuthController = require("../controllers/AuthController");

class AuthMiddleware {
	static hasDashboardAccess(req, res, next) {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({ message: "No token provided" });
		}

		const token = authHeader.split(" ")[1];

		if (!AuthController.authenticate(token)) return res.status(403).json({ message: "Invalid or expired token" });

		next();
	}
}

module.exports = AuthMiddleware;
