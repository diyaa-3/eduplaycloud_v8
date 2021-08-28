CodeMirror.defineSimpleMode("QEduSimple", {
  // The start state contains the rules that are intially used
  start: [
    // The regex matches the token, the token property contains the type
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    // You can match multiple tokens at once. Note that the captured
    // groups must span the whole string in this case
    {regex: /(function)(\s+)([a-z$][\w$]*)/,
     token: ["keyword", null, "variable-2"]},
    // Rules are matched in the order in which they appear, so there is
    // no ambiguity between this one and the one above
    {regex: /(Problem|IndQuestion):/,   token: "level1",indent:true},
    {regex: /(Q):/, token: "level3",indent:true, next:"section"},
    {regex: /(Answers|Hints):/, token: "level3",indent:true},
    {regex: /(\+A|-A|-H):/,   token: "level4",indent:true,next:"section"},
   
    {regex: /(Parameters|Question):/,   token: "level2", indent:true},
    {regex: /(P):/,   token: "level2", indent:true,next:"section"},
    
    {regex: /\\Attr\s*{.*?}/,   token: "attr"},
    {regex: /\\Attr/,   token: "attr",next: "attribute"},
    {regex: /\\Plugin_\w+/,   token: "plugin"},
    //{regex: /}_/,   token: "plugin"},
    
    
    {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
     token: "number"},
    {regex: /\/\/.*/, token: "comment"},
    {regex: /\\*.*\*\//, token: "comment"},
    {regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
    // A next property will cause the mode to move to a different state
    {regex: /\/\*/, token: "comment", next: "comment"},
    {regex: /[-+\/*=<>!]+/, token: "operator"},
    // indent and dedent properties guide autoindentation
    {regex: /[\{\[\(]/, indent: true},
    {regex: /[\}\]\)]/, dedent: true},
    {regex: /[a-z$][\w$]*/, token: "variable"},
    // You can embed other modes with the mode property. This rule
    // causes all code between << and >> to be highlighted with the XML
    // mode.
    {regex: /<</, token: "meta", mode: {spec: "xml", end: />>/}},
    {regex: /{/, token: "meta", mode: {spec: "json", end: /}/}}
  ],

  section: [
    {regex: /.*\s*(?=-A\:|-H\:|Hints|Answers)/, token: "attr", detent:true,next: "start"},
    
  ],
  // The multi-line attribute state.
  attribute: [
    {regex: /.*?}/, token: "attr", next: "start"},
    {regex: /.*/, token: "attr"}
  ],
  // The multi-line comment state.
  comment: [
    {regex: /.*?\*\//, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"}
  ],
  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});