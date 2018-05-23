var cancelled2014legend = L.control({position: 'bottomright'});
var cancelled2014info = L.control({position: 'bottomright'});

//Bas VT 2013 /////////////////////////////////////
function cancelled2014style(feature) {
  return {
    fillColor: getColorcancelled2014(feature.properties.percentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorcancelled2014(d) {
    return d > 3 ? '#525252' :
            d > 2 ? '#737373' :
            d > 1 ? '#969696' :
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
     cancelled2014info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      cancelled2014geojson.resetStyle(e.target);
      cancelled2014info.update();
  }

function cancelled2014EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

cancelled2014info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

cancelled2014info.update = function(props) {
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

  cancelled2014legend.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1, 2, 3],
              labels = ['<h5>' + cancelled + '</h5>'];
              this.update();
              return this._div;
      };

        cancelled2014legend.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorcancelled2014(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTBas
  var cancelled2014geojson = L.geoJson(cancelled2014, {
      style: cancelled2014style,
      onEachFeature: cancelled2014EachFeature
  });

//END Bas VT 2013
