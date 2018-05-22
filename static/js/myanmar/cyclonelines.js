var cyclonelinesgeojson = L.geoJSON(cyclonelines, {
  style: style,
  //onEachFeature: onFeature
  //eachLayer: onFeature
});

function style(feature) {
  return {
    //fillColor: 'lightblue',
    weight: 2,
    opacity: 1,
    color: 'yellow'//,
    //dashArray: '0'
  }
}
