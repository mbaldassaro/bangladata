//var vimsrisklegend = L.control({position: 'bottomright'});
//var vimsriskinfo = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function vimsriskstyle(feature) {
  return {
    fillColor: getColorvimsrisk(feature.properties.CTR),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.7
  }
}

function getColorvimsrisk(d) {
    return d > 2 ? '#99000d' :
           d > 1 ? '#fb6a4a' :
           d > 0 ? '#fee5d9' :
                    'lightgray' ;
      }

      function onFeature(feature, layer) {
        layer.bindPopup('<h6>'+ feature.properties.CST_N +'</h6>').on({
          mouseover: function(e) {
            this.openPopup();
            //this.setStyle({ fillOpacity: 1 });
          },
          mouseout: function(e) {
            this.closePopup();
            //this.setStyle({ fillOpacity: 0.6 });
          }
      });
      }
/*function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#FFFFFF',
      dashArray: '',
      fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
         layer.bringToFront();
     }
     vimsriskinfo.update(layer.feature.properties);
  }

function resetHighlight(e) {
      vimsriskgeojson.resetStyle(e.target);
      vimsriskinfo.update();
  }

function vimsriskEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

vimsriskinfo.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

vimsriskinfo.update = function(props) {
  this._div.innerHTML = (props ? '<h6>' + props.CST_N + '</h6>' + '' : '');
  };

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
*/
var vimsriskgeojson = L.geoJson(vims, {
      style: vimsriskstyle,
      onEachFeature: onFeature
      //onEachFeature: vimsriskEachFeature
  });

//vimsriskinfo.addTo(map);
