/**
 *
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

/**
  *
  */
function addKMLLayer (clickedElement) {
    var kmlId = clickedElement.id;
    var layers = map.getLayersOptions();

    var isLayerAlreadyAdded = false;

    // removes all non-base layers previously added
    for (var layerId in layers) {
        if (layerId === kmlId) {
            // if the clickedlayer is on the map, we set isLayerAlreadyAdded to true
            isLayerAlreadyAdded = true;
        }
        if (layerId !== "coucheOSM") {
            if (layerId === "USA Orthos" && $(clickedElement).hasClass("USLayer")) {
                continue;
            }
            map.removeLayers(layerId);
        }
    }

    // if we clicked on an USLayer, we add the USA phto layer
    if ($(clickedElement).hasClass("USLayer")) {
        map.addLayers({
            // Couche USA photos
            "USA Orthos" : {
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
                opacity : 0.7,
                visibility : true
            }
        });

    }

    // if the kmlLayer was not on the map, we add it.
    // in the case isLayerAlreadyAdded is true, the layer has been removed just before (see few lines above)
    if (isLayerAlreadyAdded === false) {
        // adds kml Layer associated to the clicked button
        var kmlFilePath = "./map-data/" + kmlId + ".kml";
        var kmlLayerToAdd = {};
        kmlLayerToAdd["" + kmlId] = {
            format : "kml",
            url : kmlFilePath,
            title : kmlId,
            zoomToExtent : true,
            showPointNames : false
        };
        map.addLayers(kmlLayerToAdd);
    }

}

// selects all buttons to add kml
var kmlLayersButtons = document.querySelectorAll("li.kmlLayer");

// adds to the button listener to add layer to the map
for (var i = 0; i < kmlLayersButtons.length; i++) {
    kmlLayersButtons[i].onclick = function () {
        addKMLLayer(this);
    };
}
