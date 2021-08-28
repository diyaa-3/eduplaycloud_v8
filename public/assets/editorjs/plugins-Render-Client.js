// Things todo  
//------------------------------------------------
// inline issue and repeat.
// Need to treat exceptions and errors
//------------------------------------------------

// This should be on client side and cannot be on server except with node or server that run javascript
// since the plugin are taken from web having javascript to render.
var vendorDir = '../../vendor';
var vendorPluginsDir = vendorDir + '/plugins';

//var clock = require('./clock');
//var katex = require('katex');
// var mermaid = require(vendorPluginsDir + '/mermaid/mermaid');
//jsxgraphcore
var divIndex = {};

function getProperties(_code) {
  var fields = _code.split(" ");
  var obj = {};
  for (var i = 0; i < fields.length; i++) {
    var _property = fields[i].split(":");
    var propName = _property[0];
    var prop;
    if (_property.length > 2) {
      prop = _property.slice(1).join(':')
    } else {
      prop = _property[1]
    }
    obj[propName] = prop;
  }
  return obj
}

function wrapWithTableCaption(_Html, display, caption, style) {
  var _mHtml = '';

  if (style == null) {
    _mHtml += '<table align="center">'
  } else {
    _mHtml += '<table align="center" style="' + style + '">'
  };
  _mHtml += '<tr><td>';
  _mHtml += _Html;
  _mHtml += '</td></tr>';

  if (caption != '') {
    _mHtml += '<tr><td class="caption" style="text-align:center">';
    _mHtml += caption;
    _mHtml += '</td></tr>';
  }
  _mHtml += '</table>';

  if (display == 'inline') {
    _mHtml = '<div class="Section" style="display:inline-block;vertical-align:middle ">' + _mHtml + '</div>';
  } else {
    _mHtml = '<div class="Section" style="text-align:center;width:100%">' + _mHtml + '</div>';
  }
  return _mHtml;
}

