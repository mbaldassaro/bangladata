var swinginfo = L.control({ position: 'bottomright' } );
var swinglegend = L.control( { position: 'bottomright' } );


function swingStyle(feature) {
  return {
    fillColor: getSwingColor(feature.properties.magnitude),
    weight: 0.5,
    opacity: 1,
    color: '#ffffff',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getSwingColor(d) {
    return  d > 29 ? "blue"   :
            d > 19 ? "darkred":
            d > 0  ? "green"  :
                     '#efefef' ;
    }

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#FFFFFF',
      dashArray: '',
      fillOpacity: 1
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
         layer.bringToFront();
     }
     swinginfo.update(layer.feature.properties);
  }

function resetHighlight(e) {
      swinggeojson.resetStyle(e.target);
      swinginfo.update();
  }

function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }

function eachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
      }

swinginfo.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
  };

swinginfo.update = function(props) {
    this._div.innerHTML = (props ?
        '<h6><strong>Constituency: ' + props.constituency + '</strong></h6>' +
        '<h6>Winner: ' + props.winner + ' ' + '(' + props.winnerPercentage + '%)</h6>' +
        '<h6>Runner Up: ' + props.runnerUp + ' ' + '(' + props.runnerUpPercentage + '%)</h6>' +
        '<h6><strong>Swing: ' + props.swing + '%</strong></h6>' + '':'')
    };

swinglegend.onAdd = function(e) {
  this._div = L.DomUtil.create('div', 'info legend');
  grades = [1, 20, 30],
  labels = ['<h4>Party-Coalition</h4>' +
  '<h6><strong>Mohajote-Awami League ' + '<i class="vertical" style="background:' + getSwingColor(grades[0]) + '"></i></strong></h6>' +
  '<h6><strong>Four Party Alliance-BNP ' + '<i class="vertical" style="background:' + getSwingColor(grades[1]) + '"></i></strong></h6>' +
  '<h6><strong>Other ' + '<i class="vertical" style="background:' + getSwingColor(grades[2]) + '"></i></strong></h6>'];
  this._div.innerHTML = labels.join('');
  return this._div;
  };

  var swinggeojson = L.geoJSON(swing2008, {
    style: swingStyle,
    onEachFeature: eachFeature
  });
/*var results2008congeojson = L.geoJSON(results2008con, {
    style: style,
    onEachFeature: eachFeature
});*/
