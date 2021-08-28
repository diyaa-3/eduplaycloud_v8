function passAndHint(cm) {
    setTimeout(function () {
        cm.execCommand("autocomplete");
    }, 100);
    return CodeMirror.Pass;
}

CodeMirror.commands.autocomplete = function (cm) {
    CodeMirror.showHint(cm, CodeMirror.QEduHint);
}


function getSelectedRange() {
    return {
        from: editor.getCursor(true),
        to: editor.getCursor(false)
    };
}

function foldAll() {
    var cm = editor;
   
   
    cm.operation(function() { 
           for (var l = cm.firstLine(); l <= cm.lastLine(); ++l) {
              cm.foldCode({line: l, ch: 0}, {rangeFinder: CodeMirror.fold.indent}, "fold"); 
           }
         }); 
}

function unfoldAll() {
    var cm = editor;
   
   
    cm.operation(function() { 
           for (var l = cm.firstLine(); l <= cm.lastLine(); ++l) {
              cm.foldCode({line: l, ch: 0}, {rangeFinder: CodeMirror.fold.indent}, "unfold"); 
           }
         }); 
}

function autoFormatAll() {
    //CodeMirror.commands["selectAll"](editor);  
    //var range = getSelectedRange();
    var mText = editor.getValue();
    mText = formatQText(mText);
    editor.setValue(mText);
}

function autoFormatSelection() {
    var range = getSelectedRange();
    editor.autoFormatRange(range.from, range.to);
}

function commentSelection(isComment) {
    var range = getSelectedRange();
    editor.commentRange(isComment, range.from, range.to);
}
var markers = [];

function markErrorInEditor(row, col) {
    //var row=e.location.start.line;
    //var col=e.location.start.column;
    ncol = col + 1;
    s = {};
    s.line = row - 1;
    s.ch = col - 1;
    // t={};
    // t.line=row-1;
    // t.ch=col+1;
    var word = editor.findWordAt(s)
    //editor.setSelection(word.anchor, word.head)
    editor.setGutterMarker(row - 1, "breakpoints", makeMarker()); //info.gutterMarkers ? null :
    // var mark=editor.markText ( s,t, {className: "codemirrorError"} )
    var mark = editor.markText(word.anchor, word.head, {
        className: "codemirrorError"
    })

    markers.push(mark);
}

function clearmarksErrorInEditor() {
    editor.clearGutter("breakpoints");
    markers.forEach(marker => marker.clear());
    markers = [];
    /// var count = editor.lineCount(), i;
    //for (i = 0; i < count; i++) {
    //	editor.setGutterMarker(i, "breakpoints",  null); //info.gutterMarkers ? null :
    //}
}

function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "●";
    return marker;
}
var editorContainer = document.getElementById("editorContainer");

var editor = CodeMirror.fromTextArea(document.getElementById("exerciseSet-editor"), {
    lineNumbers: true,
    theme: "QEdu-1",
    styleActiveLine: true,
    lineNumbers: true,
    //lineWrapping: true,
    mode: "QEduSimple",
    //lint: true,
    smartindent: true,
    // direction: "rtl",
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    gutters: ["CodeMirror-lint-markers", "breakpoints", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
        "Shift-Alt-F": autoFormatAll,
        "Ctrl-Y": foldAll,
        "Ctrl-I": unfoldAll
        // "':'": passAndHint,
        // "'$'": passAndHint,
        //"Ctrl-Space": autoFormatAll  //"autocomplete"

    },
    foldGutter: {
        rangeFinder: new CodeMirror.fold.combine( CodeMirror.fold.indent,CodeMirror.fold.brace, CodeMirror.fold.comment, CodeMirror.fold.xml)
    }
});
