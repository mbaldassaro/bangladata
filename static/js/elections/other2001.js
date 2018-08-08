var other2001legend = L.control({position: 'bottomright'});
var other2001info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function other2001style(feature) {
  return {
    fillColor: getColorother2001(feature.properties.otherPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorother2001(d) {
    return d > 50 ? '#4292c6' :
           d > 40 ? '#6baed6' :
           d > 30 ? '#9ecae1' :
           d > 20 ? '#c6dbef' :
           d > 0 ?  '#eff3ff' :
                    'lightgray' ;
      }

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#FFFFFF',
      dashArray: '',
      fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
         layer.bringToFront();
     }
     other2001info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      other2001geojson.resetStyle(e.target);
      other2001info.update();
  }

function other2001EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

other2001info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

other2001info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.other + '</h5>'
  + '<h5>' + pctVote + ': ' + props.otherPercentage + '%</h5>'
  + '<h5>' + winner + ': ' + props.winner + '</h5>'
  + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  other2001legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 20, 30, 40, 50],
          labels = ['<h5>' + other + ' ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    other2001legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorother2001(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var other2001geojson = L.geoJson(other2001, {
      style: other2001style,
      onEachFeature: other2001EachFeature
  });
//END PD /////////////////////////////////////