function _render(htmlTag, idName, className, _code, _style, _align) {
  try {
    _style = _style || ''
    _align = _align || ''
    if (_align != '') {
      var html = '<' + htmlTag + ' id="' + idName + '" class="' + className + '" align="' + _align + '" style="' + _style + '">' + _code + '</' + htmlTag + '>'
    } else {
      var html = '<' + htmlTag + ' id="' + idName + '" class="' + className + '" style="' + _style + '">' + _code + '</' + htmlTag + '>'
    }
    return html
  } catch (str) {
    return '<pre>' + msg + '</pre>'
  }
}
//render function of all plugins to be changed in a way to render immediately similar to katex and markdown
var plugIns = [
  // {
  //   type: "markdown",
  //   render: function (_code, index) {
  //     try {
  //       var res = md.render(_code);
  //       // res=_code;
  //       return res;
  //     } catch (str) {
  //       return '<pre> There is an error in parsing Markdown:' + str + '</pre>'
  //     }
  //   }
  // },
  {
    type: "music",
    cssPath: null,
    jsPath: [vendorPluginsDir + '/abcjs/abcjs_basic_5.1.1-min.js', vendorPluginsDir + '/abcjs/abcjs_init.js'],
    init: "abc_init()",
    convertToImg: true,
    render: function (section) {
      var _code = section.Value;
      divIndex.abcjs = divIndex.abcjs || 0;
      divIndex.abcjs++;
      return _render('div', 'abc-' + divIndex.abcjs, 'music Section', _code)
    }
  },
  {
    type: "chart",
    cssPath: null,
    jsPath: [vendorPluginsDir + '/chartjs/chart.bundle.min.js', vendorPluginsDir + '/chartjs/chart_init.js'],
    init: "chart_init()",
    convertToImg: true,
    render: function (section) {
      var height = '200'
      if (section.Attributes != null) {
        height = section.Attributes.height || '200'
      }
      height += 'px';

      divIndex.chartjs = divIndex.chartjs || 0;
      divIndex.chartjs++;
      var _code = section.Value;

      var display = '';
      var customClass = '';
      var caption = '';
      if (section.Attributes != null) {
        display = section.Attributes.display || '';
        customClass = (' ' + section.Attributes.class) || '';
        caption = section.Attributes.caption || '';
      }

      var _Html = _render('canvas', 'chartjs-' + divIndex.chartjs, 'chartjs', _code, 'max-width:' + height + ';height:' + height)

      if (display == 'inline') {
        _Html = '<div class="Section" align="center" style="display:inline-block;vertical-align:middle;width:350px;height:350px ">' + _Html + '</div>';
      } else {
        _Html = '<div class="Section" align="center">' + _Html + '</div>';

      }

      return _Html;
    }
  },
  {
    type: "chess",
    cssPath: vendorPluginsDir + '/chess/chessboard-0.3.0.min.css',
    jsPath: [vendorDir + '/jquery/jquery-3.3.1.min.js',
      vendorPluginsDir + '/chess/chessboard.js',
      vendorPluginsDir + '/chess/chess_init.js'
    ],
    init: "chess_init()",
    convertToImg: true,
    render: function (section) {
      var _code = section.Value;
      divIndex.chess = divIndex.chess || 0;
      divIndex.chess++;

      var display = '';
      var customClass = '';
      var caption = '';
      if (section.Attributes != null) {
        display = section.Attributes.display || '';
        customClass = (' ' + section.Attributes.class) || '';
        caption = section.Attributes.caption || '';
      }
      var _Html = '';
      _Html += _render('div', "board-" + divIndex.chess, 'chess', _code, 'width:200px;');
      _Html = wrapWithTableCaption(_Html, display, caption);

      return _Html;
    }
  },
  {
    type: "clock",
    cssPath: null,
    jsPath: [vendorPluginsDir + '/clock/clock.js', vendorPluginsDir + '/clock/clock_init.js'],
    init: "clock_init()",
    convertToImg: true,
    render: function (section) {
      var _code = section.Value;
      divIndex.clock = divIndex.clock || 0;
      divIndex.clock++;

      var display = '';
      var customClass = '';
      var caption = '';
      if (section.Attributes != null) {
        display = section.Attributes.display || '';
        customClass = (' ' + section.Attributes.class) || '';
        caption = section.Attributes.caption || '';
      }
      var _Html = '';
      _Html += _render('canvas', 'clock-' + divIndex.clock, 'clock', _code, 'width:100%');
      _Html = wrapWithTableCaption(_Html, display, caption);

      return _Html;
    }
  },
  {
    type: "math",
    cssPath: vendorPluginsDir + '/katex/katex.css',
    jsPath: [vendorPluginsDir + '/katex/katex.min.js'],
    convertToImg: true,
    render: function (section) {
      var _code = section.Value;
      divIndex.katex = divIndex.katex || 0;
      divIndex.katex++;
      var display = ''
      var customClass = ''
      var caption = ''
      if (section.Attributes != null) {
        display = section.Attributes.display || ''
        customClass = (' ' + section.Attributes.class) || ''
        caption = section.Attributes.caption || ''
      }
      var _Html = ''
      _Html = '<table  align="center" width="100%">';
      _Html += '<tr><td>'
      _Html += _render('div', 'katex-' + divIndex.katex, 'math', katex.renderToString(_code), '', 'center')
      _Html += '</td></tr>'
      if (caption != '') {
        _Html += '<tr><td class="audiocaption" style="text-align:center">'
        _Html += caption
        _Html += '</td></tr>'
      }
      // if (caption != '') {
      //   _Html += '<td class="caption" width="50px">'
      //   _Html += caption
      //   _Html += '</td></tr>'
      // }
      _Html += '</table>'
      if (display == 'inline') {
        _Html = '<div class="Section" align="center" style="display:inline-block;vertical-align:middle ">' + _Html + '</div>';
      } else {
        _Html = '<div class="Section" align="center">' + _Html + '</div>';
      }
      return _Html;
    }
  },
  {
    type: "flow",
    cssPath: null,
    jsPath: [vendorPluginsDir + '/mermaid/mermaid.min.js', vendorPluginsDir + '/mermaid/mermaid_init.js'],
    convertToImg: true,
    init: "flow_init()",
    render: function (section) {
      var _code = section.Value;
      divIndex.mermaid = divIndex.mermaid || 0;
      divIndex.mermaid++;

      var display = '';
      var customClass = '';
      var caption = '';
      if (section.Attributes != null) {
        display = section.Attributes.display || '';
        customClass = (' ' + section.Attributes.class) || '';
        caption = section.Attributes.caption || '';
      }

      var _Html = '';
      var activeTab = $('.nav-item a.active').attr('id');
      if (activeTab == 'detail-tab') {
        _Html += _render('div', 'mermaid-' + divIndex.mermaid, 'mermaid ', _code, '','left');
      } else {
        _Html += _render('div', 'mermaid-' + divIndex.mermaid, 'mermaid ', _code, '','center');
      }
      _Html = wrapWithTableCaption(_Html, display, caption, 'width:100%');

      return _Html;
    }
  },
  {
    type: "table",
    cssPath: '../../stylesheets/layout.css',
    jsPath: null,
    convertToImg: true,

    render: function (section) {
      var _code = section.Value;
      divIndex.table = divIndex.table || 0;
      divIndex.table++;

      var display = '';
      var customClass = '';
      var caption = '';
      if (section.Attributes != null) {
        display = section.Attributes.display || '';
        customClass = (' ' + section.Attributes.class) || '';
        caption = section.Attributes.caption || '';
      }

      var _Html = '';
      _Html += table.render(_code, customClass, caption)

      if (display == 'inline') {
        _Html = '<div class="Section" style="display:inline-block;vertical-align:middle;overflow-x:auto ">' + _Html + '</div>';
      } else {
        _Html = '<div class="Section" align="center" style="overflow-x:auto;">' + _Html + '</div>';
      }
      return _Html;
    }
  },
  {
    type: "ContainerTable",
    cssPath: '../../stylesheets/layout.css',
    jsPath: null,
    convertToImg: true,

    render: function (section) {
      var _code = section.Value;
      divIndex.ctable = divIndex.ctable || 0;
      divIndex.ctable++;

      var display = '';
      var customClass = '';
      var caption = '';
      if (section.Attributes != null) {
        display = section.Attributes.display || '';
        customClass = (' ' + section.Attributes.class) || '';
        caption = section.Attributes.caption || '';
      }

      var _Html = '';
      //_Html += //table.render(_code, customClass, caption)
      _Html += '<table>'
      for (let i = 0; i < _code.rows.length; i++) {
        _Html += '<tr>'
        for (let j = 0; j < _code.rows[i].columns.length; j++) {
          var cell = _code.rows[i].columns[j]

          var cstyle = '';
          
          if (cell.Top != null) {
            cstyle += 'border-top:1px solid black;'
          }
          if (cell.Bottom != null) {
            cstyle += 'border-bottom:1px solid black;'
          }
          if (cell.Right != null) {
            cstyle += 'border-right:1px solid black;'
          }
          if (cell.Left != null) {
            cstyle += 'border-left:1px solid black;'
          }
          if (cstyle!='') {cstyle='style="' +cstyle+'" '}
          
          _Html += '<td ' + cstyle + '>'
          if (cell.Sections != null) {
            renderSections(cell.Sections)
            for (let index = 0; index < cell.Sections.length; index++) {
              _Html += cell.Sections[index].Value;

            }
          }

          _Html += '</td>'
        }
        _Html += '</tr>'
      }
      _Html += '</table>'

      if (display == 'inline') {
        _Html = '<div class="Section" style="display:inline-block;vertical-align:middle;overflow-x:auto ">' + _Html + '</div>';
      } else {
        _Html = '<div class="Section" align="center" style="overflow-x:auto">' + _Html + '</div>';
      }
      return _Html;
    }
  },

  {
    type: "Text",
    cssPath: '../../stylesheets/layout.css',
    jsPath: null,
    convertToImg: true,

    render: function (section) {
      var _code = section.Value;
      // divIndex.table = divIndex.table || 0;
      // divIndex.table++;

      var display = '';
      var customClass = '';
      var caption = '';
      if (section.Attributes != null) {
        display = section.Attributes.display || '';
        customClass = (' ' + section.Attributes.class) || '';
        caption = section.Attributes.caption || '';
      }

      var _Html = '';

      _Html += _code.replace(/\n/g, "<br>");

      if (display == 'inline') {
        _Html = '<div class="Text Section "' + customClass + ' style="display:inline-block;vertical-align:middle ">' + _Html + '</div>';
      } else {
        _Html = '<div class="Text Section " ' + customClass + ' >' + _Html + '</div>';
      }
      return _Html;
    }
  },
  {
    type: "textBox",
    cssPath: '../../stylesheets/layout.css',
    jsPath: null,
    convertToImg: true,

    render: function (section) {
      var _code = section.Value;
      // divIndex.table = divIndex.table || 0;
      // divIndex.table++;

      var display = '';
      var customClass = '';
      var caption = '';
      if (section.Attributes != null) {
        display = section.Attributes.display || '';
        customClass = (' ' + section.Attributes.class) || '';
        caption = section.Attributes.caption || '';
      }

      var _Html = '';
      if (caption != '') {
        caption = '<label>' + caption + '</label>'
      }
      // _Html+=caption+ '<input type="text" data-correct="'+  _code  +"'>'
      _Html += caption + '<input type="text" class="' + customClass + '">'
      _Html += '<correctValue style="display:none">' + _code + '</correctValue>'
      if (display == 'inline') {
        _Html = '<div class="textBox Section " style="display:inline-block;vertical-align:middle ">' + _Html + '</div>';
      } else {
        _Html = '<div class="textBox Section " >' + _Html + '</div>';
      }
      return _Html;
    }
  },
  {
    type: "image",
    cssPath: null,
    jsPath: null,
    convertToImg: false,
    render: function (section) {
      var _code = section.Value;
      var obj = getProperties(_code)
      var widthString = '';
      var display = ''
      var customClass = ''
      var caption = ''
      var height = 0
      var width = 0
      var direction = 'horizontal'
      var _repeat = 1
      if (section.Attributes != null) {
        display = section.Attributes.display || ''
        customClass = (' ' + section.Attributes.class) || ''
        caption = section.Attributes.caption || ''
        height = section.Attributes.height || 0
        width = section.Attributes.width || 0
        direction = section.Attributes.direction || 'horizontal'
        _repeat = section.Attributes.repeat || 1
      }
      if(width!=0) { width='max-width:' + width + 'px;'} else {width=''}

      // if (obj.height) {
      //   widthString = ' height=' + obj.height + ' width=' + obj.height
      // }
      //obj.src = 'img/user/' + obj.src;
      obj.src = obj.src;
      var _Html = '<table  align="center"    >';

      if (direction == 'horizontal') {
        _Html += '<tr>'
        _Html += '<td>'
      }
      for (let index = 0; index < _repeat; index++) {
        if (direction == 'vertical') {
          _Html += '<tr><td><img src="' + obj.src + '"' + ' style="width: 100%;' +width+ '" ></td></tr>'
        } else {
         // _Html += '<td><img src="' + obj.src + '"'+ ' style="width: 100%;' +width+ '"></td>'
        _Html += '<img src="' + obj.src + '"'+ ' style="display:inline' +width+ '" >'
        
        }
      }
      if (direction == 'horizontal') {
        _Html += '</td>'
        _Html += '</tr>'
      }


      if (caption != '') {
        _Html += '<tr><td class="caption" colspan="' + _repeat + '">'
        _Html += caption
        _Html += '</td></tr>'
      }
      _Html += '</table>'


      if (display == 'inline') {
        _Html = '<div class="Section" style="display:inline-block;vertical-align:middle ">' + _Html + '</div>';
      } else {
        _Html = '<div class="Section" style="text-align:center">' + _Html + '</div>';
      }

      return _Html
    }
  },
  {
    type: "audio",
    cssPath: null,
    jsPath: [vendorPluginsDir + '/audio/audio.js'],
    convertToImg: false,
    render: function (section) {
      var _code = section.Value;
      divIndex.audio = divIndex.audio || 0;
      divIndex.audio++;
      var idName = 'audio-' + divIndex.audio;
      var display = ''
      var customClass = ''
      var caption = ''
      var image = ''
      if (section.Attributes != null) {
        display = section.Attributes.display || ''
        customClass = (' ' + section.Attributes.class) || ''
        caption = section.Attributes.caption || ''
        image = section.Attributes.image || ''

      }
      var obj = getProperties(_code)
      obj.img = image || 'img/play.png';
      //obj.src = 'audio/' + obj.src;
      obj.src = obj.src;

      // Check current url Starts here
      var cUrl = $(location).attr('href');
      var last_part = "";
      var last_part_last = "";
      if(cUrl != undefined) {
        var parts = cUrl.split("/");
        if (parts != undefined) {
          last_part = parts[parts.length-2];
          last_part_last = parts[parts.length-1];  
        }
      } 
      
      // Check current url ends here
      var _Html = '<table  class=""  onClick="document.getElementById(\'' + idName + '\').play(); return false;" >';

      _Html += '<tr><td >'

      if (last_part == "practice" || last_part_last == "disciplinepractice" || last_part_last == "guestpractice") {
        if (display == 'inline') {
          _Html += '<audio id="' + idName + '" controls="" style="display: block;"  name="media" ><source src="' + obj.src + '" type="audio/mpeg"> Your browser does not support the audio tag.</audio>'
        } else {
          _Html += '<audio id="' + idName + '" controls=""  name="media" ><source src="' + obj.src + '" type="audio/mpeg"> Your browser does not support the audio tag.</audio>'
        }
        
      } else {
        _Html += '<audio id="' + idName + '" controls="" style="display: block;"  name="media" ><source src="' + obj.src + '" type="audio/mpeg"> Your browser does not support the audio tag.</audio>'
      }
      _Html += '</td></tr>';
      if (caption != '') {
        _Html += '<tr><td class="audiocaption" style="text-align:center"><p>'
        _Html += caption
        _Html += '</p></td></tr>'
      }
      _Html += '</table>'
      
      if (display == 'inline') {
        
        if (last_part == "practice") {
          if (last_part_last == "disciplinepractice" || last_part_last == "guestpractice") {
            _Html = '<div class="Section" align="center" style="display:inline-block;">' + _Html + '</div>';
          } else {
            _Html = '<div class="Section" align="center" style="vertical-align:middle;">' + _Html + '</div>';
          }
        } else {
          if (last_part_last == "guestpractice") {
            _Html = '<div class="Section" align="center" style="display:inline-block;">' + _Html + '</div>';
          } else {
            _Html = '<div class="Section" align="left" style="vertical-align:middle;text-align: left !important; ">' + _Html + '</div>';
          }
        }
        
      } else {
        if (last_part == "practice" || last_part_last == "disciplinepractice" || last_part_last == "guestpractice") {
          _Html = '<div class="Section" align="center" style="display:inline-block;">' + _Html + '</div>';
        } else {
          if (last_part_last == "guestpractice") {
            _Html = '<div class="Section" align="center" style="display:inline-block;">' + _Html + '</div>';
          } else {
            _Html = '<div class="Section" align="left" style="text-align: left !important;">' + _Html + '</div>';
          }
          
        }
        
      }
      return _Html
    }
  },
  {
    type: "video",
    cssPath: null,
    jsPath: null,
    convertToImg: false,
    render: function (section) {
      var _code = section.Value;
      var height=0;
      if (section.Attributes != null) {
        // display = section.Attributes.display || ''
        // customClass = (' ' + section.Attributes.class) || ''
        // caption = section.Attributes.caption || ''
        height = section.Attributes.height || 0
        // width = section.Attributes.width || 0
        // direction = section.Attributes.direction || 'horizontal'
        // _repeat = section.Attributes.repeat || 1
      }
      if(height!=0) { height= height + 'px;'} else {height='300px'}

      var _Html = '<div align="left" class="rtl-video">'
      _Html += '<iframe width="100%"  height="'+height+'" src="' + _code + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
      _Html += '</div>'
      return _Html
    }
  },



  {
    type: "functionplot",
    cssPath: null,
    jsPath: [vendorDir + '/d3/d3.min.3.js', vendorPluginsDir + '/functionplot/functionplot.js', vendorPluginsDir + '/functionplot/functionplot_init.js'],
    init: "functionPlot_init()",
    convertToImg: true,
    render: function (section) {
      var _code = section.Value;
      divIndex.functionplot = divIndex.functionplot || 0;
      divIndex.functionplot++;
      var idName = 'functionplot-' + divIndex.functionplot;
      var _codeObj = JSON.parse(_code); //need to handle errors
      _codeObj.target = "#" + idName;
      _code = JSON.stringify(_codeObj);
      return _render('div', idName, 'functionplot Section', _code, 'overflow-x:auto;', 'center')
    }
  },
  {
    type: "jsxgraph",
    cssPath: vendorPluginsDir + '/jsxgraph/jsxgraph.css',
    jsPath: [vendorPluginsDir + '/jsxgraph/jsxgraphcore.js', vendorPluginsDir + '/jsxgraph/jsxgraph_init.js'],
    init: "JSXGraph_init()",
    convertToImg: true,
    render: function (section) {
      var _code = section.Value;
      var height = '200'
      if (section.Attributes != null) {
        height = section.Attributes.height || '150'
      }
      height += 'px';
      divIndex.jsxgraph = divIndex.jsxgraph || 0;
      divIndex.jsxgraph++;
      var idName = 'jxgbox-' + divIndex.jsxgraph;
      var _Html = '<div align="center" class="Section" style="overflow-x:auto;">';
      _Html += _render('div', idName, 'jxgbox', _code, 'width:' + height + ';' + 'height:' + height + ';')
      _Html += '</div>'
      return _Html
    }
  }
]


