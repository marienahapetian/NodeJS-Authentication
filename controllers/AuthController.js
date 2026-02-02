require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FileService = require("../services/FileService");
const path = require("path");
const SECRET = process.env.HASHING_SECRET;

const usersFilePath = path.join(__dirname, "../public/users.json");
const users = FileService.readJson(usersFilePath);

class AuthController {
	static login(req, res) {
		const { username, password } = req.body;

		const userFound = users.find((user) => user.username == username);
		if (!userFound) return res.status(401).json({ message: "Identifiants invalides" });

		bcrypt.compare(password, userFound.passwordHash).then((valid) => {
			console.log(valid);
			if (!valid) return res.status(401).json({ message: "Mot de passe incorrect", token: bcrypt.hash(password) });

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
