//sample input is in mytoolbar.js
var jsxgraph_help=`It is based on <a href="http://jsxgraph.uni-bayreuth.de/docs/index.html">jsxgraph</a>. We have simplified the syntax, but not all API work`

var jsxgraph_sample = `
                \\Plugin_jsxgraph \\Attr{height:'300'}{
                    // - uncomment the lines that you want to activate and delete the others
                    b=board {boundingbox:[-0.5,10,10,-0.5],  axis: true };
                    p1= point[1,1],{size: 4, face: 'x',name:'A'};
                    p2= point[-4,5],{size: 4, face: 'x',name:'B'};
                    p3= point[3,0.5],{size: 1, face: 'o',name:'C',visible:false};
                   
                    // circle commands 
                    // ci=circle[p2,p3],{strokeColor:"#00ff00",strokeWidth:2};
                    ci=circle[[1,1],0.5];       // center and radius
                    // ci=circle[[1,1],[2,2]];   // diameter
                    // el=ellipse[p1,p2,p3];
                    // cii=semicircle[p1,p3];
                    // pol = polygon[[-2, -3], [-4, 1], [0, 4], [5, 1]], { name:'pol2', withLabel: true  };
                    // cur=curve[[0,1,2,3,5],[0,2,1,4,0]],  {dash:1,firstArrow:true,lastArrow:true};
                    // regHex2 = regularpolygon[p2,p1,6],{color:'yellow'};

                    //  a =angle[p1, p2, p3];
                    // li1 =line [p1,p2], {dash:0, strokeColor:"black", firstArrow:true, lastArrow:true};
                    // li2 =line[p2,p3], {straightFirst:false,lastArrow:true};
                    // ref='reflection',[p2,li1],{name:'reflection'}
                    // graph = functiongraph [function(x){ return 0.5*x*x-2*x;}, -2, 4];
                    // t=axis[[0,0],[50,2]],{strokeColor:'red'};
                   
                    // l1 = segment[[0.0, 3.0], [3.0, 3.0]];
                    // mp1 = midpoint [p1, p2];
                    // mp2 = midpoint [l1];
                    // theLine = line[p1,p2];
                    // thePoint = point[2,3],{name:'ptOnParallelLine'};
                    // yy=parallel[theLine,thePoint],{color:'green'};
                        
                    // l1 =line[p2, p3];
                    // i = intersection[c1, l1, 0];
                    // txt=text[0,15,"Hello World"], {anchor: p1};
                
                    // im =image["https://cdn.pixabay.com/photo/2015/04/21/07/22/drawing-732830_960_720.png", [0, 0], [5, 5]];       
                }_
`
function getvalue(x){
    var s='';
    switch (x.type) {
        //JXG.GeometryElement(board, attributes, type, oclass)
        case "Sstring":
            s="'" + x.value +"'";
        break;
        case "Dstring":
            s='"' + x.value +'"';
        break;
        case "attributes":
            s=attributestoString(x.value);
        break;
        case "array":
            s+="["
            s +=getvalue((x.value[0]))
            for (let index = 1; index < x.value.length; index++) {
                s +="," + getvalue(x.value[index])
            }
            s+="]";
           
        break;
        default:
            s=x.value;
        break;
        }
    return s;
}

function argumentstoString(arguments){
    var s="";
    s+="["
    // s +=arguments[Object.keys(arguments)[0]]
    // for (let index = 1; index < Object.keys(arguments).length; index++) {
    //     s +="," + arguments[Object.keys(arguments)[index]]
    // }
    s +=getvalue(arguments[0])
    for (let index = 1; index < arguments.length; index++) {
        s +="," + getvalue(arguments[index])
    }
    s +=']'

    return s;
}

function attributestoString(attributes){
    var s="";
    s+='{'
    // s += Object.keys(attributes)[0]+":"+attributes[Object.keys(attributes)[0]]
    // for (let index = 1; index < Object.keys(attributes).length; index++) {
    //     s +="," + Object.keys(attributes)[index]+":"+attributes[Object.keys(attributes)[index]]
    // }
    s +=attributes[0].name + ":" + getvalue(attributes[0])
    for (let index = 1; index < attributes.length; index++) {
        s +="," + attributes[index].name + ":" +getvalue(attributes[index])
    }
    s+='}'
    return s;
}

function createItem(variable,type,arguments,attributes){
    var s='';
    s='var ' +variable+"="+"board.create('" + type;
    s += "',"
    s+=argumentstoString(arguments)

    if (attributes!=null) {
        s+=','
        s+=attributestoString(attributes)
    }
    s+=');';
    return s;
}

var JSXGraph_init = function () {
    divList = document.querySelectorAll(".jxgbox");
    JXG.Options.axis.ticks.label.highlight = false;
   JXG.Options.axis.highlight = false;
    divList.forEach(function (_div, index) {
        
       // JXG.Options.text.cssdefaultstyle='font-family: Nanum Pen Script, cursive; font-size: 25px;'
        //JXG.Options.text.cssStyle='font-family: Nanum Pen Script, cursive; font-size: 25px;'
        var content = (_div.innerHTML);
        _div.innerHTML = '';
        var parsedJson = canvasParse.parse(content)
        var _code = '';
        parsedJson.forEach(element => {
            var v = element.value
            switch (v.type) {
                //JXG.GeometryElement(board, attributes, type, oclass)
                case "board":
                     element.value.attributes.push({name: "showCopyright", type: "boolean", value: "false"});
                     element.value.attributes.push({name: "keepaspectratio", type: "boolean", value: "true"});
                     //element.value.attributes.push({name: "showNavigation", type: "boolean", value: "false"});
                    
                   
                    _code += "var board = JXG.JSXGraph.initBoard('"+_div.id+"',"+ attributestoString(element.value.attributes) +');'
                    break;
                case "point":
                     if (element.value.attributes==null) {element.value.attributes=[]}
                     element.value.attributes.push({name: "fixed", type: "boolean", value: "true"});
                    _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                      break;
                case "circle":
                     _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                break;
                case "ellipse":
                     _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                break;
                case "angle":
                   _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                    break;
                case "line":
                   _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                    break;
                case "functiongraph":
                   _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                    break;
                case "polygon":
                  _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                    break;
                case "text":
                   _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                    break;
                case "image":
                   _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                    break;
                default:
                // if (element.value.attributes==null) {element.value.attributes=[]}
                //      element.value.attributes.push({name: "fixed", type: "boolean", value: "true"});
                  _code += createItem(element.variable,element.value.type,element.value.arguments,element.value.attributes)
                break;
            }
        });
        // creating the geometry and drawing
        eval(_code);
    });
}

window.addEventListener('load', function () {
    JSXGraph_init()
}, false)
//     var jxgbox1 = document.getElementById("jxgbox1");
//     var boxWidth = jxgbox1.getBoundingClientRect().width;
//     jxgbox1.style.height = (boxWidth+15)+"px";
	
// addEventListener
// window.addEventListener(resize)