class DashboardController {
	static index(req, res) {
		return res.status(200).json({ message: "Hi User: Dashboard for all users!!!! " });
	}

	static data(req, res) {
		return res.status(200).json({ message: "Hi Admin: here is dashboard data!!!!" });
	}
}

module.exports = DashboardController;
