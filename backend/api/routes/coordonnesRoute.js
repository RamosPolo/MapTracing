const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = '5b3ce3597851110001cf624877aa667fa719440b99e53c36440f4667';


// Route pour interroger une API externe avec des paramètres 'start' et 'end'
router.get("/coordonees", async (req, res) => {
    try {
        // Récupérer les paramètres 'start' et 'end' de la requête
        const { start, end } = req.query;

        if (!start || !end) {
            return res.status(400).send("Les paramètres 'start' et 'end' sont requis.");
        }

        // Valider le format des coordonnées
        const coordRegex = /^-?\d+(\.\d+),-?\d+(\.\d+)$/;
        if (!coordRegex.test(start) || !coordRegex.test(end)) {
            return res.status(400).send("Les paramètres 'start' et 'end' doivent être au format 'longitude,latitude'.");
        }

        // URL de l'API externe
        const apiUrl = "https://api.openrouteservice.org/v2/directions/driving-car";

        // Faire une requête GET vers l'API externe
        const response = await axios.get(apiUrl, {
            params: {
                api_key: apiKey,
                start: start,
                end: end,
            },
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            },
        });

        // Renvoyer les données obtenues
        res.json(response.data);
    } catch (error) {
        console.error("Erreur lors de la requête vers openrouteservice.org. (/coordonées): ", error.response ? error.response.data : error.message);
        res.status(500).send("Erreur lors de la requête vers openrouteservice.org. (/coordonées)");
    }
});

module.exports = router;
