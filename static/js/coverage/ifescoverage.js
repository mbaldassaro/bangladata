var ifescoveragegeojson = L.geoJSON(ifescoverage, {
  style: style,
  onEachFeature: onFeature
});

function style(feature) {
  return {
    //fillColor: 'orange',
    fillColor: '#737373',
    weight: 2,
    opacity: 1,
    color: '#ffffff',
    dashArray: '0',
    fillOpacity: 0.9
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
