var vimsapr18legend = L.control({position: 'bottomright'});
var vimsapr18info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function vimsapr18style(feature) {
  return {
    fillColor: getColorvimsapr18(feature.properties.Count_),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorvimsapr18(d) {
    return d > 14 ? '#99000d' :
           d > 5 ? '#ef3b2c' :
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
     vimsapr18info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      vimsapr18geojson.resetStyle(e.target);
      vimsapr18info.update();
  }

function vimsapr18EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

vimsapr18info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

vimsapr18info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + district + ': ' + props.district + '</h5>' +
  '<h5>' + violentIncidents + ': ' + props.Count_ + '</h5>'
  + '' : '');
  };

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  vimsapr18legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [1, 5, 15],
          labels = ['<h5>' + politicalViolence + '</h5>'];
          this.update();
          return this._div;
  };

    vimsapr18legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorvimsapr18(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '<br>' : '+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

var vimsapr18geojson = L.geoJson(vimsapr2018, {
      style: vimsapr18style,
      onEachFeature: vimsapr18EachFeature
  });
//END PD /////////////////////////////////////
