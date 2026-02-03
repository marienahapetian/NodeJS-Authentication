const app = require("./index");

const PORT = 3000;

const server = app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));

// server.close();