// {boundingbox:[-5,10,5,-2], keepaspectratio: true, axis:true}

// 'point',[1,1], {name:'X',size:3,face:'o'}
// 'line',["A","B"], {strokeColor:'#00ff00',strokeWidth:2}
// 'line',[[-1,1],[2,-1]], {straightFirst:false, straightLast:false, strokeWidth:2}
// 'circle',["A","B"], {strokeColor:'#00ff00',strokeWidth:1,fillColor:'#555500'}
// 'polygon',["X","B","C","D","E"]
// 'functiongraph', [function(x){return Math.sin(x);},-Math.PI,2*Math.PI]
// 'text',[-2,-1, 'Hello World'], {fontSize:30}
// 'transform', [30.0*Math.PI/180.0, -2,-1], {type:'rotate'}
// ax4 , 'axis', [[0,0],[1,0]]
// 'ticks', [ax4, [-4.33333, -1.5, 3.5, 4.321]], {strokeColor: '#00ff00', majorHeight: 15, drawLabels: true}
function renderPlugin_Section(section) {
  try {
    var p = plugIns.find(function (element) {
      if (section.SectionType !== undefined && section.SectionType.toLowerCase() == "text") {
        return element.type.toLowerCase() == "text";
      } else {
        return element.type == section.Plugin;
      }
    });
    section.Value = p.render(section);
    // var sectiontoRepeat = section.Value;
    // if (section.Attributes != null) {
    //   if (section.Attributes.repeat) {
    //     for (var i = 1; i < parseInt(section.Attributes.repeat); i++) {
    //       section.Value += sectiontoRepeat;
    //     }
    //   }
    // }
  } catch (err) {

    section.Value = '<pre> error in  renderPlugin_Section' + err + '\n in ' + section.Plugin + '</pre>'
  }
  return section;
}

