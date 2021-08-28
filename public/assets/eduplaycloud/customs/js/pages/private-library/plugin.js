//For plug in select.
function changePluginType(id,value){
    var count;
    var plugin;
    var option = $('#' + id).attr('data-part');
    var mode = $('#'+id).attr('data-mode');
    

    // console.log(id);
    // console.log(mode);
    //Past text to textarea.
    if(option == 'question'){

        count = $('#' + id).attr('data-que_section_count');
        //Fetch pugin value.
        plugin = getPluginValue(id,value,count,option,mode);

        if(mode == 'edit'){
            $('#edit_que_description_'+count+'').val('');
            $('#edit_que_description_'+count+'').val(plugin);
        } else {
            $('#que_description_'+count+'').val('');
            $('#que_description_'+count+'').val(plugin);
        }
    
    } else if(option == 'answer'){

        count = $('#'+id).attr('data-answer_id');
        optionsection = $('#'+id).attr('data-ans_section_count');

        //Fetch pugin value.
        plugin = getPluginValue(id,value,count,option,optionsection,mode);

        if(mode == 'edit'){
            $('#edit_ans_option_'+count+'_description_'+optionsection+'').val('');
            $('#edit_ans_option_'+count+'_description_'+optionsection+'').val(plugin);
        } else {
            $('#ans_option_'+count+'_description_'+optionsection+'').val('');
            $('#ans_option_'+count+'_description_'+optionsection+'').val(plugin);
        }

    } else {
        count = $('#'+id).attr('data-hint_id');
        optionsection = $('#'+id).attr('data-hint_section_count');

        //Fetch pugin value.
        plugin = getPluginValue(id,value,count,option,optionsection,mode);

        if(mode == 'edit'){
            $('#edit_hint_'+count+'_description_'+optionsection+'').val('');
            $('#edit_hint_'+count+'_description_'+optionsection+'').val(plugin);

        } else {
            $('#hint_'+count+'_description_'+optionsection+'').val('');
            $('#hint_'+count+'_description_'+optionsection+'').val(plugin);
        }

    }

    if(mode == 'edit'){
        runQuestionRenderAndDisplay2();
    } else {
        runQuestionRenderAndDisplay();   
    }
}


var src_image = site_url+"/assets/images/eduplay_logo.png";
var src_audio = site_url+"/test.mp3";

