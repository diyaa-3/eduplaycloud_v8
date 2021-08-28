var chartjs_help=`It is based on <a href="https://www.chartjs.org/docs/latest/">chartjs</a>.`

var chartjs_sample=`
                \\Plugin_chart \\Attr{height:'250'}{
                    {
                        "type": "bar",
                        "data": {
                                "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                                "datasets": [{
                                    "label": "# of Votes",
                                    "data": [12, 19, 3, 5, 2, 3],
                                    "backgroundColor": [
                                        "rgba(255, 99, 132, 0.2)",
                                        "rgba(54, 162, 235, 0.2)",
                                        "rgba(255, 206, 86, 0.2)",
                                        "rgba(75, 192, 192, 0.2)",
                                        "rgba(153, 102, 255, 0.2)",
                                        "rgba(255, 159, 64, 0.2)"
                                    ],
                                    "borderColor": [
                                        "rgba(255,99,132,1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)"
                                    ],
                                    "borderWidth": 1
                                }]
                            },
                            "options": {
                                "scales": {
                                    "yAxes": [{
                                        "ticks": {
                                            "beginAtZero":true
                                        }
                                    }]
                                }
                            }
                        }
                    
                }_`
var chart_init = function () {
    divList = document.querySelectorAll(".chartjs");
    divList.forEach(function (_div, index) {
        var content=JSON.parse(_div.innerHTML);
        // _div.innerHTML='';
        var ctx = _div.getContext("2d");
        var mychart = new Chart(ctx, content);
    });
}

window.addEventListener('load', function () {
    chart_init()
  }, false)
