const path = require("path");
const FileService = require("./FileService");
const moment = require("moment");
const file = path.join(__dirname, "../Logger.txt");

class Logger {
	static read() {
		return FileService.readJson(file);
	}
	static write(req) {
		let data = `Date: ${moment().format("LLLL")}   IP: ${req.socket.remoteAddress}   Request: ${req.originalUrl}`;

		FileService.write(file, data);
	}
}

module.exports = Logger;
