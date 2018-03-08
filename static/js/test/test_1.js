var results2001;
var results2001legend = L.control( { position: 'bottomright' } );

$.getJSON("static/data/results2001.json")
  .done(function(data) {
    //console.log(data);
    var info = processData(data);
    createPropSymbols(info.timestamps, data);
    createLegend(info.min,info.max);
    //createSliderUI(info.timestamps);
  });//.fail(function() { alert("Not loaded!")});

  function processData(data) {
    var timestamps = [];
    var min = Infinity;
    var max = -Infinity;
    for (var feature in data.features) {
      var properties = data.features[feature].properties;
      for (var attribute in properties) {
        if(attribute = 'marginPercentage') {
          if($.inArray(attribute,timestamps) === -1) {
            timestamps.push(attribute);
          }
          if (properties[attribute] < min) {
            min = properties[attribute];
          }
          if (properties[attribute] > max) {
            max = properties[attribute];
          }
        }
      }
    }
    return {
        timestamps : timestamps,
        min : min,
        max : max
    }
  }

function getColor(d) {
  return  d > 3 ? "blue"  :
          d > 2 ? "yellow" :
          d > 1 ? "darkred"    :
          d > 0 ? "green"  :
                    'gray' ;
}

function createPropSymbols(timestamps, data) {
    var results2001geojson = L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        fillColor: getColor(feature.properties.winnerID),
        color: getColor(feature.properties.winnerID),
        weight: 1,
        fillOpacity: 0.3 }).on({
        mouseover: function(e) {
          this.openPopup();
          //this.setStyle({color: getColor(feature.properties.winnerID)});
          this.setStyle({color: 'black', fillOpacity: 0.6});
        },
        mouseout: function(e) {
          this.closePopup();
          this.setStyle({color: getColor(feature.properties.winnerID), fillOpacity:0.3});
        }
      });
    }
  }).addTo(map);
  updatePropSymbols(timestamps[0]);
}

function updatePropSymbols(timestamp) {
  results2001.eachLayer(function(layer) {
    var props = layer.feature.properties;
    var radius = calcPropRadius(props[timestamp]);
    var popupContent =
        '<h6>Constituency: ' + props.constituency + '</h6>' +
        '<h6><strong>Winner: ' + props.winner + '</strong></h6>' +
        '<b>Margin of Victory: ' + String(props[timestamp]) + '%</b>' +
        '<h6>Registered Voters: ' + props.registeredVoters + '</h6>' +
        '<h6>Valid Votes: ' + props.validVotes + '</h6>' +
        '<h6>Awami League: ' + props.awamiLeague + ' ' + '(' + props.awamiLeaguePercentage + '%)</h6>' +
        '<h6>Four Party Alliance: ' + props.fourPartyAlliance + ' ' + '(' + props.fourPartyAlliancePercentage + '%)</h6>' +
        '<h6>Jatiya Party: ' + props.jatiyaParty + ' ' + '(' + props.jatiyaPartyPercentage + '%)</h6>'  +
        '<h6>Others: ' + props.others + ' ' + '(' + props.othersPercentage + '%)</h6>';
    layer.setRadius(radius);
    layer.bindPopup(popupContent, { offset: new L.Point(0,-radius) });
  });
}

function calcPropRadius(attributeValue) {
  var scaleFactor = 10;
  var area = attributeValue * scaleFactor;
  return Math.sqrt(area/Math.PI)*2;
  }

function createLegend(min, max) {
    if (min < 10) {
        min = 10;
  }
function roundNumber(inNumber) {
    return (Math.round(inNumber/10) * 10);
  }

    results2001legend.onAdd = function(map) {
    var colorKey = L.DomUtil.create("div", "colorKey"); //added
    var legendColor = L.DomUtil.create("div", "legendColor"); //added
    var grades = [1, 2, 3, 4]; //moved
    var legendContainer = L.DomUtil.create("div", "legend");
    var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
    var classes = [roundNumber(min), roundNumber((max-min)/2), roundNumber(max)];
    var legendCircle;
    var lastRadius = 0;
    var currentRadius;
    var margin;
    L.DomEvent.addListener(legendContainer, 'mousedown', function(e) {
      L.DomEvent.stopPropagation(e);
    });

    $(legendColor).append("<br><h4>Party / Coalition</h4>");
    $(legendColor).append('<h6><strong>Awami League ' + '<i class="circle" style="background:' + getColor(grades[0]) + '"></i></strong></h6>' +
            '<h6><strong>Four Party Alliance ' + '<i class="circle" style="background:' + getColor(grades[1]) + '"></i></strong></h6>' +
            '<h6><strong>Jatiya Party ' + '<i class="circle" style="background:' + getColor(grades[2]) + '"></i></strong></h6>' +
            '<h6><strong>Others ' + '<i class="circle" style="background:' + getColor(grades[3]) + '"></i></strong></h6>' );//}
    $(legendColor).append("<h4>Margin of Victory</h4>");
    $(colorKey).append(legendColor);
      for(var i = 0; i <= classes.length-1; i++) {
			     legendCircle = L.DomUtil.create("div", "legendCircle");
			     currentRadius = calcPropRadius(classes[i]);
			     margin = -currentRadius - lastRadius - 2;
			$(legendCircle).attr("style", "width: " + currentRadius*2 +
				"px; height: " + currentRadius*2 +
				"px; margin-left: " + margin + "px" );
			$(legendCircle).append("<span class='legendValue'>"+classes[i]+"%</span>");
      $(symbolsContainer).append(legendCircle);
			lastRadius = currentRadius;
		}

    $(legendContainer).append(colorKey);
		$(legendContainer).append(symbolsContainer);
		return legendContainer;
  };
    //results2001legend.addTo(map);
} //}; // end createLegend();
