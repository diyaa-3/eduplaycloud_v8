google.charts.load("current", {
    packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    try {
        var data = google.visualization.arrayToDataTable(userAvgPerformance);

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
        var chart = new google.visualization.ColumnChart(document.getElementById("barchart_values"));
        google.visualization.events.addListener(chart, 'select', function() {
            var selection = chart.getSelection();
            if (selection.length) {
                var row = selection[0].row;

                $('#class-select-picker option').eq(row).prop('selected', true);
                $('.selectpicker').selectpicker('refresh');

                var classId = classJson[row]['id'];
                $.ajax({
                    url: site_url + '/reports/?classId=' + classId,
                    type: 'get',
                    dataType: 'html',
                    beforeSend: function () {
                        $.blockUI({ css: { border: 'none', backgroundColor: 'none' }, message: '<img src="' + site_url + '/assets/eduplaycloud/image/loader.gif" alt="Loading" width="100" />' });
                    }
                }).done(function (data) {
                    $.unblockUI();
                    $(".performance_line_chart").empty().html(data);
                    $("span.line").peity("line");
                }).fail(function (jqXHR, ajaxOptions, thrownError) {
                    $.unblockUI();

                    swal('Oops! Something went wrong, Please try again.', {
                        closeOnClickOutside: false,
                        icon: 'info',
                    }).then(function () {

                    });
                });
            }
        });
        chart.draw(view, options);
    } catch(e) {
        return;
    }
}