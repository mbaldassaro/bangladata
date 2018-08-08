var bnp2008legend = L.control({position: 'bottomright'});
var bnp2008info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function bnp2008style(feature) {
  return {
    fillColor: getColorbnp2008(feature.properties.bnpPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorbnp2008(d) {
  return d > 90 ? '#67000d' :
         d > 80 ? '#a50f15' :
         d > 70 ? '#cb181d' :
         d > 60 ? '#ef3b2c' :
         d > 50 ? '#fb6a4a' :
         d > 40 ? '#fc9272' :
         d > 30 ? '#fcbba1' :
         d > 20 ? '#fee0d2' :
         d > 10 ? '#fff5f0' :
         d > 0 ?  '#fffbf9' :
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
     bnp2008info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      bnp2008geojson.resetStyle(e.target);
      bnp2008info.update();
  }

function bnp2008EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

bnp2008info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

bnp2008info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + props.CST_N + '</h5>'
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

  bnp2008legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
          labels = ['<h5>' + bnp + ' '  + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    bnp2008legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorbnp2008(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var bnp2008geojson = L.geoJson(bnp2008, {
      style: bnp2008style,
      onEachFeature: bnp2008EachFeature
  });
//END PD /////////////////////////////////////
