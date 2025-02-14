const express = require("express");
const axios = require("axios");
const router = express.Router();
const soap = require("soap");

const apiUrlSOAP = "http://localhost:8033";

const SOAP_URL = `${apiUrlSOAP}/?wsdl`; // URL du service SOAP en Python

// Route pour récupérer les détails d'un véhicule
router.get('/travel-time', async (req, res) => {
    try {
        // paramètres nécaissaires

        const {total_distance} = req.query;
        const {avg_speed} = req.query;
        const {usable_kwh} = req.query;
        const {consumption} = req.query;
        const {time_charging} = req.query;

        if (!total_distance || !avg_speed || !usable_kwh || !consumption || !time_charging) {
            return res.status(400).json({ error: "Les paramètres sont requis." });
        }

        const client = await soap.createClientAsync(SOAP_URL);

        const result = await client.calculate_travel_timeAsync({
            total_distance,
            avg_speed,
            usable_kwh,
            consumption,
            time_charging
        });

        // création de la réponse
        const resp = {
            time: result[0]["calculate_travel_timeResult0"],
            numberCharge: result[0]["calculate_travel_timeResult1"],
        }
        res.json(resp);
    } catch (error) {
        console.error("Erreur SOAP :", error);
        res.status(500).json({ error: "Erreur lors du calcul du temps de trajet" });
    }
});

module.exports = router;
