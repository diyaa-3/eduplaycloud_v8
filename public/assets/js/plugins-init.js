var myChart_init = function () {
    canvasList = document.querySelectorAll(".chartjs");
    canvasList.forEach(function (canvas) {
        var ctx = canvas.getContext("2d");
        // var content = canvas.innerHTML;
        var obj =JSON.parse( canvas.getAttribute("code"));
        // console.log(content)
        // var obj = JSON.parse(content);
        // canvas.innerHTML="";
        canvas.removeAttribute("code");
        var mychart = new Chart(ctx, obj);
    });
}

var abc_init = function () {
    canvasList = document.querySelectorAll(".music");
    canvasList.forEach(function (canvas, index) {
        var content = canvas.innerHTML;
        var idName = "music-" + index;
        ABCJS.renderAbc(idName, content);
    });
}

var chess_init = function () {
    canvasList = document.querySelectorAll(".chess");
    canvasList.forEach(function (canvas, index) {
        var cfg =JSON.parse( canvas.getAttribute("code"));
        var idName = "board-" + index;
       
        // var cfg = {
        //     position: {
        //         d4: 'wP',
        //         d6: 'bK',
        //         e4: 'wK'
        //     }
        // };
        var board = ChessBoard("board",cfg);

    });
}

var functionplot_init = function () {
    // canvasList = document.querySelectorAll(".plot");
    // canvasList.forEach(function (canvas, index) {
    //     var cfg =JSON.parse( canvas.getAttribute("code"));
    //     var idName = "board-" + index;
       
    //     var board = ChessBoard("board",cfg);

    // });
    // import d3 from "d3";
    // window.d3 = d3;
    
    // const functionPlot = require("function-plot");
    
    // var root = document.querySelector("#plot-0");
    
    // functionPlot({
    //   target: root,
    //   yAxis: { domain: [-1, 9] },
    //   tip: {
    //     renderer: function() {}
    //   },
    //   grid: true,
    //   data: [
    //     {
    //       fn: "x^2",
    //       derivative: {
    //         fn: "2 * x",
    //         updateOnMouseMove: true
    //       }
    //     }
    //   ]
    // });

}
