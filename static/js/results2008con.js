var results2008coninfo = L.control({ position: 'bottomright' } );
var results2008conlegend = L.control( { position: 'bottomright' } );

function style(feature) {
  return {
    fillColor: getResults2008conColor(feature.properties.magnitude),
    weight: 0.5,
    opacity: 1,
    color: '#ffffff',
    dashArray: '0',
    fillOpacity: 0.8
  }
}

function getResults2008conColor(d) {
  return  d > 459 ? "#084594" :
          d > 449 ? "#2171b6" :
          d > 439 ? "#4292c6" :
          d > 429 ? "#6baed6" :
          d > 419 ? "#9ecae1" :
          d > 409 ? "#deebf7" :
          d > 400 ? "#eff3ff" :
          d > 359 ? "#ffff00" :
          d > 349 ? "#ffff4d" :
          d > 339 ? "#ffff66" :
          d > 329 ? "#ffff80" :
          d > 319 ? "#ffff99" :
          d > 309 ? "#ffffb3" :
          d > 300 ? "#ffffcc" :
          d > 259 ? "#67000d" :
          d > 249 ? "#a50f15" :
          d > 239 ? "#cb181d" :
          d > 229 ? "#fb6a4a" :
          d > 219 ? "#fcbba1" :
          d > 209 ? "#fee0d2" :
          d > 200 ? "#fff5f0" :
          d > 159 ? "#005a32" :
          d > 149 ? "#238b45" :
          d > 139 ? "#41ab5d" :
          d > 129 ? "#74c476" :
          d > 119 ? "#a1d99b" :
          d > 109 ? "#c7e9c0" :
          d > 100 ? "#edf8e9" :
                    "gray";
  }

  function getColorAwami(d) {
    return d > 159 ? "#005a32" :
           d > 149 ? "#238b45" :
           d > 139 ? "#41ab5d" :
           d > 129 ? "#74c476" :
           d > 119 ? "#a1d99b" :
           d > 109 ? "#c7e9c0" :
           d > 100 ? "#edf8e9" :
                        "gray";
  }

  function getColorBNP(d) {
    return d > 259 ? "#67000d" :
           d > 249 ? "#a50f15" :
           d > 239 ? "#cb181d" :
           d > 229 ? "#fb6a4a" :
           d > 219 ? "#fcbba1" :
           d > 209 ? "#fee0d2" :
           d > 200 ? "#fff5f0" :
                      "gray";
  }
  function getColorJP(d) {
    return d > 359 ? "#ffff00" :
           d > 349 ? "#ffff4d" :
           d > 339 ? "#ffff66" :
           d > 329 ? "#ffff80" :
           d > 319 ? "#ffff99" :
           d > 309 ? "#ffffb3" :
           d > 300 ? "#ffffcc" :
                        "gray";
  }

  function getColorOther(d) {
    return d > 459 ? "#084594" :
           d > 449 ? "#2171b6" :
           d > 439 ? "#4292c6" :
           d > 429 ? "#6baed6" :
           d > 419 ? "#9ecae1" :
           d > 409 ? "#deebf7" :
           d > 400 ? "#eff3ff" :
                      "gray";
  }

function highlightFeature(e) {
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
  }

function resetHighlight(e) {
      results2008congeojson.resetStyle(e.target);
      results2008coninfo.update();
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
      this._div = L.DomUtil.create('div', 'info');
      //this._div = L.DomUtil.create('div', 'svg');
      this.update();
      return this._div;
  };

results2008coninfo.update = function(props) {
    this._div.innerHTML = (props ?
        '<h6>Constituency: ' + props.constituency + '</h6>' +
        '<h6><strong>Winner: ' + props.winner + '</strong></h6>' +
        '<b>Margin of Victory: ' + props.marginPercentage + '%</b>' +
        '<h6>Registered Voters: ' + props.registeredVoters + '</h6>' +
        '<h6>Valid Votes: ' + props.validVotes + '</h6>' +
        '<h6>Mohajote: ' + props.mohajote + ' ' + '(' + props.mohajotePercentage + '%)</h6>' +
        '<h6>Awami League: ' + props.awamiLeague + ' ' + '(' + props.awamiLeaguePercentage + '%)</h6>' +
        '<h6>Four Party Alliance: ' + props.fourPartyAlliance + ' ' + '(' + props.fourPartyAlliancePercentage + '%)</h6>' +
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
  gradesA = [100, 109, 119, 129, 139, 149, 159];
  gradesB = [200, 209, 219, 229, 239, 249, 259];
  gradesC = [300, 309, 319, 329, 339, 349, 359];
  gradesD = [400, 409, 419, 429, 439, 449, 459];
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

var results2008congeojson = L.geoJSON(results2008con, {
    style: style,
    onEachFeature: eachFeature
});
