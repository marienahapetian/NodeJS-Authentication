const bcrypt = require("bcrypt");
const users = [
	{
		username: "mari123",
		passwordHash: "$2b$10$a8gEBjFploxTIT.pilWuCu06o.D5ausMXyhlQel9K9poWeltPV2/e",
	},
]; // [{ email, passwordHash }]
class AuthController {
	static login(req, res) {
		const { username, password } = req.body;

		const userFound = users.find((user) => user.username == username);
		if (!userFound) return res.status(401).json({ message: "Identifiants invalides" });

		bcrypt.compare(password, userFound.passwordHash).then((valid) => {
			console.log(valid);
			if (!valid) return res.status(401).json({ message: "Mot de passe incorrect", token: bcrypt.hash(password) });

			res.status(200).json({ message: "Connected successfully" });
		});
	}

	static register(req, res) {
		const { username, password } = req.body;

		const userFound = users.find((user) => user.username == username);
		if (userFound) return res.status(400).json({ message: "Utilisateur deja existant" });

		bcrypt.hash(password, 10).then((hash) => {
			users.push({ username: username, passwordHash: hash });

			res.status(201).json({ passwordHash: hash });
		});
	}
}

module.exports = AuthController;
