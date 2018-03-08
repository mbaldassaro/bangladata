

/*Step 2) //Same */
function init() {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1QBNOe0UVM_70DmyangcpUVyzzmjjvGm7xTebEKsA9HM/pubhtml',
      callback: function(data, tabletop) { console.log(data) },
      simpleSheet: true } )
}

/*Step 3) Change: vimselections */
var vimselections;  //declared outside function for use in layer control
window.addEventListener('DOMContentLoaded', init)
if (window.location.hash === "#cluster") {
	var vimselections = new L.MarkerClusterGroup();  	// Set up cluster group
} else {
	var vimselections = new L.LayerGroup();  	// Otherwise set up normal marker group
}

//Step 4) Same
var spreadsheet_key = '1QBNOe0UVM_70DmyangcpUVyzzmjjvGm7xTebEKsA9HM';
var lat_column = 'Latitude';  // Name of lat column in Google spreadsheet
var long_column = 'Longitude'; // Name of long column in Google spreadsheet
//var global_markers_data;

//Step 5) Same
function getColor(d) {
  return  d > 4   ? "orange"   :
          d > 3   ? "purple"   :
          d > 2   ? "blue"   :
          d > 1   ? "green"   :
          d > 0   ? "red"   :
                    "gray" ;
}

/*function calcRadius(d) {
    var scaleFactor = 10;
    var area = d * scaleFactor;
    return Math.sqrt(area/Math.PI) * 2;
}*/

//Step 6) Same
function generatePopup(content){
  var popup_header = '<h6>Event: ' + content['EventType1'] + '</h6>'
  var popup_content1 = '<h6>Date: ' + content['EventDate'] + '</h6>'
  var popup_content2 = '<h6>Location: ' + content['LocationUpazillaThana'] + '<h6>'
  var popup_content3 = '<h6>Perpetrator: ' + content['Perpetrator1'] + '</h6>'
  var popup_content4 = '<h6>Target: ' + content['MainTargetGroup'] + '</h6>'
  var popup_content5 = '<h6>Deaths: ' + content['TotalKilled'] + ' / Injuries: ' + content['TotalInjured'] + '</h6>'
	var popup_contentD = '<h6>Description: ' + content['EventDescription'] + '</h6>'
	return popup_header + popup_content1 + popup_content2 + popup_content3 + popup_content4 + popup_content5 + popup_contentD;
}

//Step 7) Change if(current.type ==) { vimselections.addLayer(layer_marker); }
function loadMarkersToMap(data) {
  for(var i = 0; i < data.length; i++) {
    current = data[i];
    var marker_location = new L.LatLng(current[lat_column], current[long_column]);
		var layer_marker = L.circleMarker(marker_location, {
			//radius: calcRadius(current.type),
      radius: 3,
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
        this.setStyle({ fillOpacity: 0.8 });
      }
    });

    layer_marker.bindPopup(generatePopup(current));
    if(current.type == '3') { vimselections.addLayer(layer_marker); }
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
