var turnout2008legend = L.control({position: 'bottomright'});
var turnout2008info = L.control({position: 'bottomright'});

//Bas VT 2013 /////////////////////////////////////
function turnout2008style(feature) {
  return {
    fillColor: getColorTurnout2008(feature.properties.percentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorTurnout2008(d) {
  return d > 90 ? '#800026' :
         d > 80 ? '#bd0026' :
         d > 70 ? '#cc4c02' :
                  'lightgray';
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
     turnout2008info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      turnout2008geojson.resetStyle(e.target);
      turnout2008info.update();
  }

function turnout2008EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

turnout2008info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

turnout2008info.update = function(props) {
    this._div.innerHTML = (props ? '<h5>' + props.CST_N + '</h5>'
      + '<h5>' + voterReg + ': ' + props.regVoters + '</h5>'
      + '<h5>' + voterTot + ': ' + props.turnout + '</h5>'
      + '<h5>' + turnout + ': ' + props.percentage + '%</h5>'
      + '' : '')
  };

//infoBasVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  turnout2008legend.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [70, 80, 90],
              labels = ['<h5>' + turnout + '</h5>'];
              this.update();
              return this._div;
      };

        turnout2008legend.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorTurnout2008(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTBas
  var turnout2008geojson = L.geoJson(turnout2008, {
      style: turnout2008style,
      onEachFeature: turnout2008EachFeature
  });

//END Bas VT 2013
