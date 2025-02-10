const express = require("express");
const path = require("path");
const cors = require("cors");
const mapRoute = require("./routes/mapping");
const coordinatesRoute = require("./routes/coordonnesRoute");
const carsRouteApi = require("./routes/carsRequest");
const travelTimeRoute = require ("./routes/travel-time")


const app = express();
const PORT = process.env.PORT || 8030;
app.use(cors());

// Route par défaut pour vérifier le serveur
app.get("/", (req, res) => {
    res.send("Hello server !");
});

// API map externe
app.use("/api", mapRoute);
app.use("/api", coordinatesRoute);
app.use("/api", carsRouteApi);
app.use("/api", travelTimeRoute);

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
});
