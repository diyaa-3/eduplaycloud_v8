var table =
    (function () {
        // "use strict";

        function _render(_code,customClass,caption) {
            var nCol = 0;
            var rows = _code.split(";");
            var _Html = '';
            _Html = '<table class="'+ customClass + '">';

            for (var i = 0; i < rows.length; i++) {
                var columns = rows[i].split("|");
                nCol = Math.max(nCol, columns.length)
                if (i == 0) {
                    _Html += '<thead><tr>';
                } else {
                    if (i == 1) {
                        _Html += '<tbody><tr>';
                    } else {
                        _Html += '<tr>';
                    }
                }

                for (var j = 0; j < columns.length; j++) {
                    (i == 0) ? mtag = 'th': mtag = 'td';
                    _Html += '<' + mtag + '>' + columns[j].trim() + '</' + mtag + '>';
                }
                if (i == 0) {
                    _Html += '</tr></thead>';
                } else {
                    if (i == rows.length) {
                        _Html += '</tr><tbody>';
                    } else {
                        _Html += '</tr>';
                    }
                }
            }
            
            if (caption != '') {
                _Html += '<tfoot><tr><td colspan="' + nCol + '" class="caption">'
                _Html += caption
                _Html += '</td></tr></tfoot>'
              }
            _Html += '</table>';
            return _Html;
        }
        return {

            render: _render
        };
    })();