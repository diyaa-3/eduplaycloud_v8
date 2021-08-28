// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";



CodeMirror.registerHelper("lint", "QEdu", function(text) {
  var found = [];
  try { compile.parse(text); }
  catch(e) {
      var loc = e.location.start
      found.push({ 
	  from: CodeMirror.Pos(loc.line, loc.column), 
	  to: CodeMirror.Pos(loc.line, loc.column+1), 
	  message: e.message });
  }
  return found;
});

});
