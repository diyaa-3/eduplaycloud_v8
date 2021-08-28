
  function pRun(jsonDetail,previewFrame,callback) {
   
    var data = jsonDetail;
    if(previewFrame === undefined){
      previewFrame = document.getElementById('preview');
    }
    // var static_parserOutputObj = get through api;
    var static_parserOutputObj = data;

    var static_plugin_parserOutputObj = renderPluginsinObj(static_parserOutputObj);
    var finalObj = static_plugin_parserOutputObj;
    if(callback !== undefined){
      previewFrame.innerHTML = callback(finalObj);
    }else{
      previewFrame.innerHTML = renderToHtml_E(finalObj);
    }
    // Start clock face on page load
    if($('.clock_time').length){
      var timer = $('.clock_time').html();
      if(timer !== undefined){
        var finalTime = parseInt(timer) * 1000;
        beginTimer(finalTime);
      }
    }

  /* var static_plugin_parserOutputObj = renderPluginsinObj(static_parserOutputObj);
  var finalObj = static_plugin_parserOutputObj;
  previewFrame.innerHTML = renderToHtml_E(finalObj);
  // Start clock face on page load
  var timer = $('.clock_time').html();
  if(timer !== undefined){
    var finalTime = parseInt(timer) * 1000;
    beginTimer(finalTime);
  } */
  reInitiate();
}

function pRunExamDetails(json_details_exam) {
  var data = json_details_exam;
  var previewFrame = document.getElementById('previewExamDetails');
  var static_parserOutputObjExamDetail = data;
  var static_plugin_parserOutputObj = renderPluginsinObj(static_parserOutputObjExamDetail);
  var finalObj = static_plugin_parserOutputObj;
  previewFrame.innerHTML = renderToHtml_E(finalObj);
  reInitiate();
}

function pRunExamDetailsEdit(json_details_exam) {
  var data = json_details_exam;
  var previewFrame = document.getElementById('previewExamDetails');
  var static_parserOutputObjExamDetail = data;
  var static_plugin_parserOutputObj = renderPluginsinObj(static_parserOutputObjExamDetail);
  var finalObj = static_plugin_parserOutputObj;
  previewFrame.innerHTML = renderToHtml_E(finalObj);
}

function reInitiate() {
  plugIns.forEach(function (plugIn) {
    if (plugIn.init) {
      eval(plugIn.init);
    };
  })
}


// Model in display question by this rendering method
function pRunModelQuestion(json_details_questions,questionpreviewFrame,callback) {
  var json_question_data = json_details_questions;
  if(questionpreviewFrame === undefined){
    questionpreviewFrame = document.getElementById('model_qestion_preview');
  }

  // var static_parserOutputObj = get through api;
  var static_parserOutputObjModelQuestion = json_question_data;
  var model_question_parserOutputObj = renderPluginsinObj(static_parserOutputObjModelQuestion);
  var questionfinalObj = model_question_parserOutputObj;

  if(callback !== undefined){
    questionpreviewFrame.innerHTML = callback(questionfinalObj);
  }else{
    questionpreviewFrame.innerHTML = renderToHtml_E(questionfinalObj);
  }

}
