allTitles["{{ key }}"] = '<h5>' + jp + ' ' + pctVote + '</h5>';
allGrades["{{ key }}"] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
allLabels["{{ key }}"] = ['<h5>' + jp + ' ' + pctVote + '</h5>'];
allColors["{{ key }}"] = {
    base: [
        ['#3f007d','#54278f', '#6a51a3', '#807dba',
            '#9e9ac8', '#bcbddc', '#dadaeb', '#efedf5',
            '#fbf9ff', '#fcfbfd', 'lightgray'],
        [ 90, 80, 70, 60, 50, 40, 30, 20, 10, 0,]
    ]
};

allLayerProps["{{ key }}"] = {
    single: true,
    noMatchColor: "lightgray",
    resultsInfoUpdate: function (props) {
        this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
            + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
            + '<h5>' + recVotes + ': ' + props.jp + '</h5>'
            + '<h5>' + pctVote + ': ' + props.jpPercentage + '%</h5>'
            + '<h5>' + winner + ': ' + props.winner + '</h5>'
            + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
            + '' : '');
    },
    getColorProperty: function (feature) {
        return feature.properties.jpPercentage;
    },
};

