const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 8020;

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Route par défaut pour vérifier le serveur
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
});
