//var results2008coninfo = L.control({ position: 'bottomright' } );
//var results2008conlegend = L.control( { position: 'bottomright' } );
var coveragegeojson = L.geoJSON(coverage, {
  style: style
  //onEachFeature: eachFeature
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

/*function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#FFFFFF',
      dashArray: '',
      fillOpacity: 1
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
         layer.bringToFront();
     }
     results2008coninfo.update(layer.feature.properties);
     //results2008coninfo.onAdd(layer.feature.properties);
  }

function resetHighlight(e) {
      results2008congeojson.resetStyle(e.target);
      results2008coninfo.update();
      //results2008coninfo.onAdd();
  }

function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }

function eachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
      }

results2008coninfo.onAdd = function(map) {
      this._div = L.DomUtil.create('svg', 'info');
      this.update();
      return this._div;
  };

results2008coninfo.update = function(props) {
    this._div.innerHTML = (props ?
        '<h6><strong>Constituency: ' + props.constituency + '</strong></h6>' +
        '<h6><strong>Winner: ' + props.winner + '</strong></h6>' +
        '<h6><strong>Margin of Victory: ' + props.marginPercentage + '%</strong></h6>' +
        '<h6>Mohajote: ' + props.mohajote + ' ' + '(' + props.mohajotePercentage + '%)</h6>' +
        '<h6>Four Party Alliance: ' + props.fourPartyAlliance + ' ' + '(' + props.fourPartyAlliancePercentage + '%)</h6>' +
        '<h6>Awami League: ' + props.awamiLeague + ' ' + '(' + props.awamiLeaguePercentage + '%)</h6>' +
        '<h6>BNP: ' + props.bangladeshNationalParty + ' ' + '(' + props.bangladeshNationalPartyPercentage + '%)</h6>' +
        '<h6>Jatiya Party: ' + props.jatiyaParty + ' ' + '(' + props.jatiyaPartyPercentage + '%)</h6>'  +
        '<h6>Others: ' + props.others + ' ' + '(' + props.othersPercentage + '%)</h6>' + '':'')
    };

results2008conlegend.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info legend'),
    this.update();
    return this._div;
};


results2008conlegend.update = function(e) {
  title =['<h4>Margin of Victory</h4>' + '<h6><1% - 60%+</h6>'];
  this._div = L.DomUtil.create('div', 'info legend'),
  gradesA = [100, 109, 119, 139, 159];
  gradesB = [200, 209, 219, 239, 259];
  gradesC = [300, 309, 319, 339, 359];
  gradesD = [400, 409, 419, 439, 459];
  labelA = [];
  labelB = ['<h6>&nbsp Mohajote-AL</h6>'];
  labelC = ['<h6>&nbsp 4P-BNP</h6>'];
  labelD = ['<h6>&nbsp Jatiya Party</h6>'];
  labelE = ['<h6>&nbsp Other</h6>'];
  for(var i = 0; i < gradesA.length; i++) {
    labelA.push(
    '<i class="horizontal" style="background:' + getColorAwami(gradesA[i] + 1) + '"></i>');
  }
  for(var x = 0; x < gradesB.length; x++) {
    labelB.push(
    '<i class="horizontal" style="background:' + getColorBNP(gradesB[x] + 1) + '"></i>');
  }
  for(var y = 0; y < gradesC.length; y++) {
    labelC.push(
    '<i class="horizontal" style="background:' + getColorJP(gradesC[y] + 1) + '"></i>');
  }
  for(var z = 0; z < gradesD.length; z++) {
    labelD.push(
    '<i class="horizontal" style="background:' + getColorOther(gradesD[z] + 1) + '"></i>');
  }
    this._div.innerHTML = title.join('') + labelA.join('') + labelB.join('') + labelC.join('') + labelD.join('') + labelE.join('');
    return this._div;
  };

/*var results2008congeojson = L.geoJSON(results2008con, {
    style: style,
    onEachFeature: eachFeature
});*/
