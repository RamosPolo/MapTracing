import {fetchData} from "./requestAPI.js";
import {setCooordinatesListe, setDistance} from "./store.js";

// ################################## CLASS MAP MANAGER ################################## //
const coordonneesDefaut = { lat: '48.866667', long: '2.333333' }
const routeDefaut = {start: coordonneesDefaut, end: {lat:'48.78385024139703', long:'2.1771688180676785'}}
const routeTest = {start: {lat:45.573273,long:5.914611}, end:{lat:45.785915236247384,long:4.781404457598999}}

/*

- Format pour une coordonée:
{
    lat: '...',
    long: '...',
}


- Format pour une route :
{
    start:
        {
            lat: '...',
            long: '...',
        },
    end:
        {
            lat: '...',
            long: '...',
        }
    },
}



 */


export class MapManager {
    constructor(apiKeyMapTiler) {
        this.apiKeyMapTiler = apiKeyMapTiler;
        this.coordinates = coordonneesDefaut;
        this.map = null;
        this.route = [];
        this.polylineClass = null;
    }

    // Initialise la map
    initializeMap(containerId, zoomLevel = 10) {
        if (!containerId) {
            throw new Error("Un containerId est requis pour afficher la carte.");
        }

        this.map = L.map(containerId).setView(
            [this.coordinates.lat, this.coordinates.long],
            zoomLevel
        );

        L.tileLayer(
            `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${this.apiKeyMapTiler}`,
            {
                tileSize: 512,
                zoomOffset: -1,
                minZoom: 1,
                attribution:
                    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
                    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
                crossOrigin: true,
            }
        ).addTo(this.map);
    }

    addMarker(lat, long) {
        L.marker([lat, long]).addTo(this.map);
    }

    async updateCurrentRoute(s, e){
        var r = await fetchData(s, e);
        this.route = r.geometry.coordinates;
        setDistance(r.properties.summary.distance)
        setCooordinatesListe(r.geometry.coordinates)
        this.drawRoute();
    }

    drawRoute(){
        var l = this.route;
        const invertedCoordinates = l.map(([lon, lat]) => [lat, lon]);
        // this.map.remove();
        // this.initializeMap("map");
        if(this.polylineClass === null){
            this.polylineClass = L.polyline(invertedCoordinates, {color: 'red'}).addTo(this.map);
        } else {
            this.polylineClass.setLatLngs(invertedCoordinates);
        }
        this.map.fitBounds(this.polylineClass.getBounds());
    }

    // Méthode pour générer les paramètres pour une requête
    getRequestParams() {
        return {
            api_key: this.apiKey,
            start: `${this.coordinates.lat},${this.coordinates.long}`,
            end: `${this.coordinates.lat},${this.coordinates.long}`,
        };
    }
}

