var jib2008legend = L.control({position: 'bottomright'});
var jib2008info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function jib2008style(feature) {
  return {
    fillColor: getColorjib2008(feature.properties.jibPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorjib2008(d) {
    return d > 50 ? '#bf9b30' :
           d > 40 ? '#ffbf00' :
           d > 30 ? '#ffdc73' :
           d > 20 ? '#ffeda0' :
           d > 0 ?  '#fff8dc' :
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
     jib2008info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      jib2008geojson.resetStyle(e.target);
      jib2008info.update();
  }

function jib2008EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

jib2008info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

jib2008info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + props.CST_N + '</h5>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.jib + '</h5>'
  + '<h5>' + pctVote + ': ' + props.jibPercentage + '%</h5>'
  + '<h5>' + winner + ': ' + props.winner + '</h5>'
  + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  jib2008legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 20, 30, 40, 50],
          labels = ['<h5>' + jib + ' '  + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    jib2008legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorjib2008(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var jib2008geojson = L.geoJson(jib2008, {
      style: jib2008style,
      onEachFeature: jib2008EachFeature
  });
//END PD /////////////////////////////////////
