require("dotenv").config();
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FileService = require("../services/FileService");
const path = require("path");
const SECRET = process.env.HASHING_SECRET;
const maxAttemps = 3;
const blockTime = 1;

const usersFilePath = path.join(__dirname, "../public/users.json");
let users = FileService.readJson(usersFilePath);

class AuthController {
	static login(req, res) {
		const { username, password } = req.body;

		const userFound = users.find((user) => user.username == username);
		if (!userFound) return res.status(401).json({ message: "Identifiants invalides" });

		bcrypt.compare(password, userFound.passwordHash).then((valid) => {
			if (!valid) {
				if (userFound.loginAttempts == maxAttemps) {
					let blocked = true;
					if (!userFound.blocked) users = users.map((user) => (user.username === username ? { ...user, blocked: moment().format() } : user));
					else {
						if (moment().diff(userFound.blocked, "minutes") > blockTime) {
							users = users.map((user) => (user.username === username ? { ...user, loginAttempts: 0, blocked: null } : user));
							blocked = false;
						}
					}
					FileService.write(usersFilePath, JSON.stringify(users));

					if (blocked) return res.status(429).json({ message: "Too many login attempts" });
				}

				users = users.map((user) => (user.username === username ? { ...user, loginAttempts: user.loginAttempts + 1 } : user));
				FileService.write(usersFilePath, JSON.stringify(users));
				return res.status(401).json({ message: "Mot de passe incorrect" });
			}

			//generate a token
			const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
			res.status(200).json({ token });
		});
	}

	static register(req, res) {
		const { username, password } = req.body;

		const userFound = users.find((user) => user.username == username);
		if (userFound) return res.status(409).json({ message: "Utilisateur deja existant" });

		bcrypt.hash(password, 10).then((hash) => {
			users.push({ username: username, passwordHash: hash });
			FileService.write(usersFilePath, JSON.stringify(users));

			res.status(201).json({ passwordHash: hash });
		});
	}
}

module.exports = AuthController;