function renderSections(sections) {
  sections.forEach(function (s) {
    // if (s.SectionType == "Plugin") {
    s = renderPlugin_Section(s);
    // }
    // if (s.SectionType == "Text") {
    //   s.Value = s.Value.replace(/\n/g, "<br>");
    //   s.Value = '<div class="Text Section">' + s.Value + '</div>';
    // }
  });
  return sections;
}

function renderPluginsinObj_Q(parsedQuestion) {
  //problem sections
  if (parsedQuestion.ItemType == "Problem") {
    renderSections(parsedQuestion.Problem_Description.Sections);
  }
  //question  sections
  parsedQuestion.Questions.forEach(function (item) {
    var QSections = item.Question_Description.Sections;
    renderSections(QSections);
    item.Answers.Choices.forEach(function (C) {
      renderSections(C.Sections)
    });
    item.Hints.HintList.forEach(function (H) {
      renderSections(H.Sections)
    });
  });
  return parsedQuestion;
}

function renderPluginsinObj_E(parsedStaticExerciseSet) {
  
  var HtmlExerciseSetJson = [];
  parsedStaticExerciseSet.forEach(function (parsedQuestion) {
    parsedQuestion = renderPluginsinObj_Q(parsedQuestion);
    HtmlExerciseSetJson.push(parsedQuestion);
  })
  return HtmlExerciseSetJson;
}

var renderPluginsinObj = function (JsonObj) {
  return renderPluginsinObj_E(JsonObj)
}
