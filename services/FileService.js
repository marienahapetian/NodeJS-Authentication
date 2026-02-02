const fs = require("fs");

class FileService {
	static read(path) {
		const data = fs.open(path);
		return data;
	}

	static readJson(path) {
		const raw = fs.readFileSync(path, "utf-8");
		return JSON.parse(raw);
	}

	static write(path, data) {
		fs.writeFileSync(path, data);
	}
}

module.exports = FileService;
