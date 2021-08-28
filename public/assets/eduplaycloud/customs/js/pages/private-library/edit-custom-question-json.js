
//======================================================[  New Code Implimentation For Render Question ]================================================================//
$(document).ready(function(){    
    
    
    $("#edit_simple_editor_form textarea").first().focus();
    // setTimeout(() => {
    //     $("#edit_simple_editor_form textarea").first().blur();
    // }, 1000);

    $("#edit_simple_editor_form textarea").next().focus();

    var jsonQuestion = JSON.parse("["+$('#edit_hidden_json_details').val()+"]");
    // var localCsvPath = $('#parameter_file_path').val();
    var localCsvPath = $('#edit_parameter_file').val();
        if (localCsvPath.length > 0 ) {                

            $.ajax({
                type: "GET",
                url: localCsvPath,
                dataType: "text",
                success: function(data) {
                    appendCsvtoTable(data);
                    $('#edit-csv-div').show();
                    runQuestionRenderAndDisplay2();                    
                }
            }); 

                // $.get( localCsvPath, function( openCsv ) {
                //     console.log(openCsv);
                //     appendCsvtoTable(openCsv)       
                // runQuestionRenderAndDisplay2();                    
                // }); 
            }else{              
                
                pRunQuestionPreview(jsonQuestion);  
            }
    
 
    

    $(document).on('blur','textarea',function(){
        runQuestionRenderAndDisplay2();
    });
});


function runQuestionRenderAndDisplay2(){
    // editCsvFileRender(); 
    
    var json_detail = mainFormat();
        // console.log('Function runQuestionRenderAndDisplay2');
    $('.edit-question-div').each(function(key){

        //Main question each.        
        var questionMain = QuestionMain2();
        //question section each.        
        
        $('.edit_question_'+(key+1)+'_section').each(function(qusSubkey){
            
            var sectionType = $('.edit_question_'+(key+1)+'_section_'+(qusSubkey+1)+'_type option:selected').val();
                        
            
            var questionElement = $(this);            
            
            
            var questionsection = dynamicSectionEdit(sectionType,questionElement);
            
            var sectionValue = $(this).val().trim();
            
            if(questionsection != undefined) {
                if(questionsection.Attributes == null) {
                    questionsection.Attributes = new Object();
                }

                // if(sectionType == 'plugins'){
                //     questionsection.Attributes.sectiontype = sectionType;
                //     questionsection.Attributes.sectionvalue = sectionValue;
                // }
                questionMain.Question_Description.Sections.push(questionsection);
            }
            
        });

        //Question's answare each.
        $('.edit_question_'+(key+1)+'_answer_div').each(function(akey){
            var subkey = $(this).data('option_count');
            var answareMain = AnswareSection();
            
            //answare sections each.
            $('.edit_question_'+(key+1)+'_answer_'+(subkey)+'_section').each(function(ansSecKey){
                var ansSecKey = $(this).data('ans_section_count');
                var sectionType = $('.edit_question_'+(key+1)+'_answer_'+(subkey)+'_section_'+(ansSecKey)+'_type option:selected').val();
                var answerElement = $(this);
                var ansId = $('#ans_edit_question_'+(key+1)+'_answer_'+(subkey)+'_section_'+(ansSecKey)+'_type').val();
                var answersection = dynamicSectionEdit(sectionType,answerElement);
                
                //Is correct check box checked or not.
                if ($('#edit_is_correct_'+(subkey)).is(":checked")) {
                    answareMain.Attributes.IsCorrect = true;  
                } else {
                    answareMain.Attributes.IsCorrect = false;
                }
                answareMain.Attributes.id = ansId;
                answareMain.Sections.id = ansId;
                if(answersection != undefined) {
                    answareMain.Sections.push(answersection);
                }
            });
            questionMain.Answers.Choices.push(answareMain);
        });
        
        //Question's Hints each.
        $('.edit_question_'+(key+1)+'_hint_div').each(function(hsubkey){
            
            var hintMain = hintsSection();
            var hintsubkey = $(this).data('option_count');
            //Hint sections each.
            
            $('.edit_question_'+(key+1)+'_hint_'+(hintsubkey)+'_section').each(function(hskey){
                
                // console.log('.edit_question_'+(key+1)+'_hint_'+(hintsubkey)+'_section');
                var hintsectionkey = $(this).data('hint_section_count');
                var sectionType = $('.edit_question_'+(key+1)+'_hint_'+(hintsubkey)+'_section_'+(hintsectionkey)+'_type  option:selected').val(); 
                
                var hintElement = $(this);

                var hintsection = dynamicSectionEdit(sectionType,hintElement);
                if(hintsection != undefined) {
                    hintMain.Sections.push(hintsection);
                }
            });
            questionMain.Hints.HintList.push(hintMain);
        });
        
        json_detail.Questions.push(questionMain);
    });

    
    var convertedJsonString = JSON.stringify(json_detail);
    // STRING

    
    // console.log(jQuery.parseJSON(convertedJsonString));
    
    var jsonQuestion = [jQuery.parseJSON(convertedJsonString)];
    $("#edit_hidden_json_details").val("");
    $("#edit_hidden_json_details").val(convertedJsonString);

    pRunQuestionPreview(jsonQuestion);
    reInitiate();
    
}


