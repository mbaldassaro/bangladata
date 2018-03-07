//var results2008coninfo = L.control({ position: 'bottomright' } );
//var results2008conlegend = L.control( { position: 'bottomright' } );
var coveragegeojson = L.geoJSON(coverage, {
  style: style,
  onEachFeature: onFeature
  //eachLayer: onFeature
});

function style(feature) {
  return {
    fillColor: 'lightblue',
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
