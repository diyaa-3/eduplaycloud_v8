google.charts.load("current", {
    packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    try {
        var data = google.visualization.arrayToDataTable(userAvgByClass);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2
        ]);

        var options = {
            title: "",
            width: "100%",
            height: 500,
            bar: {
                groupWidth: "40%"
            },
            legend: {
                position: "none"
            },
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("barchart_values_learner"));
        google.visualization.events.addListener(chart, 'select', function() {
            var selection = chart.getSelection();
            if (selection.length) {
                var authUserId = $('header').attr('id');
                var row = selection[0].row;
                var classId = $('#progress-class-select-picker option').eq(row).val();

                // window.location = site_url + '/reports/skill/performance/' + classId + '/' + authUserId;
                $('#progress-class-select-picker').val(classId).trigger('change');
            }
        });
        chart.draw(view, options);
    } catch(e) {
        return;
    }
}