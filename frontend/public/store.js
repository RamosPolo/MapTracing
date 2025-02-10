import {getVehicleDetails} from "./requestAPI.js";

let selectedVehicle = null;
let durationTime = null;
let listeCoordinates = null;

export function setSelectedVehicle(id) {
    getVehicleDetails(id, (data) => {
        selectedVehicle = data;
    });
}

export function getSelectedVehicle() {
    return selectedVehicle;
}

export function setDistance(duration) {
    durationTime = duration;
}

export function getDistance() {
    return durationTime;
}

export function setCooordinatesListe(l){
    listeCoordinates = l;
}

export function getCoordinatesListe(){
    return listeCoordinates;
}
