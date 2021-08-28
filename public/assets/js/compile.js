function chesscompile() {
    try {
        console.log( "complie!" );


        var cfg =    $( "#board" ).data( "code");
        cfg1=cfg.position;
        var previewFrame = document.getElementById('preview')
        //    var cfg = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';

        var htmlouput;

        var board = ChessBoard('board', cfg1);
        console.log( "comp2!" );
        return htmlouput;

    } catch (str) {
        return '<pre> There is an error in generating chess board: ' + str + '</pre>'
    }
}