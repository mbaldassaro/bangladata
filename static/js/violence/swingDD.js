//var results2008DDinfo = L.control({ position: 'bottomright' } );
//var results2008DDlegend = L.control( { position: 'bottomright' } );
var results2008DDgeojson = L.geoJSON(swingDD, {
  style: style,
  onEachFeature: onFeature
});

function style(feature) {
  return {
    fillColor: getResults2008DDColor(feature.properties.toss),
    weight: 0.5,
    opacity: 1,
    color: '#000000',
    dashArray: '0',
    fillOpacity: 0.4
  }
}

/*function getResults2008DDColor(d) {
  return  d > 71 ? "goldenrod" :
          d > 61 ? "yellow" :
          d > 51 ? "lightblue" :
          d > 41 ? "darkred" :
          d > 31 ? "red" :
          d > 21 ? "darkgreen" :
          d > 11 ? "lightgreen" :
          d > 1 ? "lightgray" :
          d > 0 ? "lightgray" :
                      "gray";
  }*/

  function getResults2008DDColor(d) {
    return d > 1 ? "lightgray" :
           d > 0 ? "purple" :
           "gray";

  }

  /*function getColorAwami(d) {
    return d > 159 ? "#005a32" :
           d > 139 ? "#238b45" :
           d > 119 ? "#41ab5d" :
           d > 109 ? "#74c476" :
           d > 100 ? "#a1d99b" :
                        "gray";
  }

  function getColorBNP(d) {
    return d > 259 ? "#67000d" :
           d > 239 ? "#a50f15" :
           d > 219 ? "#cb181d" :
           d > 209 ? "#fb6a4a" :
           //d > 200 ? "#fcbba1" :
           d > 200 ? "#fee0d2" :
           //d > 200 ? "#fff5f0" :
                      "gray";
  }
  function getColorJP(d) {
    return d > 359 ? "#ffff00" :
           d > 339 ? "#ffff4d" :
           d > 319 ? "#ffff66" :
           d > 309 ? "#ffffb3" :
           d > 300 ? "#ffffcc" :
                        "gray";
  }

  function getColorOther(d) {
    return d > 459 ? "#084594" :
           d > 439 ? "#2171b6" :
           d > 419 ? "#4292c6" :
           d > 409 ? "#6baed6" :
           d > 400 ? "#9ecae1" :
                         "gray";
  }*/

      function onFeature(feature, layer) {
        layer.bindPopup('<h6>'+ feature.properties.constituency + '</h6>' + '<h6>2008 Winner: ' + feature.properties.win2008 + ' (' + feature.properties.marginPercentage + ')</h6>').on({
          mouseover: function(e) {
            this.openPopup();
            //this.setStyle({ fillOpacity: 1 });
          },
          mouseout: function(e) {
            this.closePopup();
            //this.setStyle({ fillOpacity: 0.6 });
          }
})
}
