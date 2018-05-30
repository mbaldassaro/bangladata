var battlegroundlegend = L.control({position: 'bottomright'});
var battlegroundinfo = L.control({position: 'bottomleft'});

//////////////////////////////////////////////
function battlegroundstyle(feature) {
  return {
    fillColor: getColorbattleground(feature.properties.class),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.7
  }
}

function getColorbattleground(d) {
    return d > 300 ? '#4a1486' :
           d > 200 ? '#084594' :
           d > 100 ? '#005a32' :
           d > 30 ? '#807dba' :
           d > 20 ? '#6baed6' :
           d > 10 ? '#a1d99b' :
           d > 0 ? '#fed976' :
           //d > 3 ? '#c6dbef' :
           //d > 2 ? '#dadaeb' :
           //d > 1 ? '#fcbba1' :
           //d > 0 ?  '#fed976' :
                    'lightgray' ;
      }

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#FFFFFF',
      dashArray: '',
      fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
         layer.bringToFront();
     }
     battlegroundinfo.update(layer.feature.properties);
  }

function resetHighlight(e) {
      battlegroundgeojson.resetStyle(e.target);
      battlegroundinfo.update();
  }

function battlegroundEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

battlegroundinfo.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

battlegroundinfo.update = function(props) {
  this._div.innerHTML = (props ? '<h6>' + props.CST_N + '</h6>'
  + '<h6>' + winner1991 + ': ' + props.winner1991 + ' ' + '(' + props.winnerPercentage1991 + '%)</h6>'
  + '<h6>' + runnerUp1991 + ': ' + props.runnerUp1991 + ' ' + '(' + props.runnerUpPercentage1991 + '%)</h6>'
  + '<h6>' + winner1996 + ': ' + props.winner1996 + ' ' + '(' + props.winnerPercentage1996 + '%)</h6>'
  + '<h6>' + runnerUp1996 + ': ' + props.runnerUp1996 + ' ' + '(' + props.runnerUpPercentage1996 + '%)</h6>'
  + '<h6>' + winner2001 + ': ' + props.winner2001 + ' ' + '(' + props.winnerPercentage2001 + '%)</h6>'
  + '<h6>' + runnerUp2001 + ': ' + props.runnerUp2001 + ' ' + '(' + props.runnerUpPercentage2001 + '%)</h6>'
  + '<h6>' + winner2008 + ': ' + props.winner2008 + ' ' + '(' + props.winnerPercentage2008 + '%)</h6>'
  + '<h6>' + runnerUp2008 + ': ' + props.runnerUp2008 + ' ' + '(' + props.runnerUpPercentage2008 + '%)</h6>'
  + '' : '');
  };

  /*    swinginfo.update = function(props) {
          this._div.innerHTML = (props ?
              '<h6><strong>Constituency: ' + props.constituency + '</strong></h6>' +
              '<h6>Winner: ' + props.winner + ' ' + '(' + props.winnerPercentage + '%)</h6>' +
              '<h6>Runner Up: ' + props.runnerUp + ' ' + '(' + props.runnerUpPercentage + '%)</h6>' +
              '<h6><strong>Swing: ' + props.swing + '%</strong></h6>' + '':'')
          };
*/

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

/*  battlegroundlegend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 20, 30, 40, 50, 60, 70],
          labels = ['<h5>JP ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    battlegroundlegend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorbattleground(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };
*/
      battlegroundlegend.onAdd = function(e) {
            this._div = L.DomUtil.create('div', 'info legend');
            //grades = [1, 2, 3, 4, 11, 21, 31, 101, 201, 301],
            grades = [1, 11, 21, 31, 101, 201, 301],
            labels = ['<h6><strong>Battleground Constituencies</strong></h6>' +
            //'<h6><strong>Tossup ' + '<i class="vertical" style="background:' + getColorbattleground(grades[0]) + '"></i></strong></h6>' +
            //'<h6><strong>Possible BNP Flip' + '<i class="vertical" style="background:' + getColorbattleground(grades[1]) + '"></i></strong></h6>' +
            //'<h6><strong>Possible JP Flip' + '<i class="vertical" style="background:' + getColorbattleground(grades[2]) + '"></i></strong></h6>' +
            //'<h6><strong>Possible Independent Flip' + '<i class="vertical" style="background:' + getColorbattleground(grades[3]) + '"></i></strong></h6>' +
            '<h6><strong>Swing' + '<i class="vertical" style="background:' + getColorbattleground(grades[0]) + '"></i></strong></h6>' +
            '<h6><strong>Lean AL' + '<i class="vertical" style="background:' + getColorbattleground(grades[1]) + '"></i></strong></h6>' +
            '<h6><strong>Lean BNP' + '<i class="vertical" style="background:' + getColorbattleground(grades[2]) + '"></i></strong></h6>' +
            '<h6><strong>Lean JP' + '<i class="vertical" style="background:' + getColorbattleground(grades[3]) + '"></i></strong></h6>' +
            '<h6><strong>Strong AL' + '<i class="vertical" style="background:' + getColorbattleground(grades[4]) + '"></i></strong></h6>' +
            '<h6><strong>Strong BNP' + '<i class="vertical" style="background:' + getColorbattleground(grades[5]) + '"></i></strong></h6>' +
            '<h6><strong>Strong JP ' + '<i class="vertical" style="background:' + getColorbattleground(grades[6]) + '"></i></strong></h6>'];
            /*'<h6><strong>Lean AL' + '<i class="vertical" style="background:' + getColorbattleground(grades[4]) + '"></i></strong></h6>' +
            '<h6><strong>Lean BNP' + '<i class="vertical" style="background:' + getColorbattleground(grades[5]) + '"></i></strong></h6>' +
            '<h6><strong>Lean JP' + '<i class="vertical" style="background:' + getColorbattleground(grades[6]) + '"></i></strong></h6>' +
            '<h6><strong>Strong AL' + '<i class="vertical" style="background:' + getColorbattleground(grades[7]) + '"></i></strong></h6>' +
            '<h6><strong>Strong BNP' + '<i class="vertical" style="background:' + getColorbattleground(grades[8]) + '"></i></strong></h6>' +
            '<h6><strong>Strong JP ' + '<i class="vertical" style="background:' + getColorbattleground(grades[9]) + '"></i></strong></h6>'];*/
            this._div.innerHTML = labels.join('');
            return this._div;
            };

/*    swinglegend.onAdd = function(e) {
      this._div = L.DomUtil.create('div', 'info legend');
      grades = [1, 20, 30],
      labels = ['<h4>Party-Coalition</h4>' +
      '<h6><strong>Mohajote-Awami League ' + '<i class="vertical" style="background:' + getSwingColor(grades[0]) + '"></i></strong></h6>' +
      '<h6><strong>Four Party Alliance-BNP ' + '<i class="vertical" style="background:' + getSwingColor(grades[1]) + '"></i></strong></h6>' +
      '<h6><strong>Other ' + '<i class="vertical" style="background:' + getSwingColor(grades[2]) + '"></i></strong></h6>'];
      this._div.innerHTML = labels.join('');
      return this._div;
      };
*/

  //PD
var battlegroundgeojson = L.geoJson(battleground, {
      style: battlegroundstyle,
      onEachFeature: battlegroundEachFeature
  });
//END PD /////////////////////////////////////
