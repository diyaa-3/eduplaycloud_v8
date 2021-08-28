var chess_sample=`
                \\Plugin_chess \\Attr {display:'inline' caption:'(1)'}{ r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R }_`

var chess_init = function () {
    divList = document.querySelectorAll(".chess");
    divList.forEach(function (_div, index) {
      
        var cfg = {
            pieceTheme: site_url + '/assets/eduplaycloud/customs/editor-playground/vendor/plugins/chess/img/chesspieces/wikipedia/{piece}.png',
           
          };
          cfg.position=_div.innerHTML;
        var board = ChessBoard(_div.id, cfg);
    });
}


window.addEventListener('load', function () {
    chess_init()
  }, false)