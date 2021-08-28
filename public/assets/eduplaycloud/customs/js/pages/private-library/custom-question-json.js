
//======================================================[  New Code Implimentation For Render Question ]================================================================//
$(document).ready(function(){

    $(document).on('blur','textarea',function(){
        runQuestionRenderAndDisplay();

        // console.log(finalcsvArray);
    });
    // $(document).on('click','#priview_btn',function(){
    //     runQuestionRenderAndDisplay();
    // });
});


function runQuestionRenderAndDisplay(){
    var json_detail = mainFormat();
        
    // console.log(json_detail)
    $('.question-div').each(function(key){
        //Main question each.
        var questionMain = QuestionMain();

         //question section each.        
         $('.question_'+(key+1)+'_section').each(function(qusSubkey){
            
            var questionSectionType = $('.question_'+(key+1)+'_section_'+(qusSubkey+1)+'_type option:selected').val();
            var questionElement = $(this);
            var questionsection = dynamicSection(questionSectionType,questionElement,'question');
            if (questionsection != undefined) {
                questionMain.Question_Description.Sections.push(questionsection);
            }
        });

        //Question's answare each.
        $('.question_'+(key+1)+'_answer_div').each(function(akey){ 
            var subkey = $(this).data('option_count');
            var answareMain = AnswareSection();
            //answare sections each.
            $('.question_'+(key+1)+'_answer_'+(subkey)+'_section').each(function(askey){
                var ansSecKey = $(this).data('ans_section_count');
                var answerSectionType = $('.question_'+(key+1)+'_answer_'+(subkey)+'_section_'+(ansSecKey)+'_type select option:selected').val();
                var answerElement = $(this);
                var answersection = dynamicSection(answerSectionType,answerElement,'answer');
                //Is correct check box checked or not.
                if ($('#is_correct_'+(subkey)).is(":checked")) {
                    answareMain.Attributes.IsCorrect = true;  
                } else {
                    answareMain.Attributes.IsCorrect = false;
                }
                if (answersection != undefined) {
                    answareMain.Sections.push(answersection);
                }
            });
            questionMain.Answers.Choices.push(answareMain);
        });
        
        //Question's Hints each.
        $('.question_'+(key+1)+'_hint_div').each(function(hsubkey){
            var hintMain = hintsSection();
            var hintsubkey = $(this).data('option_count');
            //Hint sections each.
            $('.question_'+(key+1)+'_hint_'+(hintsubkey)+'_section').each(function(hskey){
                var hintsectionkey = $(this).data('hint_section_count');
                var hintsectionType = $('.question_'+(key+1)+'_hint_'+(hintsubkey)+'_section_'+(hintsectionkey)+'_type  option:selected').val(); 
                var hintElement = $(this);
                var hintsection = dynamicSection(hintsectionType,hintElement,'hint');
                if (hintsection != undefined) {
                    hintMain.Sections.push(hintsection);
                }
            });
            questionMain.Hints.HintList.push(hintMain); 
        });       

        json_detail.Questions.push(questionMain);
    });

    var convertedJsonString = JSON.stringify(json_detail);
    // STRING
    //  console.log(convertedJsonString);
    // console.log(jQuery.parseJSON(convertedJsonString));
    var jsonQuestion = [jQuery.parseJSON(convertedJsonString)];
    
    $("#hidden_json_details").val(convertedJsonString);
    pRunQuestionPreview(jsonQuestion);
    reInitiate();
    
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

//Create Dynamic section from here.
function dynamicSection(sectionType,element,type){
    var dynamicSectionObj = '';
    if(sectionType == 'plugin'){
        // var pluginString = element.val().trim();
        var pluginString =  parameterValueFetchAndReplace(element).trim();
        dynamicSectionObj = pluginSplits(pluginString);
    } else if(sectionType == 'image'){
        //Call image preview section.
        var id = element.attr('id');
        dynamicSectionObj = imagePrivew(id);
    } else if(sectionType == 'video'){
        //Call video preview section.
        var id = element.attr('id');
        dynamicSectionObj = videoPrivew(id);
    } else if(sectionType == 'audio'){
        //Call video preview section.
        var id = element.attr('id');
        dynamicSectionObj = audioPrivew(id);

    } else {
        dynamicSectionObj = sectionFormat();                   
        dynamicSectionObj.SectionType = sectionType;
        dynamicSectionObj.Value = parameterValueFetchAndReplace(element);
    }
    if (dynamicSectionObj != undefined) {
        if(sectionType == 'Plugin'){
            dynamicSectionObj.Attributes.sectiontype = sectionType; 
            dynamicSectionObj.Attributes.sectionvalue = element.val();
        }
        return dynamicSectionObj;
    }
}


//Image display and set attirbute.
function imagePrivew(id){
   
    // console.log(id);
    var imageSection = sectionFormat();
    var fileInput = $('#'+id).val(); 
    imageSection.Attributes.display = "block";
    imageSection.Attributes.repeat = "1";              
    imageSection.Value = ' ';
    imageSection.SectionType = 'Plugin';
    imageSection.Plugin = 'image';
    imageSection.Attributes.caption = $('.'+id).text();
    imageSection.Value = 'src:' + fileInput;
    return imageSection;
}

// Image display and set attirbute.
function videoPrivew(id){
    var fileUrl = $('#'+id).val();
    if (validateYouTubeUrl(fileUrl) == true)  {
        var videoSection = sectionFormat();                  
        videoSection.SectionType = 'Plugin';
        videoSection.Plugin = 'video';   
        if(fileUrl !== undefined){   
            videoSection.Value = fileUrl;
        }

    } else {
        var videoSection = sectionFormat();
            videoSection.Value = fileUrl;
    }
    return videoSection;
}

// Audio display and set attirbute.
function audioPrivew(id){
    var audioSection = sectionFormat(); 
    var fileInput = $('#'+id).val();
    audioSection.Attributes.display = "block";
    audioSection.Value = ' ';   
    audioSection.SectionType = 'Plugin';
    audioSection.Plugin = 'audio';
    var fileUrl = 'src:' + fileInput;
    audioSection.Attributes.caption = $('.'+id).text();              
    audioSection.Value = fileUrl;

    return audioSection;
}

function pluginSplits(pluginString) {
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
            if (finalPlugin == "ContainerTable") {
                finalPluginValue = finalPluginValue.replace(/\n/g, " ");
                finalPluginValue = finalPluginValue.split("t_");
                finalPluginValue = "t_{ "+finalPluginValue[1];
                var cT = ""+finalPluginValue+" }_t";
                finalPluginValue = cT;
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
        var template = document.getElementById('question_preview_template').innerHTML;
        var output = Mustache.render(template, Q);
        return output;
}

function pRunQuestionPreview(jsonQuestion) {
    
    var data = jsonQuestion;
    
    var previewFrame = document.getElementById('question_preview');
    
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
    json_detail.Attributes = '';
    json_detail.Parameters = new Array();
    perameterType.type = "file";
    perameterType.filename = "";
    perameterType.filepath = "";


    // Parameter File Name
    // var fileInput = document.getElementById('parameter_file');
    var fileInput = $('#parameter_file').val();
    
    // if (fileInput != undefined && fileInput.files[0] != undefined && fileInput.files[0].name != undefined) {
    //     var fileUrl = fileInput.files[0].name;
    // } else {
    //     var fileUrl = '';
    // }
    
    var fileName;
    var fileUrl;

    if (fileInput != undefined && fileInput  != '') {
        fileName = $('#parameter_file').attr('data-name');
        fileUrl = fileInput;
    } else {
        fileName = '';
        fileUrl = '';
    }
    
    perameterType.filename = fileName;
    perameterType.filepath = fileUrl;
    
    perameter.push({"parameter":"f","value": perameterType });

    json_detail.Parameters = perameter;
    json_detail.Questions =  new Array();
    return json_detail;
}

// Question Section.
function QuestionMain(){
    var question = new Object();
    var attributes = new Object();
    attributes.Difficulty =  $("input[name='difficultylevel']:checked").val();
            attributes.MinTime = $("input[name='min_time']").val();
            attributes.MaxTime = $("input[name='max_time']").val();
            attributes.Tag =  $("input[name='tags']").val();
            attributes.Type = 'Multichoice';

            var description = new Object();
        description.Attributes = '';
        description.Sections = new Array();
        var answare = new Object();

        answare.Attributes = '';
        answare.Choices = new Array();

        var hints = new Object();
        hints.Attributes = '';
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
        // section.Attributes.sectiontype = 'text'; 
        // section.Attributes.sectionvalue = '';
        section.Value = '';
    return section;
}

// Answare Section.
function AnswareSection(){
    var choicesAttr = new Object();
        choicesAttr.Attributes = new Object();
        choicesAttr.Attributes.IsCorrect = '';
        choicesAttr.Sections = new Array();

    return choicesAttr;
}

//Hints
function hintsSection(){
    var HintList = new Object();
        HintList.Attributes = '';
        HintList.Sections = new Array();
    return HintList;
}


//Pramater in rendom value fetch.
function parameterValueFetchAndReplace(element){
       // Parameter File Get
    //    var param = document.getElementById('parameter_file').val();

        if (element.val() != '') {

           var paragraph = element.val();
           var regex = /{{(.*?)}}/g;
           var found = paragraph.match(regex);
        //    console.log(paragraph);
        //    console.log(found);
           var fetchKeyArray = [];
           if(found){
                var replaceStr = paragraph;
                for(i=0; i < found.length ; i++){
                     
                        var outString = found[i].trim();
                        fetchKeyArray.push(outString);
                    }
                        

                    if(fetchKeyArray.length > 0 && found.length > 0){
                        //Seach param object in key.
                        // console.log(finalcsvArray);
                        Object.keys(found).forEach(function(name,aKey){
                            
                            replaceStr = replaceStr.replace(found[aKey], function ($0, $1, $2) // $3, $4... $n for captures
                                {
                                  
                                    replaceKey = fetchKeyArray[aKey].replace(/[\])}[{(]/g, '');
                                    // var replaceKey = fetchKeyArray[aKey].replace("{{","");
                                    // replaceKey = replaceKey.replace("}}","");
                                    replaceKey = replaceKey.trim();
                                    if(replaceKey in finalcsvArray){
                                        return finalcsvArray[replaceKey];
                                    } else {
                                        return found[aKey];
                                    }
                                });
                        });
                    } else {
                        // console.log('else here');
                        replaceStr = paragraph;
                    }

                    // console.log('===============');
                    // console.log(replaceStr);
                    return replaceStr;
            } else {
                return element.val();
            }
           

       } else {            
            return element.val();
       }


}