var results2008coninfo = L.control({ position: 'bottomright' } );
var results2008conlegend = L.control( { position: 'bottomright' } );
var results2008congeojson = L.geoJSON(results2008con, {
  style: style,
  onEachFeature: eachFeature
});

function style(feature) {
  return {
    fillColor: getResults2008conColor(feature.properties.magnitude),
    weight: 0.5,
    opacity: 1,
    color: '#ffffff',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getResults2008conColor(d) {
  return  d > 459 ? "#084594" :
          d > 439 ? "#2171b6" :
          d > 419 ? "#4292c6" :
          d > 409 ? "#6baed6" :
          d > 359 ? "#4a1486" :
          d > 339 ? "#6a51a3" :
          d > 319 ? "#807dba" :
          d > 309 ? "#bcbddc" :
          d > 259 ? "#67000d" :
          d > 239 ? "#a50f15" :
          d > 219 ? "#cb181d" :
          d > 209 ? "#fb6a4a" :
          //d > 200 ? "#fcbba1" :
          //d > 200 ? "#fff5f0" :
          d > 159 ? "#005a32" :
          d > 139 ? "#238b45" :
          d > 119 ? "#41ab5d" :
          d > 109 ? "#74c476" :
          d > 40 ? "#9ecae1" :
          d > 30 ? "#dadaeb" :
          d > 20 ? "#fee0d2" :
          d > 10 ? "#a1d99b" :
                      "gray";
  }

  function getColorAwami(d) {
    return d > 159 ? "#005a32" :
           d > 139 ? "#238b45" :
           d > 119 ? "#41ab5d" :
           d > 109 ? "#74c476" :
           d > 10 ? "#a1d99b" :
                        "gray";
  }

  function getColorBNP(d) {
    return d > 259 ? "#67000d" :
           d > 239 ? "#a50f15" :
           d > 219 ? "#cb181d" :
           d > 209 ? "#fb6a4a" :
           //d > 200 ? "#fcbba1" :
           d > 20 ? "#fee0d2" :
           //d > 200 ? "#fff5f0" :
                      "gray";
  }
  function getColorJP(d) {
    return d > 359 ? "#4a1486" :
           d > 339 ? "#6a51a3" :
           d > 319 ? "#807dba" :
           d > 309 ? "#bcbddc" :
           d > 30 ?  "#dadaeb" :
                        "gray";
  }

  function getColorOther(d) {
    return d > 459 ? "#084594" :
           d > 439 ? "#2171b6" :
           d > 419 ? "#4292c6" :
           d > 409 ? "#6baed6" :
           d > 40 ? "#9ecae1" :
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
        '<h6>' + constituency + ': ' + props.constituency + '</strong></h6>' +
        '<h6><strong>' + winner + ': ' + props.first + ' ' + '(' + props.winnerPCT2008 + '%)' + '</strong></h6>' +
        '<h6>' + runnerUp + ': ' + props.second + ' ' + '(' + props.runnerUpPCT + '%)' + '</h6>' +
        '<h6><strong>' + margvict + ': ' + props.marginPercentage + '%</strong></h6>' +
        '<h6>' + al + ': ' + props.awami + ' ' + '(' + props.awamiPercentage + '%)</h6>' +
        '<h6>' + bnp + ': ' + props.bnp + ' ' + '(' + props.bnpPercentage + '%)</h6>' +
        '<h6>' + jp + ': ' + props.jp + ' ' + '(' + props.jpPercentage + '%)</h6>'  +
        '<h6>' + other + ': ' + props.otherVotes + ' ' + '(' + props.otherPercentage + '%)</h6>' + '':'')
    };

results2008conlegend.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info legend'),
    this.update();
    return this._div;
};


results2008conlegend.update = function(e) {
  title =['<h4>Margin of Victory</h4>' + '<h6><1% - 60%+</h6>'];
  this._div = L.DomUtil.create('div', 'info legend'),
  gradesA = [10, 109, 119, 139, 159];
  gradesB = [20, 209, 219, 239, 259];
  gradesC = [30, 309, 319, 339, 359];
  gradesD = [40, 409, 419, 439, 459];
  labelA = [];
  labelB = ['<h6>&nbsp AL</h6>'];
  labelC = ['<h6>&nbsp BNP</h6>'];
  labelD = ['<h6>&nbsp Jatiya</h6>'];
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
