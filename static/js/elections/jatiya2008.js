var jatiya2008legend = L.control({position: 'bottomright'});
var jatiya2008info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function jatiya2008style(feature) {
  return {
    fillColor: getColorjatiya2008(feature.properties.jatiyaPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorjatiya2008(d) {
    return d > 70 ? '#4a1486' :
           d > 60 ? '#6a51a3' :
           d > 50 ? '#807dba' :
           d > 40 ? '#9e9ac8' :
           d > 30 ? '#bcbddc' :
           d > 20 ? '#dadaeb' :
           d > 0 ?  '#f2f0f7' :
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
     jatiya2008info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      jatiya2008geojson.resetStyle(e.target);
      jatiya2008info.update();
  }

function jatiya2008EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

jatiya2008info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

jatiya2008info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + props.CST_N + '</h5>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.jatiya + '</h5>'
  + '<h5>' + pctVote + ': ' + props.jatiyaPercentage + '%</h5>'
  + '<h5>' + winner + ': ' + props.winner + '</h5>'
  + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  jatiya2008legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 20, 30, 40, 50, 60, 70],
          labels = ['<h5>JP ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    jatiya2008legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorjatiya2008(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var jatiya2008geojson = L.geoJson(jatiya2008, {
      style: jatiya2008style,
      onEachFeature: jatiya2008EachFeature
  });
//END PD /////////////////////////////////////
