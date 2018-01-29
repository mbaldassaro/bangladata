$(document).ready(function() {
L.control.layers(baseLayers, null, {collapsed: true, position: 'topleft'}).addTo(map);
//map.panTo(new L.LatLng(21.212711, 92.163433));
//map.flyTo([21.212711, 92.163433], 10);
//map.flyTo([21.171149, 92.155243], 10);
map.flyTo([21.133391, 92.187985], 10);
});

var cities;

$.getJSON("static/data/rohingya.json")
  .done(function(data) {
    //console.log(data);
    var info = processData(data);
    createPropSymbols(info.timestamps, data);
    createLegend(info.min,info.max);
    createSliderUI(info.timestamps);
  }).fail(function() { alert("Not loaded!")});

  function processData(data) {
    var timestamps = [];
    var min = Infinity;
    var max = -Infinity;
		for (var feature in data.features) {
			var properties = data.features[feature].properties;
			for (var attribute in properties) {
				if(attribute != 'ssid' && attribute != 'name') {
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

  function createPropSymbols(timestamps, data) {
    cities = L.geoJson(data, {
			pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          //fillColor: '#708598',
          //fillColor: 'orange',
          fillColor: '#ff9b1f',
          //color: '#537898',
          color: 'yellow',
          weight: 1,
          fillOpacity: 0.6 }).on({
					mouseover: function(e) {
						this.openPopup();
						//this.setStyle({color: 'yellow'});
            this.setStyle({color: '#537898'});
					},
					mouseout: function(e) {
						this.closePopup();
						//this.setStyle({color: '#537898'});
            this.setStyle({color: 'yellow'});
					}
        });
      }
    }).addTo(map);
    updatePropSymbols(timestamps[0]);
  }

  function updatePropSymbols(timestamp) {
		cities.eachLayer(function(layer) {
			var props = layer.feature.properties;
			var radius = calcPropRadius(props[timestamp]);
			var popupContent = '<b>' + String(props[timestamp]) +
					' refugees</b><br>' +
					'<i>' + props.name; /*+
					'</i> in </i>' +
					timestamp + '</i>';*/
			layer.setRadius(radius);
			layer.bindPopup(popupContent, { offset: new L.Point(0,-radius) });
		});
	}

  function calcPropRadius(attributeValue) {
		var scaleFactor = 0.025;
		var area = attributeValue * scaleFactor;
		return Math.sqrt(area/Math.PI)*2;
  	}

  function createLegend(min, max) {
		if (min < 10000) {
			  min = 10000;
		}
		function roundNumber(inNumber) {
			return (Math.round(inNumber/10) * 10);
		}
		var legend = L.control( { position: 'bottomright' } );
		legend.onAdd = function(map) {
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

		$(legendContainer).append("<h4 id='legendTitle'>Rohingya Refugees</h4>");
		for (var i = 0; i <= classes.length-1; i++) {
			legendCircle = L.DomUtil.create("div", "legendCircle");
			currentRadius = calcPropRadius(classes[i]);
			margin = -currentRadius - lastRadius - 2;
			$(legendCircle).attr("style", "width: " + currentRadius*2 +
				"px; height: " + currentRadius*2 +
				"px; margin-left: " + margin + "px" );
			$(legendCircle).append("<span class='legendValue'>"+classes[i]+"</span>");
			$(symbolsContainer).append(legendCircle);
			lastRadius = currentRadius;
		}

		$(legendContainer).append(symbolsContainer);
		return legendContainer;
		};
		legend.addTo(map);
} // end createLegend();

//var startTimestamp;
function createTemporalLegend(startTimestamp) {
		var temporalLegend = L.control({ position: 'bottomleft' });
		temporalLegend.onAdd = function(map) {
			var output = L.DomUtil.create("output", "temporal-legend");
      startTimestamp = "September 2017"
      $(output).text(startTimestamp)
			return output;
		}
		temporalLegend.addTo(map);
	}

function createSliderUI(timestamps) {
		var sliderControl = L.control({ position: 'bottomleft'} );
		sliderControl.onAdd = function(map) {
			var slider = L.DomUtil.create("input", "range-slider");
		    L.DomEvent.addListener(slider, 'mousedown', function(e) {
				L.DomEvent.stopPropagation(e);
			});

			$(slider)
				.attr({'type':'range',
					'max': timestamps[timestamps.length-1],
					'min': timestamps[0],
          'step': 1,
          'value': String(timestamps[0])
        }).on('input change', function() {
		  		updatePropSymbols($(this).val().toString());
          $(".temporal-legend").text(this.value);
          if(this.value==1) { return $(".temporal-legend").text("September 2017") }
          if(this.value==2) { return $(".temporal-legend").text("October 2017") } //correct
          if(this.value==3) { return $(".temporal-legend").text("November 2017") }
          if(this.value==4) { return $(".temporal-legend").text("December 2017") }
		  	});
			return slider;
		}
		sliderControl.addTo(map)
    createTemporalLegend(timestamps[0]); //correct
	}
