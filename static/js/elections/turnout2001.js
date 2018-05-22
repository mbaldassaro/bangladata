var turnout2001legend = L.control({position: 'bottomright'});
var turnout2001info = L.control({position: 'bottomright'});

//Bas VT 2013 /////////////////////////////////////
function turnout2001style(feature) {
  return {
    fillColor: getColorTurnout2001(feature.properties.percentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorTurnout2001(d) {
  return d > 90 ? '#cc4c02' :
        //d > 95 ? '#8c2d04' :
         d > 85 ? '#ec7014' :
         d > 80 ? '#fe9929' :
         d > 75 ? '#fec44f' :
         d > 70 ? '#fee391' :
         d > 60 ? '#fff7bc' :
         //d > 60 ? '#ffffe5' :
         d > 0 ? '#ffffd4' :
                "lightgray";
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
     turnout2001info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      turnout2001geojson.resetStyle(e.target);
      turnout2001info.update();
  }

function turnout2001EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

turnout2001info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

turnout2001info.update = function(props) {
    this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
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

  turnout2001legend.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 60, 70, 75, 80, 85, 90],
              labels = ['<h5>' + turnout + '</h5>'];
              this.update();
              return this._div;
      };

        turnout2001legend.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorTurnout2001(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTBas
  var turnout2001geojson = L.geoJson(turnout2001, {
      style: turnout2001style,
      onEachFeature: turnout2001EachFeature
  });

//END Bas VT 2013
