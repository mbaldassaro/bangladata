var covlegend = L.control({position: 'bottomright'});
//var covinfo = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function covstyle(feature) {
  return {
    fillColor: getColorcov(feature.properties.A2remark),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.7
  }
}

function getColorcov(d) {
    return d > 2 ? '#2171b5' :
           d > 1 ? '#4292c6' :
           d > 0 ? '#bdd7e7' :
                    'lightgray' ;
      }

      function onFeature(feature, layer) {
        layer.bindPopup('<h6>'+ feature.properties.adm2_en +'</h6>').on({
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
     covinfo.update(layer.feature.properties);
  }

function resetHighlight(e) {
      covgeojson.resetStyle(e.target);
      covinfo.update();
  }

function covEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

covinfo.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

covinfo.update = function(props) {
  this._div.innerHTML = (props ? '<h6>' + props.CST_N + '</h6>' + '' : '');
  };

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
*/


/*covlegend.onAdd = function(e) {
      this._div = L.DomUtil.create('div', 'info legend');
      //grades = [1, 2, 3, 4, 11, 21, 31, 101, 201, 301],
      grades = [1, 2, 3, 4],
      labels = ['<h6><strong>Swing + Political Violence</strong></h6>' +
      '<h6><strong>Swing' + '<i class="vertical" style="background:' + getColorcov(grades[0]) + '"></i></strong></h6>' +
      '<h6><strong>Swing + Low' + '<i class="vertical" style="background:' + getColorcov(grades[1]) + '"></i></strong></h6>' +
      '<h6><strong>Swing + Medium' + '<i class="vertical" style="background:' + getColorcov(grades[2]) + '"></i></strong></h6>' +
      '<h6><strong>Swing + High' + '<i class="vertical" style="background:' + getColorcov(grades[3]) + '"></i></strong></h6>'];
      this._div.innerHTML = labels.join('');
      return this._div;
    };*/

var covgeojson = L.geoJson(cov, {
      style: covstyle,
      onEachFeature: onFeature
      //onEachFeature: covEachFeature
  });

//covinfo.addTo(map);
