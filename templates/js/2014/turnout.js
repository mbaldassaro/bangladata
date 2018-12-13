allTitles["{{ key }}"] = '<h5>' + turnout + '</h5>';
allGrades["{{ key }}"] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
allLabels["{{ key }}"] = '<h5>' + turnout + '</h5>';
allColors["{{ key }}"] = {
    base: [
        [
            '#800026', '#bd0026', '#cc4c02', '#ec7014', '#fe9929',
            '#fec44f', '#fee391', '#fff7bc', '#ffffcc', '#ffffe5',
            "lightgray"
        ],
        [90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
    ]
};

allLayerProps["{{ key }}"] = {
    single: true,
    noMatchColor: "lightgray",
    resultsInfoUpdate: function (props) {
        this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
            + '<h5>' + voterReg + ': ' + props.regVoters + '</h5>'
            + '<h5>' + voterTot + ': ' + props.turnout + '</h5>'
            + '<h5>' + turnout + ': ' + props.percentage + '%</h5>'
            + '' : '')
    },
    getColorProperty: function (feature) {
        return feature.properties.percentage;
    },
};