//For fetch plug in value.
function getPluginValue(id,plugin,count,option,optionsection = null,mode){
    $('.image_'+id).remove();
    $('.audio_'+id).remove();

    switch (plugin) { 
        case 'clock':
            return "\\Plugin_clock \\Attr {display:'inline' caption:'(1)'} {03:34:40}_";
            break;
        case 'chess': 
            return "\\Plugin_chess \\Attr {display:'inline' caption:'(1)'}{ r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R }_";
            break;
        case 'video': 
            return "\\Plugin_video{ https://www.youtube.com/embed/YFD2PPAqNbw }_";
            break;		
        case 'audio':
            // $('#'+id).after('<a href="#" class="image_'+id+'" id="image_'+id+'" data-type="'+plugin+'" data-question_count="'+count+'" onclick="showAsset(this.id);">Replace audio</a>');
            $('#'+id).after('<a href="javaScript:void(0);" class="replce-vlue audio_'+id+'" id="audio_'+id+'" data-mode="'+mode+'" data-option="'+option+'" data-optionsection="'+optionsection+'" data-type="'+plugin+'" data-question_count="'+count+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets">'+message['choose_audio']+'</a>');
            return "\\Plugin_audio \\Attr{ display:'inline' caption:'audio 1'} {  src:"+src_audio+"}_";
            break;
        case 'image':
            $('#'+id).after('<a href="javaScript:void(0);" class="replce-vlue image_'+id+'" id="image_'+id+'" data-mode="'+mode+'" data-option="'+option+'" data-optionsection="'+optionsection+'" data-type="'+plugin+'" data-question_count="'+count+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets">'+message['choose_image']+'</a>');
            return "\\Plugin_image \\Attr {display:'block' caption:'(fig.1)' repeat:'1'}  { src:"+src_image+"}_";
            break;
        case 'table': 
            return "\\Plugin_table \\Attr {class:'normalBTable' caption:'(table 1)'} {"+
                "Head1 | Head2 | Head3 ;"+
                "Row1  | value | value ;"+
                "Row2  | value | value ;"+
                "}_";
            break;
        case 'textbox': 
            return "\\Plugin_textBox \\Attr {display:'inline' caption:'result: ' } {dffdfs}_";
            break;
        case 'flowchart': 
            return "\\Plugin_flow{ \n"+
                "graph LR \n"+
                "A-->B \n"+
                "}_";
            break;
        case 'math': 
            return "\\Plugin_math\\Attr{caption:'(1)'}{\\begin{matrix}a&b\\\\c&d\\end{matrix}+\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}+\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}}_";
            // return "\\Plugin_math \\Attr {caption:'(1)'} { \n" +
            //     "\\begin{matrix} a & b &#92;&#92; c \n"+
            //     "& d \\end{matrix} \n"+
            //     " &plus; \n"+
            //     "\\begin{pmatrix} a & b &#92;&#92; c \n"+
            //     "& d \\end{pmatrix}"+
            //     " &plus; \n"+
            //     "\\begin{bmatrix} a & b &#92;&#92; c"+
            //     "& d \\end{bmatrix}"+
            //     "}_";

            break;
        case 'chart': 
            return '\\Plugin_chart\\Attr{height:"250"}{{"type":"bar","data":{"labels":["Red","Blue","Yellow","Green","Purple","Orange"],"datasets":[{"label":"# of Votes","data":[12,19,3,5,2,3],"backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],"borderColor":["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],"borderWidth":1}]},"options":{"scales":{"yAxes":[{"ticks":{"beginAtZero":true}}]}}}}_'
        //   return '&#92;Plugin_chart&#92;Attr{height:&#39;250&#39;}{{"type":"bar","data":{"labels":["Red","Blue","Yellow","Green","Purple","Orange"],"datasets":[{"label":"# of Votes","data":[12,19,3,5,2,3],"backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],"borderColor":["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],"borderWidth":1}]},"options":{"scales":{"yAxes":[{"ticks":{"beginAtZero":true}}]}}}}_';
            break;
      

        default:
           return "";
    }

}

//Display assets modal.
function showAsset(id) {
    var pluginType = $('#'+id).attr('data-type');
    var plugintextBox =  $('#'+id).attr('data-option');
    var optionCount = $('#'+id).attr('data-question_count');
    var optionsSection = $('#'+id).attr('data-optionsection');
    var mode = $('#'+id).attr('data-mode');

    //Set input in dynamic value.
    $('#plugin_assets #section_part').val(plugintextBox);
    $('#plugin_assets #option_count').val(optionCount);
    $('#plugin_assets #option_section_count').val(optionsSection);
    $('#plugin_assets #mode').val(mode);

    //Section show by selected.
    $('.inner-mdl-editr').hide();
    $('#'+pluginType).show();
}

//Replace IMAGE,Audio path.
function selectReplacePluginValue(element){
    var optionCount = $('#plugin_assets #option_count').val();
    var optionsSection = $('#plugin_assets #option_section_count').val();
    var sectionPart = $('#plugin_assets #section_part').val();
    var mode = $('#plugin_assets #mode').val();

    var newSrc = $(element).attr('data-src');
    var type = $(element).attr('data-type');
    var filename = $(element).attr('data-filename');
    var pluginValue;
    
    if(type == 'image'){
        pluginValue = "\\Plugin_image \\Attr {display:'block' caption:'"+filename+"' repeat:'1'}  { src:"+newSrc+"}_";
    } else if (type == 'audio'){
        pluginValue ="\\Plugin_audio \\Attr{ display:'inline' caption:'"+filename+"'} {  src:"+newSrc+"}_";
    }

    //JSON in question section.
    if(sectionPart == 'question'){

        var selectQuesType;

        //Select type check for edit.
        if(mode == 'edit'){
            selectQuesType = $('#edit_que_section_type_'+optionCount).find(":selected").val();
        } else {
            selectQuesType = $('#que_section_type_'+optionCount).find(":selected").val();
        }

        
        //Change image for question
        if(selectQuesType == 'image'){
            //Change image with Edit and create mode.
            if(mode == 'edit'){
                $('#edit_que_description_'+optionCount+'').val(newSrc);    
                $('#que_image_'+optionCount+'').attr('data-sectionvalue',newSrc);
                $('#que_image_'+optionCount+'').attr('data-sectioncaption',filename);
                
                $('#filename_'+optionCount+'').text(filename);
            } else {
                $('#que_image_'+optionCount+'').val(newSrc);
                $('#filename_'+optionCount+'').text(filename);
            }

        } else if(selectQuesType == 'audio'){

            //Change image with Edit and create mode.
            if(mode == 'edit'){
                $('#edit_audio_que_description_'+optionCount+'').val(newSrc);    
                $('#que_audio_'+optionCount+'').attr('data-sectionvalue',newSrc);
                $('#que_audio_'+optionCount+'').attr('data-sectioncaption',filename);

                $('#audio_filename_'+optionCount+'').text(filename);
            } else {
                $('#que_audio_'+optionCount+'').val(newSrc);
                $('#audio_filename_'+optionCount+'').text(filename);
            }

        } else{

            //Change image with Edit and create mode for question part.
            if(mode == 'edit'){
                $('#edit_que_description_'+optionCount).val();
                $('#edit_que_description_'+optionCount+'').val(pluginValue);
            } else {       
                $('#que_description_'+optionCount+'').val('');
                $('#que_description_'+optionCount+'').val(pluginValue);
            }
        }

    //JSON in answer section.
    } else if(sectionPart == 'answer'){

        var selectAnsType;
        
        //Select type as per mode.
        if(mode == 'edit'){
            selectAnsType =  $('#edit_ans_option_'+optionCount+'_section_type_'+optionsSection).find(":selected").val();
        } else {
            selectAnsType =  $('#ans_option_'+optionCount+'_section_type_'+optionsSection+'').find(":selected").val();
        }

        //Change image for Answer
        if(selectAnsType == 'image'){

            
            //Replace image with selected image.
            if(mode == 'edit'){
                $('#edit_ans_option_'+optionCount+'_image_'+optionsSection).attr('data-sectionvalue',newSrc);
                $('#edit_ans_option_'+optionCount+'_image_'+optionsSection).attr('data-sectioncaption',filename);
                $('#ans_filename_'+optionCount+'_image_'+optionsSection).text(filename);
            } else {
                $('#ans_option_'+optionCount+'_image_'+optionsSection).val(newSrc);
                $('#ans_filename_'+optionCount+'_image_'+optionsSection).text(filename);
            }
            
        } else if(selectAnsType == 'audio'){
            
             //Replace image with selected image.
             if(mode == 'edit'){
                $('#edit_ans_option_'+optionCount+'_audio_'+optionsSection).attr('data-sectionvalue',newSrc);
                $('#edit_ans_option_'+optionCount+'_audio_'+optionsSection).attr('data-sectioncaption',filename);

                $('#ans_filename_'+optionCount+'_audio_'+optionsSection).text(filename);
            } else {
                $('#ans_option_'+optionCount+'_audio_'+optionsSection).val(newSrc);
                $('#ans_filename_'+optionCount+'_audio_'+optionsSection).text(filename);
            }
            
            
        } else {
         
             //Change image with Edit and create mode for answer part.
             if(mode == 'edit'){ 
                 $('#edit_ans_option_'+optionCount+'_description_'+optionsSection+'').val('');
                 $('#edit_ans_option_'+optionCount+'_description_'+optionsSection+'').val(pluginValue);
             } else {
                 $('#ans_option_'+optionCount+'_description_'+optionsSection+'').val('');
                 $('#ans_option_'+optionCount+'_description_'+optionsSection+'').val(pluginValue);

             }
         }
         

    //JSON in hint section.    
    } else if(sectionPart == 'hint') {
        var selecthintType;
        //As per mode select value fetch.
        if(mode == 'edit'){
            selecthintType =  $('#edit_hint_'+optionCount+'_section_type_'+optionsSection+'').find(":selected").val();
        } else {
            selecthintType =  $('#hint_'+optionCount+'_section_type_'+optionsSection+'').find(":selected").val();
        }

        //Change image for Hint
        if(selecthintType == 'image'){
            
            if(mode == 'edit'){
                // console.log('#edit_hint_'+optionCount+'_image_'+optionsSection);
                
                $('#edit_hint_'+optionCount+'_image_'+optionsSection).attr('data-sectionvalue',null);
                $('#edit_hint_'+optionCount+'_image_'+optionsSection).attr('data-sectionvalue',newSrc);
                $('#edit_hint_'+optionCount+'_image_'+optionsSection).attr('data-sectioncaption',null);
                $('#edit_hint_'+optionCount+'_image_'+optionsSection).attr('data-sectioncaption',filename);
                $('#hint_filename_'+optionCount+'_image_'+optionsSection).text(filename);
            } else {
                $('#hint_'+optionCount+'_image_'+optionsSection).val(newSrc);
                $('#hint_filename_'+optionCount+'_image_'+optionsSection).text(filename);
            }

         } else if(selecthintType == 'audio'){

            if(mode == 'edit'){
                $('#edit_hint_'+optionCount+'_audio_'+optionsSection).attr('data-sectionvalue',newSrc);
                $('#edit_hint_'+optionCount+'_audio_'+optionsSection).attr('data-sectioncaption',filename);
                $('#hint_filename_'+optionCount+'_audio_'+optionsSection).text(filename);
            } else {
                $('#hint_'+optionCount+'_audio_'+optionsSection).val(newSrc);
                $('#hint_filename_'+optionCount+'_audio_'+optionsSection).text(filename);
            }
            

         } else {
            // console.log('here');
            //Change image with Edit and create mode for answer part.
            if(mode == 'edit'){ 
                $('#edit_hint_'+optionCount+'_description_'+optionsSection+'').val('');
                $('#edit_hint_'+optionCount+'_description_'+optionsSection+'').val(pluginValue);
            } else {
                $('#hint_'+optionCount+'_description_'+optionsSection+'').val('');
                $('#hint_'+optionCount+'_description_'+optionsSection+'').val(pluginValue);
            }
         }

    } else {
        
        if(mode == 'edit'){
            $('#edit_parameter_file').val(newSrc);
            $('#edit_parameter_file').attr('data-name',filename);
            $('#edit_param_1').text(filename);
            setTimeout(function(){ 
                editCsvFileRender(); 
                $('#edit-csv-div').show();
            }, 1000);

        } else {
            $('#parameter_file').val(newSrc);
            $('#parameter_file').attr('data-name',filename);
            $('#perameter_1').text(filename);
            csvFileRender();
        }
    }

    if(mode == 'edit'){
        runQuestionRenderAndDisplay2();
    } else {
        runQuestionRenderAndDisplay();
    }
}
