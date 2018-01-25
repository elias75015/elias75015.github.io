/**
 * Function to create the map
 */
function createMap () {
    return Gp.Map.load(
    "mainContent",   // identifiant du conteneur HTML
    // options d'affichage de la carte (Gp.MapOptions)
    {
        // clef d'accès à la plateforme
        apiKey : "yogxjonad4s1bk7a2hs62ytc",
        // centrage de la carte
        center : {
            x : -60,
            y : -18,
            projection : "CRS:84"
        },
        // niveau de zoom de la carte (de 1 à 21)
        zoom : 4,
        // Couches à afficher
        layersOptions : {
            // Couche openstreetmap
            coucheOSM : {
                opacity : 1,
                position : 0,
                visibility : true,
                format :"osm",
                title : "OpenStreetMap",
                url : "https://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=39cfa021a92541bdbcac02cf76e3a2ce",
                crossOrigin : null
            }
        },
        controlsOptions : {
            "layerswitcher" : {
                div : "mainContent",
                maximised : true
            },
            "graticule" : {
            },
            "getfeatureInfo" : {
                options : {
                    auto : true,
                    hidden : true
                }
            }
        }
    }
) ;
};


/**************************** MAP FUNCTIONS ********************************************/

/**
  * Fonction qui remet tout à zero:
  * - suppression de toutes les couches présentes
  * - ajout de la couche de fond OSM
  * - ajout de la couche KML de l'itinéraire choisi 
  * - centrage sur cet itinéraire
  */
function goTo (clickedElement) {
    var itiId = clickedElement.id;
    var layers = map.getLayersOptions();

    // Suppression de toutes les couches précédement ajoutées
    for (var layerId in layers) {
        if (layerId !== "coucheOSM") {
            map.removeLayers(layerId);
        }
    }
    // réajout de la couche OSM si elle a été supprimée
    if (!layers["coucheOSM"]) {
        map.addLayers(baseLayers["OSM"]);
    }

    // ajout du kml itineraire correspondant
    var itiKmlFilePath = "./map-data/" + itiId + ".kml";
    var itiKmlLayerToAdd = {};
    itiKmlLayerToAdd[itiId] = {
        format : "kml",
        url : itiKmlFilePath,
        title : itiId,
        zoomToExtent : true,
        showPointNames : false
    };
    
    map.addLayers(itiKmlLayerToAdd);
}

/**
  * Fonction qui : 
  * - ajoute un kml s'il n'est pas déja présent
  * - supprime un kml s'il est déjà présent 
  *
  */
function addKMLLayer (clickedElement) {
    var kmlId = clickedElement.id;
    var layers = map.getLayersOptions();

    var isLayerAlreadyAdded = false;

    // checks if the clickedlayer is on the map
    // - yes ? we set isLayerAlreadyAdded to true
    for (var layerId in layers) {
        if (layerId === kmlId) {
            isLayerAlreadyAdded = true;
        }
    }

    // if the kmlLayer is not on the map, we add it.
    // if the kmlLayer is on the map, we remove it.
    if (isLayerAlreadyAdded === false) {
        // adds kml Layer associated to the clicked button
        var kmlFilePath = "./map-data/" + kmlId + ".kml";
        var kmlLayerToAdd = {};
        kmlLayerToAdd[kmlId] = {
            format : "kml",
            url : kmlFilePath,
            title : kmlId,
            // zoomToExtent : true,
            showPointNames : false
        };
        map.addLayers(kmlLayerToAdd);
    } else {
        map.removeLayers(kmlId);
    }

}


function addBaseLayer (clickedElement) {
    var baseLayerId = clickedElement.id;

    var layers = map.getLayersOptions();

    // Deleting previous baseLayer
    for (var layerId in layers) {
        for (var blId in baseLayers) {
            if (baseLayers[blId][layerId]) {
                map.removeLayers(layerId);
                break;
            }
        }
    }
    // Add the baseLayer to the map
    map.addLayers(baseLayers[baseLayerId]);

}

// Object referencing all the base layers we can add to the map
// the first level of keys of this object must correspond to the baselayer <li> tag id
const baseLayers = {
    "OSM" : {
        "coucheOSM" : {
            position : 0,
            opacity : 1,
            visibility : true,
            format :"osm",
            title : "OpenStreetMap",
            url : "https://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=39cfa021a92541bdbcac02cf76e3a2ce",
            crossOrigin : null
            }
        },
    "US_ORTHO" : {
        "USA Orthos" : {
            position : 0,
            format : "wmts",
            title : "Photos US",
            url : "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/WMTS/tile/1.0.0/USGSImageryOnly/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}",
            layer : "USGSImageryOnly",
            tileMatrixSet : "default028mm",
            topLeftCorner : {
                x : -20037508,
                y : 20037508
            },
            styleName : "default",
            outputFormat : "image/png",
            opacity : 1,
            visibility : true
        }
    },
    "NAT_GEO" : {
        "National Geo" : {
            position : 0,
            opacity : 1,
            visibility : true,
            format :"osm",
            title : "National Geographic",
            url : "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
            crossOrigin : null
            }
    }
}

/************** ADD LISTENERS TO DOM  **********************************/

// selects all buttons to add itinerary kml
var itiLayersButtons = document.querySelectorAll("li.itiLayer");

// adds to the button listener to add layer to the map
for (var i = 0; i < itiLayersButtons.length; i++) {
    itiLayersButtons[i].onclick = function () {
        goTo(this);
    };
}


// selects all buttons to add kml
var kmlLayersButtons = document.querySelectorAll("li.kmlLayer");

// adds to the button listener to add layer to the map
for (var i = 0; i < kmlLayersButtons.length; i++) {
    kmlLayersButtons[i].onclick = function () {
        addKMLLayer(this);
    };
}

// selects all buttons to add base layer
var baseLayersButtons = document.querySelectorAll("li.baseLayer");

// adds to the button listener to add layer to the map
for (var i = 0; i < baseLayersButtons.length; i++) {
    baseLayersButtons[i].onclick = function () {
        addBaseLayer(this);
    };
}