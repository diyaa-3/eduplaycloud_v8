google.charts.load('current', {
    'packages': ['imagesparkline']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ["Mrs. Hillary Jaskolski -  29", "Maybell Jacobi -  21", "Mustafa Roob -  13"],
        [28, 45, 0],
        [20, 15, 0],
        [20, 5, 50],
        [48, 20, 0]
    ]);
    var chart = new google.visualization.ImageSparkLine(document.getElementById('chart_div'));

    chart.draw(data, {
        width: 400,
        height: 40,
        showAxisLines: false,
        showValueLabels: false,
        labelPosition: 'left',
        color: '#348C46'
    });
}