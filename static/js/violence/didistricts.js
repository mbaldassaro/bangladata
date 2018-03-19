var didistrictsgeojson = L.geoJSON(didistricts, {
  style: style,
  onEachFeature: onFeature
});

function style(feature) {
  return {
    fillColor: 'lightblue',
    weight: 1,
    opacity: 1,
    color: '#000000',
    dashArray: '0',
    fillOpacity: 0.8
  }
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
