var cancelled2001legend = L.control({position: 'bottomright'});
var cancelled2001info = L.control({position: 'bottomright'});

//Bas VT 2013 /////////////////////////////////////
function cancelled2001style(feature) {
  return {
    fillColor: getColorcancelled2001(feature.properties.percentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorcancelled2001(d) {
    return d > 1 ? '#969696' :
          //d > 1 ? '#bdbdbd' :
           d > 0 ? '#d9d9d9' :
                  '#ffffd4';
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
     cancelled2001info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      cancelled2001geojson.resetStyle(e.target);
      cancelled2001info.update();
  }

function cancelled2001EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

cancelled2001info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

cancelled2001info.update = function(props) {
    this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
      + '<h5>' + voterTot + ': ' + props.totalVotes + '</h5>'
      + '<h5>' + cancelled + ': ' + props.cancelledBallots + '</h5>'
      + '<h5>' + cancelledPercentage + ': ' + props.percentage + '%</h5>'
      + '' : '')
  };

//infoBasVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  cancelled2001legend.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1],
              labels = ['<h5>' + cancelled + '</h5>'];
              this.update();
              return this._div;
      };

        cancelled2001legend.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorcancelled2001(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTBas
  var cancelled2001geojson = L.geoJson(cancelled2001, {
      style: cancelled2001style,
      onEachFeature: cancelled2001EachFeature
  });

//END Bas VT 2013
