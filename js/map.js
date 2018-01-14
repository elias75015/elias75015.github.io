map = Gp.Map.load(
    "viewerDiv",   // identifiant du conteneur HTML
    // options d'affichage de la carte (Gp.MapOptions)
    {
         // clef d'accès à la plateforme
         apiKey: "yogxjonad4s1bk7a2hs62ytc",
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
           // Couche photographies aériennes
           "ORTHOIMAGERY.ORTHOPHOTOS" : {},
           // Couche photographies aériennes
           "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD" : {
               opacity : 0.5
           }
         },
         controlsOptions : {
           "layerswitcher" : {
             div : "viewerDiv",
             maximised : true
           },
           "graticule" : {
           },
           "mouseposition" : {
             div : "viewerDiv",
             displayAltitude : false
           },
           "getfeatureinfo" : {
             auto : true
           }
         }
    }
) ;

function addKMLLayer(kmlId) {
  var layers = map.getLayersOptions();
  // removes all kml layers previously added
  for (var layerId in layers) {
    if (layers[layerId].format === "kml" && layerId !== kmlId) {
      map.removeLayers(layerId);
    }
  }
  // adds kml Layer associated to the clicked button
  var kmlFilePath = "./map-data/" + kmlId + ".kml";
  map.addLayers({
    kmlId : {
      format : "kml",
      url : kmlFilePath,
      title : kmlId,
      showPointNames : true
    }
  });
}

// selects all buttons to add kml
var kmlLayersButtons = document.querySelectorAll("button.kmlLayer");

// adds to the button listener to add layer to the map
for (var i = 0; i < kmlLayersButtons.length; i++) {
  kmlLayersButtons[i].onclick = function() {
    addKMLLayer(this.id)
  }
}
