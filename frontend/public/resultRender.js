import {getSelectedVehicle, getDistance, getCoordinatesListe} from './store.js'
import {getTimeTravel} from "./requestAPI.js";

const resultContainer = document.getElementById('resultContainer');
const geocoder = new google.maps.Geocoder();

let pointDepartJSON = {};
let pointArriveeJSON = {};

function geocode(request) {
    return geocoder
        .geocode(request)
        .then((result) => {
            const { results } = result;
            return results;
        })
        .catch((e) => {
            console.error("Geocode a échoué pour la raison suivante :", e);
            return null;
        });
}


export const handleSearchValues = async (mapManager) => {


    let depart = document.getElementById('departure').value;
    let arrivee = document.getElementById('arrival').value;
    // réinitialisation du champ de valeurs
    resultContainer.innerText = '';

    let datasCar = getSelectedVehicle()

    // verifier les valeurs entrées
    if (depart === "" || arrivee === "") {
        resultContainer.innerHTML = 'Entrez des valeurs valides';
    }
    if (datasCar == null) {
        resultContainer.innerHTML = 'Veuillez sélectionner un véhicule.';
    }

    if (valeursOk(depart, arrivee, datasCar) === true) {
        console.log("Tout est bon")

        var valTEst1 = "Chambéry, 10 boulevard Gambetta"
        var valTExt2 = "Paris"


        const request1 = {address: valTEst1};
        var res1 = await geocode(request1);
        const request2 = {address: valTExt2};
        var res2 = await geocode(request2);
        pointDepartJSON = {lat: res1[0].geometry.viewport.ii.hi , lon:res1[0].geometry.viewport.Gh.hi};
        pointArriveeJSON = {lat: res2[0].geometry.viewport.ii.hi , lon:res2[0].geometry.viewport.Gh.hi};
        console.log(pointDepartJSON)
        console.log(pointArriveeJSON)
        mapManager.addMarker(pointDepartJSON.lat, pointDepartJSON.lon)
        mapManager.addMarker(pointArriveeJSON.lat, pointArriveeJSON.lon)
        await mapManager.updateCurrentRoute(
            {lat: pointDepartJSON.lat, long: pointDepartJSON.lon}, {lat: pointArriveeJSON.lat, long: pointArriveeJSON.lon
        })
        var autonomie = (datasCar.vehicle.range.best.combined + datasCar.vehicle.range.worst.combined)/2
        var usable_battery = datasCar.vehicle.battery.usable_kwh;
        var avg_speed = 51.3;
        var time_charging = datasCar.vehicle.connectors[1].time

        const respTime = await getTimeTravel(getDistance(),avg_speed,usable_battery, autonomie,time_charging);

        var resultBorneResearch = getIntermediatePoints(getCoordinatesListe(), respTime.numberCharge);
        console.log(resultBorneResearch);

    }
}

function valeursOk(value1, value2, value3){
    return value1 !== "" && value2 !== "" && value3 != null;
}


// retourne les coordonnées importantes (pour les bornes)
function getIntermediatePoints(coordinates, divisions) {
    if (divisions < 1 || coordinates.length < 3) return [];

    let result = [];
    let step = (coordinates.length - 1) / (divisions + 1);

    for (let i = 1; i <= divisions; i++) {
        let index = Math.round(i * step);
        result.push(coordinates[index]);
    }
    return result;
}


