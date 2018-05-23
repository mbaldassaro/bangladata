var other2014legend = L.control({position: 'bottomright'});
var other2014info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function other2014style(feature) {
  return {
    fillColor: getColorother2014(feature.properties.otherPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorother2014(d) {
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
     other2014info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      other2014geojson.resetStyle(e.target);
      other2014info.update();
  }

function other2014EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

other2014info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

other2014info.update = function(props) {
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

  other2014legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 20, 30, 40, 50, 60, 70],
          labels = ['<h5>Other ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    other2014legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorother2014(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var other2014geojson = L.geoJson(other2014, {
      style: other2014style,
      onEachFeature: other2014EachFeature
  });
//END PD /////////////////////////////////////