//Create Dynamic section from here.

function dynamicSectionEdit(sectionType,element){
    var dynamicSectionObj = null;
    if(sectionType == 'plugins' || sectionType == 'plugin'){
        // var pluginString = element.val().trim();
        var pluginString =  parameterValueFetchAndReplace(element).trim();
        dynamicSectionObj = editPluginSplits(pluginString);
        
    } else if(sectionType == 'image'){
        //Call image preview section.
        var id = element.attr('id');
        dynamicSectionObj = imagePrivewEdit(id,element);
    } else if(sectionType == 'video'){

        //Call video preview section.
        var id = element.attr('id');
        dynamicSectionObj = videoPrivewEdit(id);
        if (dynamicSectionObj == undefined) {
            var dynamicSectionObj = null;
        }

    } else if(sectionType == 'audio'){
        //Call video preview section.
        var id = element.attr('id');
        dynamicSectionObj = audioPrivewEdit(id,element);
    } else {
        dynamicSectionObj = sectionFormat();
        dynamicSectionObj.SectionType = sectionType;
        dynamicSectionObj.Value = dynamicSectionObj.Value = parameterValueFetchAndReplace(element);
    }

    if (dynamicSectionObj != undefined) {
        // console.log(dynamicSectionObj);
        if(dynamicSectionObj.Attributes == null) {
            dynamicSectionObj.Attributes = new Object();
        }
        if(sectionType == 'plugins'){   
            dynamicSectionObj.Attributes.sectiontype = sectionType; 
            dynamicSectionObj.Attributes.sectionvalue = element.val();
        }
        return dynamicSectionObj;
    }
    
}


//Image display and set attirbute.
function imagePrivewEdit(id,element){

    
    var imageSection = sectionFormat();
    
    var sectionValue = $('#'+id).attr('data-sectionvalue');
    var sectioncaption =  $('#'+id).attr('data-sectioncaption');
    
    
    imageSection.Attributes.display = "block";
    imageSection.Attributes.repeat = "1";              
    imageSection.Value = ' ';
    imageSection.SectionType = 'Plugin';
    imageSection.Plugin = 'image';
    imageSection.Attributes.caption = sectioncaption;
    
    var string = sectionValue;
    var findtext = "src:";
    
    if(string.indexOf(findtext) != -1){
        imageSection.Value = sectionValue;
    } else {
        imageSection.Value = 'src:'+ sectionValue;
    }

    return imageSection;
}

// Check for valid youtube url
function validateYouTubeUrl(url)
{
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            // Do anything for being valid
            // if need to change the url to embed url then use below line
            return true;
        }
        else {
            // Do anything for not being valid
            return false;
        }
    }
}

