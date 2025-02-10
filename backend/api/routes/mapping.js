const express = require("express");
const axios = require("axios");
const router = express.Router();

// Route pour interroger une API externe
router.get("/map", async (req, res) => {
    try {
        // URL de l'API externe
        const apiUrl = "https://jsonplaceholder.typicode.com/todos/1";

        // Faire une requête GET vers l'API externe
        const response = await axios.get(apiUrl);

        // Renvoyer les données obtenues
        res.json(response.data);
    } catch (error) {
        console.error("Erreur lors de la requête vers l'API externe :", error.message);
        res.status(500).send("Erreur lors de la requête vers l'API externe.");
    }
});

module.exports = router;
