var ifescoveragegeojson = L.geoJSON(ifescoverage, {
  style: style
  //onEachFeature: eachFeature
});

function style(feature) {
  return {
    fillColor: 'lightgray',
    weight: 2,
    opacity: 1,
    color: '#ffffff',
    dashArray: '0',
    fillOpacity: 0.9
  }
}
