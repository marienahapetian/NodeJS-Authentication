const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json()); // ✅ THIS is what fixes req.body

app.use("/", routes);

app.listen(3000, () => console.log("🚀 Serveur lancé sur http://localhost:3000"));
