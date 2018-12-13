allTitles["{{ key }}"] = '<h5>' + jib + ' ' + pctVote + '</h5>';
allGrades["{{ key }}"] = [0, 10, 20, 30, 40, 50, 60];
allLabels["{{ key }}"] = ['<h5>' + jib + ' ' + pctVote + '</h5>'];
allColors["{{ key }}"] = {
    base: [
        ['#a67c00', '#bf9b30', '#ffbf00', '#ffdc73', '#ffeda0','#fff8dc'],
        [ 60, 50, 40, 30, 20, 10, 0,]
    ]
};

allLayerProps["{{ key }}"] = {
    single: true,
    noMatchColor: "lightgray",
    resultsInfoUpdate: function (props) {
        this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
            + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
            + '<h5>' + recVotes + ': ' + props.jib + '</h5>'
            + '<h5>' + pctVote + ': ' + props.jibPercentage + '%</h5>'
            + '<h5>' + winner + ': ' + props.winner + '</h5>'
            + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
            + '' : '');
    },
    getColorProperty: function (feature) {
        return feature.properties.jibPercentage;
    },
};

