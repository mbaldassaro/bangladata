allTitles["{{ key }}"] = '<h5>' + bnp + ' ' + pctVote + '</h5>';
allGrades["{{ key }}"] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
allColors["{{ key }}"] = {
    base: [
        [
            '#67000d', '#a50f15', '#cb181d', '#ef3b2c', '#fb6a4a',
            '#fc9272', '#fcbba1', '#fee0d2', '#fff5f0', '#fffbf9', 'lightgray'
        ],
        [90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
    ]
};
allLayerProps["{{ key }}"] = {
    single: true,
    getColorProperty: function (feature) {
        return feature.properties.bnpPercentage;
    },
    resultsInfoUpdate: function(props) {
        this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
            + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
            + '<h5>' + recVotes + ': ' + props.bnp + '</h5>'
            + '<h5>' + pctVote + ': ' + props.bnpPercentage + '%</h5>'
            + '<h5>' + winner + ': ' + props.winner + '</h5>'
            + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
            + '' : '');
    }
};

