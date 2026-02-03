class RoleMiddleware {
	static isAdmin(req, res, next) {
		if (req.user.role == "admin") return next();
		return res.status(403).json({ message: "Cannot access this data" });
	}
}

module.exports = RoleMiddleware;
