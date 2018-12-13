allColors["{{ key }}"] = {
    base: [
        ['#00441b', '#006d2c', '#238b45', '#41ae76', '#66c2a4',
            '#99d8c9', '#ccece6', '#e5f5f9', '#f7fcfd', '#fdfffc', 'lightgray'
        ],
        [90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
    ]
};


allTitles["{{ key }}"] = '<h5>' + al + ' ' + pctVote + '</h5>';
allLabels["{{ key }}"] = ['<h5>' + al + ' ' + pctVote + '</h5>'];
allGrades["{{ key }}"] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

allLayerProps["{{ key }}"] = {
    single: true,
    resultsInfoUpdate: function(props) {
        this._div.innerHTML = (props ? '<h5>' + props.CST_N + '</h5>'
            + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
            + '<h5>' + recVotes + ': ' + props.awami + '</h5>'
            + '<h5>' + pctVote + ': ' + props.awamiPercentage + '%</h5>'
            + '<h5>' + winner + ': ' + props.winner + '</h5>'
            + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
            + '' : '');
    },
    getColorProperty: function(feature) {
        return feature.properties.awamiPercentage;
    },
};