// Image display and set attirbute.
function videoPrivewEdit(id){
    var fileUrl = $('#'+id).val();
    // console.log(validateYouTubeUrl(fileUrl));
    if (validateYouTubeUrl(fileUrl) == true)  {
        
        var videoSection = sectionFormat();                  
        videoSection.SectionType = 'Plugin';
        videoSection.Plugin = 'video';   
        if(fileUrl !== undefined){  
            videoSection.Value = fileUrl;
        }else if(document.getElementById(id).value != ''){
            videoSection.SectionType = 'Plugin';
            videoSection.Plugin = 'video';   
            videoSection.Value = document.getElementById(id).val();
        }

    } else {
        var videoSection = sectionFormat();
            videoSection.Value = fileUrl;
    }

    return videoSection;
}

// Audio display and set attirbute.
function audioPrivewEdit(id,element){
  
    var audioSection = sectionFormat(); 
    var sectionValue = $('#'+id).attr('data-sectionvalue');
    var sectioncaption =  $('#'+id).attr('data-sectioncaption');

    audioSection.Attributes.display = "block";
    audioSection.Value = ' ';
    audioSection.SectionType = 'Plugin';
    audioSection.Plugin = 'audio';
    audioSection.Attributes.caption = sectioncaption;

    var string = sectionValue;
    var findtext = "src:";

    if(string.indexOf(findtext) != -1){
        audioSection.Value = sectionValue;
    } else {
        audioSection.Value = 'src:'+ sectionValue;
    }

    return audioSection;
}

function editPluginSplits(pluginString) {
    var pulginJs = sectionFormat();
    var finalAttr = new Object();
    if(pluginString !== ''){
        // --- Split plugins string starts here ---
        var pluginSplit = pluginString.split("\\");
        
        // PLUGIN NAME
        var plugin = pluginSplit[1].trim().split("_");
        var finalPlugin = plugin[1];
        var fPlugin = finalPlugin.split("{");
        if (fPlugin.length > 0) {
            finalPlugin = fPlugin[0];
        }

        // ATTRIBUTES
        var attributesValue = pluginString.split("\\Attr");
        var re = /\s*(}|$)\s*/;
        if (attributesValue.length > 1) {
            var attr = attributesValue[1].trim().split(re);
            var finalAttrArr = attr[0].replace('{','').trim().split("' ");
            // PLUGIN VALUE
            for(var i = 0;i < finalAttrArr.length; i++){
                var attri = finalAttrArr[i].split(":");
                // console.log(attri);
                if(attri[1] !== undefined && attri[1] != ''){
                    finalAttr[attri[0].trim()] = attri[1].replace(new RegExp("'", 'g'),'').trim();
                }
            }

            if(attr.length <= 5){
                var finalPluginValue = attr[2].replace('{','').trim();
            }else{
                attr[2] = attr[2].replace('{','').trim();
                var finalPluginValue = attr.slice(2,attr.length-2).join('');
            }
        } else {
        
            var PluginValue = pluginString.replace("\\Plugin_"+finalPlugin,"").trim().replace('{','').trim();
            var PluginValue2 = PluginValue.split("}_");
            var finalPluginValue = PluginValue2[0];
        }
        pulginJs.SectionType = "Plugin";
        pulginJs.Plugin = finalPlugin;
    }else{
        var finalPlugin = 'text';
        var finalPluginValue = ' ';
    }
    // --- Split plugins string ends here ----
    pulginJs.Attributes = finalAttr;
    pulginJs.Attributes.sectiontype = 'plugin'; 
    pulginJs.Attributes.sectionvalue = pluginString;
    pulginJs.Value = finalPluginValue;
    return pulginJs;
}

function reInitiate() {
    
    plugIns.forEach(function (plugIn) {

      if (plugIn.init) {
        eval(plugIn.init);
      };
    })
  }


function renderToHtml_E(Q) {
        var template = document.getElementById('edit_question_preview_template').innerHTML;
        var output = Mustache.render(template, Q);
        return output;
}

function pRunQuestionPreview(jsonQuestion) {
    // console.log(jsonQuestion);
    var data = jsonQuestion;
    
    var previewFrame = document.getElementById('edit_question_preview');
    
    // var static_parserOutputObj = get through api;
    var static_parserOutputObjExamDetail = data;
    var static_plugin_parserOutputObj = renderPluginsinObj(static_parserOutputObjExamDetail);
    var finalObj = static_plugin_parserOutputObj;
    
    previewFrame.innerHTML = renderToHtml_E(finalObj);  
    
}

