// var results2001info = L.control({ position: 'bottomright' } );
// var results2001legend = L.control( { position: 'bottomright' } );

function getColor(d) {
  return  d > 3 ? "blue"   :
          d > 2 ? "yellow" :
          d > 1 ? "darkred":
          d > 0 ? "green"  :
                  'gray' ;
  }

function calcRadius(attributeValue) {
  var scaleFactor = 10;
  var area = attributeValue * scaleFactor;
  return Math.sqrt(area/Math.PI)*2;
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
     results2001info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      results2001geojson.resetStyle(e.target);
      results2001info.update();
  }

results2001info.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
  };

results2001info.update = function(props) {
    this._div.innerHTML = (props ?
        '<h6>' + constituency + ': ' + props.constituency + '</h6>' +
        '<h6><strong>' + winner + ': ' + props.winner + '</strong></h6>' +
        '<b>' + margvict + ': ' + props.marginPercentage + '%</b>' +
        '<h6>' + voterReg + ': ' + props.registeredVoters + '</h6>' +
        '<h6>' + validVotes + ': ' + props.validVotes + '</h6>' +
        '<h6>' + al ': ' + props.awamiLeague + ' ' + '(' + props.awamiLeaguePercentage + '%)</h6>' +
        '<h6>' + fourp + ': ' + props.fourPartyAlliance + ' ' + '(' + props.fourPartyAlliancePercentage + '%)</h6>' +
        '<h6>' + jp + ': ' + props.jatiyaParty + ' ' + '(' + props.jatiyaPartyPercentage + '%)</h6>'  +
        '<h6>' + other + ': ' + props.others + ' ' + '(' + props.othersPercentage + '%)</h6>' + '':'')
      };

results2001legend.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info legend'),
    grades = [1, 2, 3, 4],
    labels = ['<h4>' + pc + '</h4>' +
    '<h6><strong>' + al + '<i class="vertical" style="background:' + getColor(grades[0]) + '"></i></strong></h6>' +
    '<h6><strong>' + bnp + '<i class="vertical" style="background:' + getColor(grades[1]) + '"></i></strong></h6>' +
    '<h6><strong>' + jp + '<i class="vertical" style="background:' + getColor(grades[2]) + '"></i></strong></h6>' +
    '<h6><strong>' + other + '<i class="vertical" style="background:' + getColor(grades[3]) + '"></i></strong></h6>'];
    this._div.innerHTML = labels.join('');
    return this._div;
  };

var results2001geojson = L.geoJSON(results2001, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: calcRadius(feature.properties.marginPercentage),
      fillColor: getColor(feature.properties.winnerID),
      color: getColor(feature.properties.winnerID),
      weight: 1,
      fillOpacity: 0.3
    }).on({
      mouseover: highlightFeature,
      mouseout: resetHighlight
    });
  }
});

