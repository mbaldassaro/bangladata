var results2001info = L.control({ position: 'bottomright' } );
var results2001legend = L.control( { position: 'bottomright' } );

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

/*function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }*/ //does not work with L.circleMarker

results2001info.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
  };

results2001info.update = function(props) {
    this._div.innerHTML = (props ?
        '<h6>Constituency: ' + props.constituency + '</h6>' +
        '<h6><strong>Winner: ' + props.winner + '</strong></h6>' +
        '<b>Margin of Victory: ' + props.marginPercentage + '%</b>' +
        '<h6>Registered Voters: ' + props.registeredVoters + '</h6>' +
        '<h6>Valid Votes: ' + props.validVotes + '</h6>' +
        '<h6>Awami League: ' + props.awamiLeague + ' ' + '(' + props.awamiLeaguePercentage + '%)</h6>' +
        '<h6>Four Party Alliance: ' + props.fourPartyAlliance + ' ' + '(' + props.fourPartyAlliancePercentage + '%)</h6>' +
        '<h6>Jatiya Party: ' + props.jatiyaParty + ' ' + '(' + props.jatiyaPartyPercentage + '%)</h6>'  +
        '<h6>Others: ' + props.others + ' ' + '(' + props.othersPercentage + '%)</h6>' + '':'')
      };

results2001legend.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info legend'),
    grades = [1, 2, 3, 4],
    labels = ['<h4>Party-Coalition</h4>' +
    '<h6><strong>Awami League ' + '<i class="vertical" style="background:' + getColor(grades[0]) + '"></i></strong></h6>' +
    '<h6><strong>Four Party Alliance ' + '<i class="vertical" style="background:' + getColor(grades[1]) + '"></i></strong></h6>' +
    '<h6><strong>Jatiya Party ' + '<i class="vertical" style="background:' + getColor(grades[2]) + '"></i></strong></h6>' +
    '<h6><strong>Others ' + '<i class="vertical" style="background:' + getColor(grades[3]) + '"></i></strong></h6>'];
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
      //click: zoomToFeature,
      mouseout: resetHighlight
    });
  }
});
