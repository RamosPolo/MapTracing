import { renderVehicleList } from './carsRender.js'

export const getVehicleList = () => {
    fetch('http://localhost:8030/api/cars/')
        .then(response => response.json())
        .then(data => {
            renderVehicleList(data);
        })
        .catch(error => console.error('Error fetching vehicle list:', error));
};

export const getVehicleDetails = (vehicleId, callback) => {
    let url = `http://localhost:8030/api/carsd?id=${encodeURIComponent(vehicleId)}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => console.error('Error fetching vehicle details:', error));
};

export const fetchData = async (start, end) => {
    try {
        // Convertir les objets start et end en chaînes de caractères
        const startCoords = `${start.long},${start.lat}`;
        const endCoords = `${end.long},${end.lat}`;

        // Construire l'URL avec les paramètres 'start' et 'end'
        const url = `http://localhost:8030/api/coordonees?start=${encodeURIComponent(startCoords)}&end=${encodeURIComponent(endCoords)}`;
        // Faire la requête fetch
        const response = await fetch(url);

        // Vérifier si la réponse est OK
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données ! (fetchData)");
        }

        // Convertir la réponse en JSON
        const data = await response.json();

        // Retourner les coordonnées
        return data.features[0];
    } catch (error) {
        console.error("Erreur :", error);
        throw error; // Propager l'erreur pour la gérer ailleurs si nécessaire
    }
};
/*
    total_distance : distance total du point de départ au point d'arrivé
    avg_speed = vitesse moyenne du vehicule
    usable_kwh = ressource utilsable pour la voiture en KWh
    consumption = Autonomie de la voiture en kWh
    time_charging = temps de recharge
 */
export const getTimeTravel = async (total_distance, avg_speed, usable_kwh, consumption, time_charging) => {
    try {

        // Construire l'URL avec les paramètres
        const url = `http://localhost:8030/api/travel-time?total_distance=${encodeURIComponent(total_distance)}&avg_speed=${encodeURIComponent(avg_speed)}&usable_kwh=${encodeURIComponent(usable_kwh)}&consumption=${encodeURIComponent(consumption)}&time_charging=${encodeURIComponent(time_charging)}`;
        // Faire la requête fetch
        const response = await fetch(url);

        // Vérifier si la réponse est OK
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données ! (getTimeTravel)");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur :", error);
        throw error;
    }
};
