/*Step 2) //Same */
function init() {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1aI0S3p-ZF4kfh5GEvXHjNY-i2MHd9StKrTkrqWwEMCo/pubhtml',
      callback: function(data, tabletop) { console.log(data) },
      simpleSheet: true } )
}

/*Step 3) Change: markersOne */
var markersIFES;  //declared outside function for use in layer control
window.addEventListener('DOMContentLoaded', init)
if (window.location.hash === "#cluster") {
	var markersIFES = new L.MarkerClusterGroup();  	// Set up cluster group
} else {
	var markersIFES = new L.LayerGroup();  	// Otherwise set up normal marker group
}

//Step 4) Same
var spreadsheet_key = '1aI0S3p-ZF4kfh5GEvXHjNY-i2MHd9StKrTkrqWwEMCo';
var lat_column = 'Latitude';  // Name of lat column in Google spreadsheet
var long_column = 'Longitude'; // Name of long column in Google spreadsheet
//var global_markers_data;

//Step 5) Same
function getColor(d) {
  return  d > 3   ? "blue"   :
          d > 2   ? "yellow" :
          d > 1   ? "darkred":
          d > 0   ? "green"  :
                    "gray" ;
}

function calcRadius(d) {
    var scaleFactor = 10;
    var area = d * scaleFactor;
    return Math.sqrt(area/Math.PI) * 2;
}

//Step 6) Same
function generatePopup(content){
	var popup_header = '<h6>' + content['location'] + '</h5>'
	var popup_content = '<h6>' + content['description'] + '</h6>'
	return popup_header + popup_content;
}

//Step 7) Change if(current.type ==) { markersOne.addLayer(layer_marker); }
function loadMarkersToMap(data) {
  for(var i = 0; i < data.length; i++) {
    current = data[i];
    var marker_location = new L.LatLng(current[lat_column], current[long_column]);
		var layer_marker = L.marker(marker_location, {
			//radius: calcRadius(current.type),
			fillColor: getColor(current.type),
			color: getColor(current.type),
			weight: 1,
			opacity: 1,
			fillOpacity: 0.6
		}).on({
      mouseover: function(e) {
        this.openPopup();
        //this.setStyle({ fillOpacity: 1 });
      },
      mouseout: function(e) {
        this.closePopup();
        //this.setStyle({ fillOpacity: 0.6 });
      }
    });

    layer_marker.bindPopup(generatePopup(current));
    if(current.type == '4') { markersIFES.addLayer(layer_marker); }
	}
	//map.addLayer(markers);   //remove for layer control
}

//Step 8: Same
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