//----------Main Question Formate---------//
function mainFormat(){
    var json_detail = new Object();
    var perameter = new Array();
    var perameterType = new Object();

    json_detail.ItemType = "Independant Question";    // can be also a Problem
    json_detail.Attributes = null;
    json_detail.Parameters = new Array();
    perameterType.type = "file";
    
    
    
    if ($('#edit_parameter_file').val() != '') {
         perameterType.filepath = $('#edit_parameter_file').val();
         perameterType.filename = $('#edit_parameter_file').attr('data-name');
    } else {
        perameterType.filename = "";
        perameterType.filepath = "";
    }
 

    perameter.push({"parameter":"f","value": perameterType });

    json_detail.Parameters = perameter;
    json_detail.Questions =  new Array();
    return json_detail;

}

// Question Section.
function QuestionMain2(){
    
    var question = new Object();
    var attributes = new Object();
    attributes.Difficulty =  $("input[name='difficultylevel']:checked").val();
    attributes.MinTime = $("#edit_min_time").val();
    attributes.MaxTime = $("#edit_max_time").val();
    attributes.Tag =  $("#edit_tags").val();
    attributes.Type = 'Multichoice';

    var description = new Object();
    description.Attributes = null;
    description.Sections = new Array();
    var answare = new Object();

    answare.Attributes = null;
    answare.Choices = new Array();

    var hints = new Object();
    hints.Attributes = null;
    hints.HintList = new Array();

    question.question_id = 1;
    question.ItemType = "Question";    
    question.Attributes = attributes;
    question.Question_Description = description;
    question.Answers = answare;
    question.Hints = hints;
    return question;
}

function sectionFormat()
{
    var section = new Object();
        section.SectionType = 'text';
        section.Attributes = new Object();
        section.Value = '';
    return section;
}

// Answare Section.
function AnswareSection(){
    var choicesAttr = new Object();
        choicesAttr.Attributes = new Object();
        choicesAttr.Attributes.IsCorrect = null;
        choicesAttr.Sections = new Array();
        choicesAttr.Sections.id = 0;

    return choicesAttr;
}

//Hints
function hintsSection(){
    var HintList = new Object();
        HintList.Attributes = null;
        HintList.Sections = new Array();
    return HintList;
}


//Pramater in rendom value fetch.
function parameterValueFetchAndReplace(element){
    if (finalcsvArrayEdit) {

        
        var paragraph = element.val();
        var regex = /{{(.*?)}}/g;
        var found = paragraph.match(regex);
        var fetchKeyArray = [];
        
        // console.log(paragraph);

        if(found){

            for(i=0; i < found.length ; i++){
                //var outString = found[i].replace(/[`' '~!@#%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase().trim();
                var outString = found[i].trim();
                fetchKeyArray.push(outString);
             }
             //console.log(fetchKeyArray);
             var replaceStr = paragraph;
             if(fetchKeyArray.length > 0 && found.length > 0){
                 //Seach param object in key.
                    Object.keys(found).forEach(function(name,aKey){
                     
                     replaceStr = replaceStr.replace(found[aKey], function ($0, $1, $2) // $3, $4... $n for captures
                     {
                        replaceKey = fetchKeyArray[aKey].replace(/[\])}[{(]/g, '');
                        //  var replaceKey = fetchKeyArray[aKey].replace("{{","");
                        //  replaceKey = replaceKey.replace("}}","");
                         replaceKey = replaceKey.trim();
                         if(replaceKey in finalcsvArrayEdit){
                             return finalcsvArrayEdit[replaceKey];
                         } else {
                            return found[aKey];
                        }
                     });
                 });
             } else {
                 replaceStr = paragraph;
             }
        //  console.log('===============');
        //  console.log(replaceStr);
             return replaceStr;
        } else {
            return element.val();

        }

    } else {            
         return element.val();
    }


}
