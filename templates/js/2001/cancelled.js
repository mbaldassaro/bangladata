
allGrades["{{ key }}"] = [0, 1];
allColors["{{ key }}"] = {
    base: [
        ['#969696', '#d9d9d9', '#ffffff'],
        [1, 0]
    ]

};

allTitles["{{ key }}"] = '<h5>' + cancelled + '</h5>';
allLayerProps["{{ key }}"] = {
    noMatchColor: "#ffffff",
    single: true,
    getColorProperty: function (feature) {
        return feature.properties.percentage;
    },
    resultsInfoUpdate: function(props) {
        this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
            + '<h5>' + voterTot + ': ' + props.turnout + '</h5>'
            + '<h5>' + cancelled + ': ' + props.cancelledBallots + '</h5>'
            + '<h5>' + cancelledPercentage + ': ' + props.percentage + '%</h5>'
            + '' : '')
    },
};

