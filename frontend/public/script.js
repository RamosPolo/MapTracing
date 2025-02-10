import { getVehicleList} from './requestAPI.js';
import { MapManager } from './mapRender.js';
import {handleSearchValues} from './resultRender.js';

const apiKeyMapTitler = 'a7bnhz32Z7OE7e6KXm2y';

// ############## FONCTIONS GENERIQUES ################# //

function initializePageRender(){
    // Initialisation de la map
    const mapManager = new MapManager(apiKeyMapTitler);
    mapManager.initializeMap("map");

    // events
    document.getElementById('searchButton').addEventListener('click',() => handleSearchValues(mapManager));

    // liste des vehicules
    getVehicleList();
}




// ######################################## LOGIQUE APPLICATIVE ############################## //



// exemple d'utilisation pour le temps de trajet


// exemples d'utilisations
// mapManager.addMarker(routeDefaut.start.lat, routeDefaut.start.long);
// mapManager.updateCurrentRoute(routeDefaut.start, routeDefaut.end)

window.onload = initializePageRender ;
