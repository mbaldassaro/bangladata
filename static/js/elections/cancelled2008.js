var cancelled2008legend = L.control({position: 'bottomright'});
var cancelled2008info = L.control({position: 'bottomright'});

//Bas VT 2013 /////////////////////////////////////
function cancelled2008style(feature) {
  return {
    fillColor: getColorcancelled2008(feature.properties.percentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorcancelled2008(d) {
    return d > 1 ? '#969696' :
          //d > 1 ? '#bdbdbd' :
           d > 0 ? '#d9d9d9' :
                  '#ffffff';
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
     cancelled2008info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      cancelled2008geojson.resetStyle(e.target);
      cancelled2008info.update();
  }

function cancelled2008EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

cancelled2008info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

cancelled2008info.update = function(props) {
    this._div.innerHTML = (props ? '<h5>' + props.CST_N + '</h5>'
      + '<h5>' + voterTot + ': ' + props.turnout + '</h5>'
      + '<h5>' + cancelled + ': ' + props.cancelledBallots + '</h5>'
      + '<h5>' + cancelledPercentage + ': ' + props.percentage + '%</h5>'
      + '' : '')
  };

//infoBasVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  cancelled2008legend.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1],
              labels = ['<h5>' + cancelled + '</h5>'];
              this.update();
              return this._div;
      };

        cancelled2008legend.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorcancelled2008(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTBas
  var cancelled2008geojson = L.geoJson(cancelled2008, {
      style: cancelled2008style,
      onEachFeature: cancelled2008EachFeature
  });

//END Bas VT 2013
