allTitles["{{ key }}"] = '<h4>Margin of Victory</h4><h6><1% - 60%+</h6>';
allColors["{{ key }}"] = {
    base:[
        ["#a67c00", "#bf9b30", "#ffbf00", "#ffdc73", "#084594", "#2171b6", "#4292c6", "#6baed6",
            "#4a1486", "#6a51a3", "#807dba", "#bcbddc", "#67000d", "#a50f15", "#cb181d", "#fb6a4a", "#005a32",
            "#238b45", "#41ab5d", "#74c476", "#fff8dc", "#9ecae1", "#dadaeb", "#fee0d2", "#a1d99b", "gray"],
        [559, 539, 519, 509, 459, 439, 419, 409, 359, 339, 319, 309, 259, 239, 219, 209, 159, 139, 119, 109, 50, 40, 30, 20, 10]
    ],
    al:[
        ["#005a32", "#238b45", "#41ab5d", "#74c476", "#a1d99b", "gray"],
        [159, 139, 119, 109, 10, "gray"],
    ],
    bnp: [
        ["#67000d", "#a50f15", "#cb181d", "#fb6a4a", "#fee0d2", "gray"],
        [259, 239, 219, 209, 20,]
    ],
    jp: [
        ["#4a1486", "#6a51a3", "#807dba", "#bcbddc", "#dadaeb", "gray"],
        [359, 339, 319, 309, 30,]
    ],
    other: [
        ["#084594", "#2171b6", "#4292c6", "#6baed6", "#9ecae1", "gray"],
        [459, 439, 419, 409, 40, "gray"]
    ],
    jib: [
        ["#a67c00", "#bf9b30", "#ffbf00", "#ffdc73", "#fff8dc", "gray"],
        [559, 539, 519, 509, 50, "gray"]
    ]
};

allGrades["{{ key }}"] = {
    al: [10, 109, 119, 139, 159],
    bnp: [20, 209, 219, 239, 259],
    jp: [30, 309, 319, 339, 359],
    other: [40, 409, 419, 439, 459],
    jib: [50, 509, 519, 539, 559]
};

allLabels["{{ key }}"] = {
    na: '',
    al: '<h6>&nbsp AL</h6>',
    bnp: '<h6>&nbsp BNP</h6>',
    jp: '<h6>&nbsp JP</h6>',
    other: '<h6>&nbsp Other</h6>',
    jib: '<h6>&nbsp JIB</h6>',
};

allLayerProps["{{ key }}"] = {
    single: false,
    resultsInfoUpdate: function(props) {
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
    }
};

