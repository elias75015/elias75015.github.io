var map = Gp.Map.load(
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
             "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD" : {
             }
         }
    }
) ;
