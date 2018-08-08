var results2001coninfo = L.control({ position: 'bottomright' } );
var results2001conlegend = L.control( { position: 'bottomright' } );
var results2001congeojson = L.geoJSON(results2001con, {
  style: style,
  onEachFeature: eachFeature
});

function style(feature) {
  return {
    fillColor: getResults2001conColor(feature.properties.magnitude),
    weight: 0.5,
    opacity: 1,
    color: '#ffffff',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getResults2001conColor(d) {
  return  d > 559 ? "#a67c00" :
          //d > 559 ? "#654321" :
          //d > 539 ? "#8b4513" :
          d > 539 ? "#bf9b30" :
          //d > 519 ? "#cd8535" :
          d > 519 ? "#ffbf00" :
          //d > 509 ? "#d2b48c" :
          d > 509 ? "#ffdc73" :
          d > 459 ? "#084594" :
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
          d > 50 ? "#fff8dc" :
          //d > 50 ? "#ffdc73" :
          d > 40 ? "#9ecae1" :
          d > 30 ? "#dadaeb" :
          d > 20 ? "#fee0d2" :
          d > 10 ? "#a1d99b" :
                      "gray";
  }

  function getColorAwami1(d) {
    return d > 159 ? "#005a32" :
           d > 139 ? "#238b45" :
           d > 119 ? "#41ab5d" :
           d > 109 ? "#74c476" :
           d > 10 ? "#a1d99b" :
                        "gray";
  }

  function getColorBNP1(d) {
    return d > 259 ? "#67000d" :
           d > 239 ? "#a50f15" :
           d > 219 ? "#cb181d" :
           d > 209 ? "#fb6a4a" :
           //d > 200 ? "#fcbba1" :
           d > 20 ? "#fee0d2" :
           //d > 200 ? "#fff5f0" :
                      "gray";
  }
  function getColorJP1(d) {
    return d > 359 ? "#4a1486" :
           d > 339 ? "#6a51a3" :
           d > 319 ? "#807dba" :
           d > 309 ? "#bcbddc" :
           d > 30 ?  "#dadaeb" :
                        "gray";
  }

  function getColorOther1(d) {
    return d > 459 ? "#084594" :
           d > 439 ? "#2171b6" :
           d > 419 ? "#4292c6" :
           d > 409 ? "#6baed6" :
           d > 40 ? "#9ecae1" :
                         "gray";
  }

  function getColorJib1(d) {
    return d > 559 ? "#a67c00" :
           d > 539 ? "#bf9b30" :
           d > 519 ? "#ffbf00" :
           d > 509 ? "#ffdc73" :
           //d > 50 ? "#ffdc73" :
          /*d > 559 ? "#654321" :
           d > 539 ? "#8b4513" :
           d > 519 ? "#cd8535" :*/
           //d > 509 ? "#d2b48c" :
           d > 50 ? "#fff8dc" :
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
     results2001coninfo.update(layer.feature.properties);
     //results2001coninfo.onAdd(layer.feature.properties);
  }

function resetHighlight(e) {
      results2001congeojson.resetStyle(e.target);
      results2001coninfo.update();
      //results2001coninfo.onAdd();
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

results2001coninfo.onAdd = function(map) {
      this._div = L.DomUtil.create('svg', 'info');
      this.update();
      return this._div;
  };

results2001coninfo.update = function(props) {
    this._div.innerHTML = (props ?
        '<h6>' + constituency + ': ' + props.constituency + '</strong></h6>' +
        '<h6><strong>' + winner + ': ' + props.first + ' ' + '(' + props.winnerPercentage + '%)' + '</strong></h6>' +
        '<h6>' + runnerUp + ': ' + props.second + ' ' + '(' + props.runnerUpPercentage + '%)' + '</h6>' +
        '<h6><strong>' + margvict + ': ' + props.marginPercentage + '%</strong></h6>' +
        '<h6>' + al + ': ' + props.awami + ' ' + '(' + props.awamiPercentage + '%)</h6>' +
        '<h6>' + bnp + ': ' + props.bnp + ' ' + '(' + props.bnpPercentage + '%)</h6>' +
        '<h6>' + jp + ': ' + props.jp + ' ' + '(' + props.jpPercentage + '%)</h6>'  +
        '<h6>' + jib + ': ' + props.jib + ' ' + '(' + props.jibPercentage + '%)</h6>'  +
        '<h6>' + other + ': ' + props.otherVotes + ' ' + '(' + props.otherPercentage + '%)</h6>' + '':'')
    };

results2001conlegend.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info legend'),
    this.update();
    return this._div;
};


results2001conlegend.update = function(e) {
  title =['<h4>' + margvict + '</h4>' + '<h6><1% - 60%+</h6>'];
  this._div = L.DomUtil.create('div', 'info legend'),
  gradesF = [10, 109, 119, 139, 159];
  gradesG = [20, 209, 219, 239, 259];
  gradesH = [30, 309, 319, 339, 359];
  gradesI = [40, 409, 419, 439, 459];
  gradesJ = [50, 509, 519, 539, 559];
  labelF = [];
  labelG = ['<h6>&nbsp' + al + '</h6>'];
  labelH = ['<h6>&nbsp' + bnp + '</h6>'];
  labelI = ['<h6>&nbsp' + jp + '</h6>'];
  labelJ = ['<h6>&nbsp' + jib + '</h6>'];
  labelK = ['<h6>&nbsp' + other + '</h6>'];
  for(var i = 0; i < gradesF.length; i++) {
    labelF.push(
    '<i class="horizontal" style="background:' + getColorAwami1(gradesF[i] + 1) + '"></i>');
  }
  for(var x = 0; x < gradesG.length; x++) {
    labelG.push(
    '<i class="horizontal" style="background:' + getColorBNP1(gradesG[x] + 1) + '"></i>');
  }
  for(var y = 0; y < gradesH.length; y++) {
    labelJ.push(
    '<i class="horizontal" style="background:' + getColorJP1(gradesH[y] + 1) + '"></i>');
  }
  for(var w = 0; w < gradesJ.length; w++) {
    labelH.push(
    '<i class="horizontal" style="background:' + getColorJib1(gradesJ[w] + 1) + '"></i>');
  }
  for(var z = 0; z < gradesI.length; z++) {
    labelI.push(
    '<i class="horizontal" style="background:' + getColorOther1(gradesI[z] + 1) + '"></i>');
  }
    this._div.innerHTML = title.join('') + labelF.join('') + labelG.join('') + labelH.join('') + labelJ.join('') + labelI.join('') + labelK.join('');
    return this._div;
  };

/*var results2001congeojson = L.geoJSON(results2001con, {
    style: style,
    onEachFeature: eachFeature
});*/
