var music_help=`It is based on <a href="https://abcjs.net/">abcjs</a>.`
var music_sample=`
                \\Plugin_music{
                    X: 24
                    T:Clouds Thicken
                    C:Paul Rosen
                    S:Copyright 2005, Paul Rosen
                    M:6/8
                    L:1/8
                    Q:3/8=116
                    R:Creepy Jig
                    K:Em
                    |:"Em"EEE E2G|"C7"_B2A G2F|"Em"EEE E2G|\
                    "C7"_B2A "B7"=B3|"Em"EEE E2G|
                    "C7"_B2A G2F|"Em"GFE "D (Bm7)"F2D|\
                    1"Em"E3-E3:|2"Em"E3-E2B|:"Em"e2e gfe|
                    "G"g2ab3|"Em"gfeg2e|"D"fedB2A|"Em"e2e gfe|\
                    "G"g2ab3|"Em"gfe"D"f2d|"Em"e3-e3:|
                }_`


var abc_init = function () {
    divList = document.querySelectorAll(".music");
    divList.forEach(function (_div, index) {
         ABCJS.renderAbc(_div.id, _div.innerHTML);
    });
}

window.addEventListener('load', function () {
    abc_init()
  }, false)