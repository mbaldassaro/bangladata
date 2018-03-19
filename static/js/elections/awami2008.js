var awami2008legend = L.control({position: 'bottomright'});
var awami2008info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function awami2008style(feature) {
  return {
    fillColor: getColorAwami2008(feature.properties.awamiPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorAwami2008(d) {
    return d > 70 ? '#005a32' :
           d > 60 ? '#238b45' :
           d > 50 ? '#41ab5d' :
           d > 40 ? '#74c476' :
           d > 30 ? '#a1d99b' :
           d > 20 ? '#c7e9c0' :
           d > 0 ?  '#edf8e9' :
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
     awami2008info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      awami2008geojson.resetStyle(e.target);
      awami2008info.update();
  }

function awami2008EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

awami2008info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

awami2008info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + props.CST_N + '</h5>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.awami + '</h5>'
  + '<h5>' + pctVote + ': ' + props.awamiPercentage + '%</h5>'
  + '<h5>' + winner + ': ' + props.winner + '</h5>'
  + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  awami2008legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 20, 30, 40, 50, 60, 70],
          labels = ['<h5>AL ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    awami2008legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorAwami2008(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var awami2008geojson = L.geoJson(awami2008, {
      style: awami2008style,
      onEachFeature: awami2008EachFeature
  });
//END PD /////////////////////////////////////
