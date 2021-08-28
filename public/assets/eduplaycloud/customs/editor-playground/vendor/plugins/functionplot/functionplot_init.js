var functionplot_help=`It is based on <a href="https://mauriciopoppe.github.io/function-plot/">functionplot</a>.`
var functionplot_sample=`
                \\Plugin_functionplot{
                    {
                        "data": [{
                            "fn": "x^2"
                        }]
                    }
                }_
`
var functionPlot_init = function () {
    divList = document.querySelectorAll(".functionplot");
    divList.forEach(function (_div, index) {
        var content=JSON.parse(_div.innerHTML);
        _div.innerHTML='';
       functionPlot( content);
    });
}

window.addEventListener('load', function () {
    functionPlot_init()
  }, false)
