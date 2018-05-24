var results2014coninfo = L.control({ position: 'bottomright' } );
var results2014conlegend = L.control( { position: 'bottomright' } );
var results2014congeojson = L.geoJSON(results2014con, {
  style: style,
  onEachFeature: eachFeature
});

function style(feature) {
  return {
    fillColor: getResults2014conColor(feature.properties.magnitude),
    weight: 0.5,
    opacity: 1,
    color: '#ffffff',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getResults2014conColor(d) {
  return  d > 459 ? "#084594" :
          d > 439 ? "#2171b6" :
          d > 419 ? "#4292c6" :
          d > 409 ? "#6baed6" :
          d > 359 ? "#4a1486" :
          d > 339 ? "#6a51a3" :
          d > 319 ? "#807dba" :
          d > 309 ? "#bcbddc" :
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

  function getColorAwami2(d) {
    return d > 159 ? "#005a32" :
           d > 139 ? "#238b45" :
           d > 119 ? "#41ab5d" :
           d > 109 ? "#74c476" :
           d > 10 ? "#a1d99b" :
                        "gray";
  }

  function getColorJP2(d) {
    return d > 359 ? "#4a1486" :
           d > 339 ? "#6a51a3" :
           d > 319 ? "#807dba" :
           d > 309 ? "#bcbddc" :
           d > 30 ?  "#dadaeb" :
                        "gray";
  }

  function getColorOther2(d) {
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
     results2014coninfo.update(layer.feature.properties);
     //results2014coninfo.onAdd(layer.feature.properties);
  }

function resetHighlight(e) {
      results2014congeojson.resetStyle(e.target);
      results2014coninfo.update();
      //results2014coninfo.onAdd();
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

results2014coninfo.onAdd = function(map) {
      this._div = L.DomUtil.create('svg', 'info');
      this.update();
      return this._div;
  };

results2014coninfo.update = function(props) {
    this._div.innerHTML = (props ?
        '<h6><strong>Constituency: ' + props.constituency + '</strong></h6>' +
        '<h6><strong>Winner: ' + props.winner + ' ' + '(' + props.winnerPCT + '%)' + '</strong></h6>' +
        '<h6>Runner Up: ' + props.runnerUp + ' ' + '(' + props.runnerUpPCT + '%)' + '</h6>' +
        '<h6><strong>Margin of Victory: ' + props.marginPercentage + '%</strong></h6>' +
        '<h6>AL: ' + props.awami + ' ' + '(' + props.awamiPecentage + '%)</h6>' +
        '<h6>Jatiya: ' + props.jp + ' ' + '(' + props.jpPercentage + '%)</h6>'  +
        '<h6>Others: ' + props.other + ' ' + '(' + props.otherPercentage + '%)</h6>' + '':'')
    };

results2014conlegend.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info legend'),
    this.update();
    return this._div;
};


results2014conlegend.update = function(e) {
  title =['<h4>Margin of Victory</h4>' + '<h6><1% - 60%+ / Uncontested</h6>'];
  this._div = L.DomUtil.create('div', 'info legend'),
  gradesK = [10, 109, 119, 139, 159];
  gradesL = [30, 309, 319, 339, 359];
  gradesM = [40, 409, 419, 439, 459];
  labelL = [];
  labelM = ['<h6>&nbsp AL</h6>'];
  labelN = ['<h6>&nbsp Jatiya</h6>'];
  labelO = ['<h6>&nbsp Other</h6>'];
  for(var i = 0; i < gradesK.length; i++) {
    labelL.push(
    '<i class="horizontal" style="background:' + getColorAwami2(gradesK[i] + 1) + '"></i>');
  }
  for(var y = 0; y < gradesL.length; y++) {
    labelM.push(
    '<i class="horizontal" style="background:' + getColorJP2(gradesL[y] + 1) + '"></i>');
  }
  for(var z = 0; z < gradesM.length; z++) {
    labelN.push(
    '<i class="horizontal" style="background:' + getColorOther2(gradesM[z] + 1) + '"></i>');
  }
    this._div.innerHTML = title.join('') + labelL.join('') + labelM.join('') + labelN.join('') + labelO.join('');
    return this._div;
  };

/*var results2014congeojson = L.geoJSON(results2014con, {
    style: style,
    onEachFeature: eachFeature
});*/
