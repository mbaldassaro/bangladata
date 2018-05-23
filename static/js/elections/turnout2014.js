var turnout2014legend = L.control({position: 'bottomright'});
var turnout2014info = L.control({position: 'bottomright'});

//Bas VT 2013 /////////////////////////////////////
function turnout2014style(feature) {
  return {
    fillColor: getColorTurnout2014(feature.properties.percentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorTurnout2014(d) {
  return d > 90 ? '#800026' :
         d > 80 ? '#bd0026' :
         d > 70 ? '#cc4c02' :
         d > 60 ? '#ec7014' :
         d > 50 ? '#fe9929' :
         d > 40 ? '#fec44f' :
         d > 30 ? '#fee391' :
         d > 20 ? '#fff7bc' :
         d > 10 ? '#ffffcc' :
         d > 0 ?  '#ffffe5' :
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
     turnout2014info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      turnout2014geojson.resetStyle(e.target);
      turnout2014info.update();
  }

function turnout2014EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

turnout2014info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

turnout2014info.update = function(props) {
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

  turnout2014legend.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
              labels = ['<h5>' + turnout + '</h5>'];
              this.update();
              return this._div;
      };

        turnout2014legend.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorTurnout2014(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTBas
  var turnout2014geojson = L.geoJson(turnout2014, {
      style: turnout2014style,
      onEachFeature: turnout2014EachFeature
  });

//END Bas VT 2013
