var bnp2001legend = L.control({position: 'bottomright'});
var bnp2001info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function bnp2001style(feature) {
  return {
    fillColor: getColorbnp2001(feature.properties.bnpPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorbnp2001(d) {
    return d > 70 ? '#99000d' :
           d > 60 ? '#cb181d' :
           d > 50 ? '#ef3b2c' :
           d > 40 ? '#fb6a4a' :
           d > 30 ? '#fc9272' :
           d > 20 ? '#fcbba1' :
           d > 0 ?  '#fee5d9' :
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
     bnp2001info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      bnp2001geojson.resetStyle(e.target);
      bnp2001info.update();
  }

function bnp2001EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

bnp2001info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

bnp2001info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.bnp + '</h5>'
  + '<h5>' + pctVote + ': ' + props.bnpPercentage + '%</h5>'
  + '<h5>' + winner + ': ' + props.winner + '</h5>'
  + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  bnp2001legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 20, 30, 40, 50, 60, 70],
          labels = ['<h5>BNP ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    bnp2001legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorbnp2001(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var bnp2001geojson = L.geoJson(bnp2001, {
      style: bnp2001style,
      onEachFeature: bnp2001EachFeature
  });
//END PD /////////////////////////////////////
