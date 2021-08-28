// sample Json from the paramater parser
// [
//   {
//      "parameter": "name",
//      "value": {
//         "type": "random.string",
//         "stringType": "name"
//      }
//   },
//   {
//      "parameter": "city",
//      "value": {
//         "type": "random.string",
//         "stringType": "city"
//      }
//   },
//   {
//      "parameter": "k",
//      "value": {
//         "type": "random.fromlist",
//         "list": [
//            "sds",
//            "1",
//            "sdsd"
//         ]
//      }
//   },
//   {
//      "parameter": "a",
//      "value": {
//         "type": "random.number",
//         "from": "1",
//         "to": "6",
//         "numberType": "Dec"
//      }
//   },
//   {
//      "parameter": "c",
//      "value": {
//         "type": "random.number",
//         "from": "1",
//         "to": "10",
//         "numberType": "Int"
//      }
//   },
//   {
//      "parameter": "b",
//      "value": {
//         "type": "math",
//         "mathExpression": "3*a+2*sin(c)"
//      }
//   },
//   {
//      "parameter": "d",
//      "value": {
//         "type": "joinstring",
//         "stringlist": [
//            "k",
//            "b",
//            "c"
//         ]
//      }
//   }
// ]


function evaluateParameters (parsedQuestion) {
    var param = arraySearch("param", parsedQuestion.Attrs)
    var output='';
    var parsedParam={};
    try {
      param = removeNewLinesfromString(param.value)
      parsedParam=parserParameter.parse(param);
      //  console.log(parsedParam)
      var qParam={};
      parsedParam.forEach(function(_p) {
     // console.log(_p.value.type);
      
      switch(_p.value.type) {
          case "random.number":
            var from=Number(_p.value.from);
            var to=Number(_p.value.to);
            var numberType=(_p.value.numberType);
            switch(numberType){
                case "Int":qParam[_p.parameter]=Math.floor(Math.random() * to) + from ; 
        
                   break;
                case "Dec":qParam[_p.parameter]=Math.random().toFixed(3) * to+ from ;  // to check this
                   break;
            }
            break;
          case "random.string":
              var stringType=_p.value.stringType;
              switch(stringType){
                case "name":qParam[_p.parameter] = faker.name.findName();
                   break;
                case "city":qParam[_p.parameter] = faker.address.city();
                   break;
                
                // u can add other fake domain of faker.js
                default: qParam[_p.parameter] = "";
            }
              
          break;
          case "random.fromlist":
              var mArray=_p.value.list;
              var index=Math.floor(Math.random() * mArray.length)  ; 
              qParam[_p.parameter] = mArray[index];
          break;
          // case "file":
                // var filename=_p.value.filename;
              // add path
              // qParam[_p.parameter] = faker.name.findName();
          // break;
         case "joinstring":
               var stringlist=_p.value.stringlist;
               qParam[_p.parameter]='';
               stringlist.forEach( function (elem,index){
                  qParam[_p.parameter]= qParam[_p.parameter] + qParam[elem]; // to be adjusted it add the number even if strings
               });
              
              
              break;

          case "math":
           var mathExpression=(_p.value.mathExpression);
           qParam[_p.parameter]=math.eval(mathExpression,qParam).toFixed(3)   // using mathjs
          break;
            
           default:
             qParam[_p.parameter]="...error...";
      }
    
      });
      
      
        // replace apply json object variables to the template and get the output
       var res = Mustache.render(JSON.stringify(parsedQuestion), qParam);
      if (res)  {
        parsedQuestion=JSON.parse(res);
      } else
      {
        console.log("error in template engine")
      }
    } catch (str) {
        console.log("error in parameter syntax")
        output= '<pre> There is an error parameter syntax: ' + str + '</pre>'
    }

    return  {output: output, parsedQuestion: parsedQuestion}
  }
