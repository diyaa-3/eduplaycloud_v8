
// can be on client and to convert equivalent php on server
// Things todo  
//------------------------------------------------
// Need to treat exceptions and errors and check error in every parameter
//-------------------
var Mustache = require('mustache')  // convert equivalent php
var fs = require('fs')               // convert equivalent php
var path=require('path')               // convert equivalent php
var math = require('mathjs')             // convert equivalent php
var faker = require('../../vendor/faker/faker.min')   // convert equivalent php


function convertToStatic_E(parsedExerciseSet) {
  
    var ExerciseSetStaticJson = [];
    parsedExerciseSet.forEach(function (parsedQuestion) {
       parsedQuestion=convertToStatic_Q(parsedQuestion);
        ExerciseSetStaticJson.push(parsedQuestion);
    });
    console.log('Finished converting to Static ExerciseSet')
    return ExerciseSetStaticJson;
}

function  convertToStatic_Q(parsedQuestion) {
  var qParam;
  if (parsedQuestion.Parameters!=null) {
  qParam = evaluateParameters(parsedQuestion);
  parsedQuestion = substituteEvaluatedParameters(parsedQuestion, qParam);
  }
  return parsedQuestion;
}

function evaluateParameters(parsedQuestion) {
  //implement other commands like readrandomlyfrom file , other,,,
  //need better exception handling
  var parsedParam ;
 // if (parsedQuestion.ItemType= "Problem") {
    parsedParam= parsedQuestion.Parameters;
  // } 
  // else{
  //   parsedParam= parsedQuestion.Parameters
  // }
  
  try {
    var qParam = {};
    parsedParam.forEach(function (_p) {
      switch (_p.value.type) {
        case "random.number":
          var from = Number(_p.value.from);
          var to = Number(_p.value.to);
          var numberType = (_p.value.numberType);
          switch (numberType) {
            case "Int": qParam[_p.parameter] = Math.floor(Math.random() * to) + from;
              break;
            case "Dec": qParam[_p.parameter] = parseFloat(Math.random()).toFixed(3) * to + from;  // to check this
              break;
          }
          break;
        case "random.string":
          var stringType = _p.value.stringType;
          switch (stringType) {
            case "name": qParam[_p.parameter] = faker.name.findName();
              break;
            case "city": qParam[_p.parameter] = faker.address.city();
              break;
            // u can add other fake domain of faker.js
            default: qParam[_p.parameter] = "";
          }
          break;
        case "random.fromlist":
          var mArray = _p.value.list;
          var index = Math.floor(Math.random() * mArray.length);
          qParam[_p.parameter] = mArray[index];
          break;
        case "file":
        var filename = _p.value.filename+'.csv';
        //for testing
        // to convert this in php and link on server the user
        // var userID='123Omar';
        // var excerciseSetID='1';
        // var questionID='2232';

         //add unique name and relative path
        // var uid=userID+'-'+excerciseSetID+'-'+questionID
        // filename=uid+'-'+filename
        // filename='../../../data/'+userID+'/'+filename;
        // filename='data/'+filename;
        // var filename=path.resolve(__dirname,  filename)
        // console.log('filename : ' + filename)
        //check performance for concurent users reading the file
        

        
        
        //var lines = fs.readFileSync(filename).toString().split("\n");
        var textFromFileLoaded='';
          for (let index = 0; index < CSVFiles.length; index++) {
             element = CSVFiles[index];
             if (element.fileName==filename){
               textFromFileLoaded = element.fileContent; 
              }
          }   
          
            
            var lines =textFromFileLoaded.split("\n");
            var randomline = lines[Math.floor(Math.random() * lines.length)];
            var fieldsNames = lines[0].split(",");
            var fields = randomline.split(",");
  
            var obj = {}
            for (var i = 0; i < fields.length; i++) {
             // var paramName=_p.parameter + "_" + fieldsNames[i] ;
             var paramName= fieldsNames[i] ;
               
             qParam[paramName.trim()]= fields[i].trim();
            }
        
        
        // var filename = _p.value.filename+'.csv';
        //   //for testing
        //   // to convert this in php and link on server the user
        //   var userID='123Omar';
        //   var excerciseSetID='1';
        //   var questionID='2232';

        //    //add unique name and relative path
        //   var uid=userID+'-'+excerciseSetID+'-'+questionID
        //   // filename=uid+'-'+filename
        //   // filename='../../../data/'+userID+'/'+filename;
        //    filename='data/'+filename;
         
        //   var filename=path.resolve(__dirname,  filename)

        //   //check performance for concurent users reading the file
          
        //   var lines = fs.readFileSync(filename).toString().split("\n");
        //   var randomline = lines[Math.floor(Math.random() * lines.length)];
        //   var fieldsNames = lines[0].split(",");
        //   var fields = randomline.split(",");

        //   var obj = {}
        //   for (var i = 0; i < fields.length; i++) {
        //     var paramName=_p.parameter + "_" + fieldsNames[i] ;
        //     qParam[paramName.trim()]= fields[i].trim();
        //   }
          //handle errors of reading file and finding parameters having same name as others.
          break;
        case "joinstring":
          var stringlist = _p.value.list;
          qParam[_p.parameter] = stringlist.join('');

          // stringlist.forEach(function (elem, index) {
          //   qParam[_p.parameter] = qParam[_p.parameter] + qParam[elem]; // to be adjusted it add the number even if strings
          // });
          break;
        case "math":
          var mathExpression = (_p.value.mathExpression);
          qParam[_p.parameter] = math.eval(mathExpression, qParam).toFixed(3)   // using mathjs
          break;
        default:
          qParam[_p.parameter] = "...error...";
      }
    });
  }
  catch (err) {
    console.log('error in evaluation of paramaters: ' + err, 'error')
  }
  return qParam;
}

function substituteEvaluatedParameters(parsedQuestion, qParam) {
  // replace apply json object variables to the template and get the output
  delete parsedQuestion.Parameters
 // var tags = ['<%', '%>']
  var templatetxt=JSON.stringify(parsedQuestion)
 // Mustache.parse(templatetxt,tags)
  var res = Mustache.render(templatetxt, qParam);
  if (res) {
    parsedQuestion = JSON.parse(res);
  } else {
    console.log("error in template engine", 'error')
  }
  return parsedQuestion
}


module.exports = convertToStatic_E