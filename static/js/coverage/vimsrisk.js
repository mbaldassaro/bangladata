var vimsrisklegend = L.control({position: 'bottomright'});
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


vimsrisklegend.onAdd = function(e) {
      this._div = L.DomUtil.create('div', 'info legend');
      //grades = [1, 2, 3, 4, 11, 21, 31, 101, 201, 301],
      grades = [1, 2, 3],
      labels = ['<h6><strong>Political Violence Risk Level</strong></h6>' +
      '<h6><strong>Low' + '<i class="vertical" style="background:' + getColorvimsrisk(grades[0]) + '"></i></strong></h6>' +
      '<h6><strong>Medium' + '<i class="vertical" style="background:' + getColorvimsrisk(grades[1]) + '"></i></strong></h6>' +
      '<h6><strong>High' + '<i class="vertical" style="background:' + getColorvimsrisk(grades[2]) + '"></i></strong></h6>'];
      this._div.innerHTML = labels.join('');
      return this._div;
    };

var vimsriskgeojson = L.geoJson(vims, {
      style: vimsriskstyle,
      onEachFeature: onFeature
      //onEachFeature: vimsriskEachFeature
  });

//vimsriskinfo.addTo(map);
