const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { default: helmet } = require("helmet");
const Logger = require("./services/Logger");

const app = express();
app.use(cors());
app.use(express.json()); // ✅ THIS is what fixes req.body
app.use(helmet());

app.use((req, res, next) => {
	Logger.write(req);
	next();
});

app.use("/", routes);

app.listen(3000, () => console.log("🚀 Serveur lancé sur http://localhost:3000"));
