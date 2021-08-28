google.charts.load("current", {
    packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart);

/**
 * Load learner performance as per selected class
 */
$(document).ready(function () {
    $('#progress-class-select-picker').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
        var selected = $(e.currentTarget).val();
        if (selected > 0) {
            $.ajax({
                url: site_url+'/reports/?progressClassId='+selected+'&type=progress',
                type: 'get',
                dataType: 'html',
                beforeSend: function () {
                    $.blockUI({ css: { border: 'none', backgroundColor: 'none' }, message: '<img src="' + site_url + '/assets/eduplaycloud/image/loader.gif" alt="Loading" width="100" />' });
                }
            }).done(function (data) {
                $.unblockUI();
                $(".progress_chart").empty().html(data);

                var notStarted = learnerProgress[1]['Not Started'];
                var needsMorePractice = learnerProgress[2]['Needs More Practice'];
                var underAcquisition = learnerProgress[3]['Under Acquisition'];
                var acquired = learnerProgress[4]['Acquired'];
                var mastered = learnerProgress[5]['Mastered'];

                var data = google.visualization.arrayToDataTable([
                    ['Effort', 'Amount Given'],
                    ['Mastered', mastered],
                    ['Acquired', acquired],
                    ['Under Acquisition', underAcquisition],
                    ['Needs More Practice', needsMorePractice],
                    ['Not Started', notStarted],
                ]);

                var options = {
                    legend: 'none',
                    width: '100%',
                    height: '100%',
                    chartArea: { left: "3%", top: "3%", height: "100%", width: "100%" },
                    pieStartAngle: -90,
                    is3D: false,
                    pieHole: 0.7,
                    'tooltip': {
                        trigger: 'none'
                    },

                    responsive: 'true',
                    pieSliceText: "none",
                    pieSliceTextStyle: {
                        color: 'black'
                    },
                    'legend': 'right',
                    slices: {
                        0: {
                            color: '#009487'
                        },
                        1: {
                            color: '#88C157'
                        },
                        2: {
                            color: '#FFEA55'
                        },
                        3: {
                            color: '#FF972D'
                        },
                        4: {
                            color: '#FA463D'
                        }
                    }
                };
                var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                function selectHandler() {
                    var selectedItem = chart.getSelection()[0];
                    if (selectedItem) {
                        var topping = data.getValue(selectedItem.row, 0);
                        var authUserId = $('header').attr('id');
                        var classId = $("#progress-class-select-picker option:selected").val();
                        if (classId == undefined) {
                            var classId = 0;
                        }
                        window.location = site_url + '/reports/skill/performance/' + classId + '/' + authUserId;
                    }
                }
                google.visualization.events.addListener(chart, 'select', selectHandler);
                chart.draw(data, options);
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
});

function drawChart() {
    var notStarted = learnerProgress[1]['Not Started'];
    var needsMorePractice = learnerProgress[2]['Needs More Practice'];
    var underAcquisition = learnerProgress[3]['Under Acquisition'];
    var acquired = learnerProgress[4]['Acquired'];
    var mastered = learnerProgress[5]['Mastered'];

    var data = google.visualization.arrayToDataTable([
        ['Effort', 'Amount Given'],
        ['Mastered', mastered],
        ['Acquired', acquired],
        ['Under Acquisition', underAcquisition],
        ['Needs More Practice', needsMorePractice],
        ['Not Started', notStarted],
    ]);

    var options = {
        legend: 'none',
        width: '100%',
        height: '100%',
        chartArea: {
            left: "3%",
            top: "3%",
            height: "100%",
            width: "100%"
        },
        pieStartAngle: -90,
        is3D: false,
        pieHole: 0.7,
        'tooltip': {
            trigger: 'none'
        },
        responsive: 'true',
        pieSliceText: "none",
        pieSliceTextStyle: {
            color: 'black'
        },
        'legend': 'right',
        slices: {
            0: {
                color: '#009487'
            },
            1: {
                color: '#88C157'
            },
            2: {
                color: '#FFEA55'
            },
            3: {
                color: '#FF972D'
            },
            4: {
                color: '#FA463D'
            }
        }
    };
    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    function selectHandler() {
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
            var topping = data.getValue(selectedItem.row, 0);
            var authUserId = $('header').attr('id');
            var classId = $("#progress-class-select-picker option:selected").val();
            if (classId == undefined) {
                var classId = 0;
            }
            window.location = site_url + '/reports/skill/performance/' + classId + '/' + authUserId;
        }
    }
    google.visualization.events.addListener(chart, 'select', selectHandler);
    chart.draw(data, options);
}