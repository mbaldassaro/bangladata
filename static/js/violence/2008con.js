var congeojson = L.geoJSON(results2008con, {
  style: style,
  onEachFeature: onFeature
});

function style(feature) {
  return {
    fillColor: 'lightgray',
    weight: 1,
    opacity: 1,
    color: '#000000',
    dashArray: '0',
    fillOpacity: 0.1
  }
}

function onFeature(feature, layer) {
  layer.bindPopup('<h6>'+ feature.properties.constituency +'</h6>').on({
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
