var violentswingslegend = L.control({position: 'bottomright'});
//var violentswingsinfo = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function violentswingsstyle(feature) {
  return {
    fillColor: getColorviolentswings(feature.properties.class),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.7
  }
}

function getColorviolentswings(d) {
    return d > 3 ? '#662506' :
           d > 2 ? '#cc4c02' :
           d > 1 ? '#fe9929' :
           d > 0 ? '#fed976' :
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
     violentswingsinfo.update(layer.feature.properties);
  }

function resetHighlight(e) {
      violentswingsgeojson.resetStyle(e.target);
      violentswingsinfo.update();
  }

function violentswingsEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

violentswingsinfo.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

violentswingsinfo.update = function(props) {
  this._div.innerHTML = (props ? '<h6>' + props.CST_N + '</h6>' + '' : '');
  };

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
*/


violentswingslegend.onAdd = function(e) {
      this._div = L.DomUtil.create('div', 'info legend');
      //grades = [1, 2, 3, 4, 11, 21, 31, 101, 201, 301],
      grades = [1, 2, 3, 4],
      labels = ['<h6><strong>Swing + Political Violence</strong></h6>' +
      '<h6><strong>Swing' + '<i class="vertical" style="background:' + getColorviolentswings(grades[0]) + '"></i></strong></h6>' +
      '<h6><strong>Swing + Low' + '<i class="vertical" style="background:' + getColorviolentswings(grades[1]) + '"></i></strong></h6>' +
      '<h6><strong>Swing + Medium' + '<i class="vertical" style="background:' + getColorviolentswings(grades[2]) + '"></i></strong></h6>' +
      '<h6><strong>Swing + High' + '<i class="vertical" style="background:' + getColorviolentswings(grades[3]) + '"></i></strong></h6>'];
      this._div.innerHTML = labels.join('');
      return this._div;
    };

var violentswingsgeojson = L.geoJson(violentswings, {
      style: violentswingsstyle,
      onEachFeature: onFeature
      //onEachFeature: violentswingsEachFeature
  });

//violentswingsinfo.addTo(map);
