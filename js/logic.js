// Creating map object
var map = L.map("map", {
  center: [32.82, -117.1611],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "../council_districts_datasd.geojson";

// Function that will determine the color of a district based on the district it belongs to
function chooseColor(district) {
  switch (district) {
  case 1:
    return "teal";
  case 2:
    return "blue";
  case 3:
    return "green";
  case 4:
    return "orange";
  case 5:
    return "purple";
  case 6:
    return "brown";
  case 7:
    return "yellow";
  case 8:
    return "red";
  case 9:
    return "magenta";
  default:
    return "black";
  }
}



// var WriterzBlok = {
//   location: [32.710720, -117.086959],
//   name: "Writerz Blok"
// };

// var marker = L.marker(WriterzBlok).addTo(myMap);



// Grabbing our GeoJSON data..
d3.json(link, function(geojsondata) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(geojsondata, {
    // Style each feature (in this case a district)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our district (color based on district)
        fillColor: chooseColor(feature.properties.district),
        fillOpacity: 0.3,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.7
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.3
          });
        },
        // When a feature (district) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1> District " + feature.properties.district + "</h1> <hr> <h2>" + feature.properties.district + "</h2>");

    }
  }).addTo(map);
});
