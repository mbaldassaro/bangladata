allTitles["{{ key }}"] = '<h5>' + other + ' ' + pctVote + '</h5>';
allGrades["{{ key }}"] = [0, 20, 30, 40, 50];
allLabels["{{ key }}"] = ['<h5>' + other + ' ' + pctVote + '</h5>'];
allColors["{{ key }}"] = {
    base: [
        ['#4292c6', '#6baed6', '#9ecae1', '#c6dbef', '#eff3ff', 'lightgray'],
        [50, 40, 30, 20, 0]
    ]
};

allLayerProps["{{ key }}"] = {
    single: true,
    noMatchColor: "lightgray",
    resultsInfoUpdate: function (props) {
        this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
            + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
            + '<h5>' + recVotes + ': ' + props.other + '</h5>'
            + '<h5>' + pctVote + ': ' + props.otherPercentage + '%</h5>'
            + '<h5>' + winner + ': ' + props.winner + '</h5>'
            + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
            + '' : '');
    },
    getColorProperty: function (feature) {
        return feature.properties.otherPercentage;
    },
};

