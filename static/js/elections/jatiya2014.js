var jatiya2014legend = L.control({position: 'bottomright'});
var jatiya2014info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function jatiya2014style(feature) {
  return {
    fillColor: getColorjatiya2014(feature.properties.jpPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorjatiya2014(d) {
    return d > 90 ? '#3f007d' :
           d > 80 ? '#54278f' :
           d > 70 ? '#6a51a3' :
           d > 60 ? '#807dba' :
           d > 50 ? '#9e9ac8' :
           d > 40 ? '#bcbddc' :
           d > 30 ? '#dadaeb' :
           d > 20 ? '#efedf5' :
           d > 10 ? '#fbf9ff' :
           d > 0 ?  '#fcfbfd' :
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
     jatiya2014info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      jatiya2014geojson.resetStyle(e.target);
      jatiya2014info.update();
  }

function jatiya2014EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

jatiya2014info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

jatiya2014info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.jp + '</h5>'
  + '<h5>' + pctVote + ': ' + props.jpPercentage + '%</h5>'
  + '<h5>' + winner + ': ' + props.winner + '</h5>'
  + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  jatiya2014legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
          labels = ['<h5>' + jp + ' '  + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    jatiya2014legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorjatiya2014(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var jatiya2014geojson = L.geoJson(jatiya2014, {
      style: jatiya2014style,
      onEachFeature: jatiya2014EachFeature
  });
//END PD /////////////////////////////////////
