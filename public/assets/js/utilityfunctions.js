
function arraySearch(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    var mObj = myArray[i]
    if (mObj[Object.keys(mObj)[0]] === nameKey) {
      return myArray[i];
    }
  }
}

function removeNewLinesfromString(tpl) {
  var re = /(\r\n|\n|\r)/g;
  var match;
  while (match = re.exec(tpl)) {
    tpl = tpl.replace(match[0], " ")
  }
  return tpl;
}
//NOT YET IMPLEMENTED
// function mathEval(exp) {
//   var reg = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig,
//     valid = true;

//   // Detect valid JS identifier names and replace them
//   exp = exp.replace(reg, function ($0) {
//     // If the name is a direct member of Math, allow
//     if (Math.hasOwnProperty($0))
//       return "Math." + $0;
//     // Otherwise the expression is invalid
//     else
//       valid = false;
//   });

//   // Don't eval if our replace function flagged as invalid
//   if (!valid)
//     alert("Invalid arithmetic expression");
//   else
//     try { alert(eval(exp)); } catch (e) { alert("Invalid arithmetic expression"); };
// }

// (function(old) {
//   $.fn.attr = function() {
//     if(arguments.length === 0) {
//       if(this.length === 0) {
//         return null;
//       }

//       var obj = {};
//       $.each(this[0].attributes, function() {
//         if(this.specified) {
//           obj[this.name] = this.value;
//         }
//       });
//       return obj;
//     }

//     return old.apply(this, arguments);
//   };
// })($.fn.attr);

//Sanitizing HTML 
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};
// Regex containing the keys listed immediately above.
var htmlEscaper = /[&<>"'\/]/g;

// Escape a string for HTML interpolation.
function _htmlescape(string) {
  return ('' + string).replace(htmlEscaper, function (match) {
    return htmlEscapes[match];
  });
};
