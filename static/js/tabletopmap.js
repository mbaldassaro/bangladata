/* var tableLegend = L.control({ position: 'bottomright' }); */

/*Step 1) Load map layer*/  //place inside html page script to set layer
/*
$(document).ready(function() {
L.control.layers(baseLayers, null, {collapsed: true, position: 'topleft'}).addTo(map);
map.flyTo([21.133391, 92.187985], 10);
});
*/

/*Step 2) Initialize tabletop to read published Google Sheet*/
function init() {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1qyhvJKLyF5s2mrVgRUKFzTjHJk6Zip7wRYBltig21yA/pubhtml',
      callback: function(data, tabletop) { console.log(data) },
      simpleSheet: true } )
}

/*Step 3) Set Leaflet Layer Group - Individual Marker OR Marker Cluster*/
var markers;  //declared outside function for use in layer control
window.addEventListener('DOMContentLoaded', init)
if (window.location.hash === "#cluster") {
	var markers = new L.MarkerClusterGroup();  	// Set up cluster group
} else {
	var markers = new L.LayerGroup();  	// Otherwise set up normal marker group
}

//Step 4) Declare spreadsheet properties as variables
var spreadsheet_key = '1qyhvJKLyF5s2mrVgRUKFzTjHJk6Zip7wRYBltig21yA';
var lat_column = 'Latitude';  // Name of lat column in Google spreadsheet
var long_column = 'Longitude'; // Name of long column in Google spreadsheet
//var global_markers_data;

//Step 5) Declare marker option variables / variables
function getColor(d) {
  return  d > 3  ? "blue"   :
          d > 2  ? "yellow" :
          d > 1   ? "darkred":
          d > 0   ? "green"  :
                    "gray" ;
}

function calcRadius(d) {
    var scaleFactor = 10;
    var area = d * scaleFactor;
    return Math.sqrt(area/Math.PI) * 2;
}

//Step 6) Declare info popup
function generatePopup(content){
	var popup_header = '<h6>' + content['name'] + '</h5>'
	var popup_content = '<h6>' + content['dummy'] + '</h6>'
	return popup_header + popup_content;
}

//Step 7) Loop through Google Spreadsheet and place markers on map
function loadMarkersToMap(data) {
  for(var i = 0; i < data.length; i++) {
    current = data[i];
    var marker_location = new L.LatLng(current[lat_column], current[long_column]);
		var layer_marker = L.circleMarker(marker_location, {
			radius: calcRadius(current.type),
			fillColor: getColor(current.type),
			color: getColor(current.type),
			weight: 1,
			opacity: 1,
			fillOpacity: 0.6
		}).on({
      mouseover: function(e) {
        this.openPopup();
        this.setStyle({ fillOpacity: 1 });
      },
      mouseout: function(e) {
        this.closePopup();
        this.setStyle({ fillOpacity: 0.6 });
      }
    });

    layer_marker.bindPopup(generatePopup(current));
		markers.addLayer(layer_marker);
	}
	//map.addLayer(markers);   //remove for layer control
}

/*
tableLegend.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info legend'),
    grades = [1, 2, 3, 4],
    labels = ['<h4>Dummy Type</h4>' +
    '<h6><strong>Dummy 1 ' + '<i class="circle" style="background:' + getColor(grades[0]) + '"></i></strong></h6>' +
    '<h6><strong>Dummy 2 ' + '<i class="circle" style="background:' + getColor(grades[1]) + '"></i></strong></h6>' +
    '<h6><strong>Dummy 3 ' + '<i class="circle" style="background:' + getColor(grades[2]) + '"></i></strong></h6>' +
    '<h6><strong>Dummy 4 ' + '<i class="circle" style="background:' + getColor(grades[3]) + '"></i></strong></h6>' ];
    this._div.innerHTML = labels.join('');
    return this._div;
  };
  */

//Step 8) Pull data from Google spreadsheet via Tabletop
function initializeTabletopObjectMarkers(){
	Tabletop.init({
    	key: spreadsheet_key,
    	callback: loadMarkersToMap,
    	simpleSheet: true,
    	debug: false
    });
}

// Add JSON data to map - if not done with map-tabletop-geojson.js
initializeTabletopObjectMarkers();
