
$.getScript('chessboard-0.3.0.min.js', function() {
function compile(details) {
    canvasList = document.querySelectorAll(".chess");
    var cfg =JSON.parse( canvas.getAttribute("code"));
    var idName = "board-" + index;
    var board = ChessBoard("board",cfg);
    var output;
    output= chessrender(details);
}

function chessrender (code) {
    try {
        // still to make the 'code' and read it separately....and make the id board-1 , board 2.
        //var res = JSON.parse(code);
        var html = '<div id="board" class="chess" style="width: 200px" code=\'' + code + '\'></div>'

        return html;
    } catch (str) {
        return '<pre> There is an error in generating chess board: ' + str + '</pre>'
    }
}

});
