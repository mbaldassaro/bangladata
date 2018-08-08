var other2008legend = L.control({position: 'bottomright'});
var other2008info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function other2008style(feature) {
  return {
    fillColor: getColorother2008(feature.properties.otherPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorother2008(d) {
    return d > 70 ? '#084594' :
           d > 60 ? '#2171b5' :
           d > 50 ? '#4292c6' :
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
     other2008info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      other2008geojson.resetStyle(e.target);
      other2008info.update();
  }

function other2008EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

other2008info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

other2008info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + props.CST_N + '</h5>'
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

  other2008legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 20, 30, 40, 50, 60, 70],
          labels = ['<h5>' + other + ' ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    other2008legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorother2008(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var other2008geojson = L.geoJson(other2008, {
      style: other2008style,
      onEachFeature: other2008EachFeature
  });
//END PD /////////////////////////////////////
