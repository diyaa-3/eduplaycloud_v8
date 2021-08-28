  // This global varible using for parameter value fetch.
  var finalcsvArray=[];
// ----------------- For Question ---------------------
// For Add Section in Question
// var que_count = 1;
function addQueSection(id)
{
    var que_count = parseInt($('#edit_que_ul_list > li').last().attr('data-quecount'));
    que_count += 1;
    var question_id = $('#edit_que_add_section_btn').data("question_id");
    $('#edit_que_ul_list').append(
        '<li class="list_of_exersize" id="edit_que_li_'+que_count+'" data-quecount="'+que_count+'">'+
            '<div class="form-group">'+
                '<div class="row">'+
                    '<div class="col-md-5 col-lg-5 col-xl-3">'+
                        '<div class="df-select">'+
                            '<select class="selectpicker edit_question_'+question_id+'_section_'+que_count+'_type required" name="question['+que_count+'][section_type]" id="edit_que_section_type_'+que_count+'" data-question_id="'+question_id+'" data-que_section_count="'+que_count+'" onchange="changeQueSectionType(this.id, this.value)">'+

                            '</select>'+
                        '</div>'+
                           ' <select style="display:none;" class="dflt_slctpckr" id="edit_que_span_detail_'+que_count+'" data-mode="edit"  data-part="question" data-question_id="'+que_count+'" data-que_section_count="'+que_count+'" onchange="changePluginType(this.id, this.value)">'+
                                '<option value="">'+message['select_plugin']+'</option>'+
                                '<option value="clock"> '+message['clock']+'</option>'+
                                '<option value="chess"> '+message['chess']+'</option>'+
                                '<option value="video"> '+message['video']+'</option>'+
                                '<option value="audio"> '+message['audio']+'</option>'+
                                '<option value="image"> '+message['image']+'</option>'+
                                '<option value="table"> '+message['table']+'</option>'+
                                '<option value="textbox"> '+message['textbox']+'</option>'+
                                '<option value="flowchart">'+message['flowChart']+'</option>'+
                                '<option value="math"> '+message['math']+'</option>'+
                                '<option value="chart">'+message['chart']+'</option>'+
                            '</select>'+
                        '<div class="questn_circl">' + 
                            '<span title="" onclick="showQuePluginList(1)" style="cursor:pointer;display:none;" id="edit_que_plugin_span_detail_'+que_count+'">'+
                                '<i class="fa fa-question-circle-o"></i>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-7 col-lg-7 col-xl-9" id="edit_que_section_type_div_'+que_count+'">'+
                        '<textarea class="form-control edit_question_'+question_id+'_section lang-dir required" name="question['+que_count+'][description]" id="edit_que_description_'+que_count+'" data-question_id="'+question_id+'" placeholder="'+message['description']+'"></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<button type="button" class="close_icon" id="edit_que_clear_btn_'+que_count+'" data-quecount="'+que_count+'" onclick="deleteQueSection(this.id)"></button>'+
        '</li>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);
        $('#edit_que_section_type_'+que_count).append('<option value="'+ind+'">'+item2+'</option>');
    });
    $('#edit_que_section_type_'+que_count).selectpicker('refresh');
    $('#edit_preview_que_div').append('<div id="edit_preview_que_section_'+que_count+'"></div>');
    $('.lang-dir').attr('dir', direction);
}

// This function is used to translate the language variables
function languageTranslates(item) {
    if (item == 'Text') {
        item = message['text'];
    } else if (item == 'Audio') {
        item = message['audio'];
    } else if (item == 'Video') {
        item = message['video'];
    } else if (item == 'Plugins') {
        item = message['plugins'];
    } else if (item == 'Image') {
        item = message['image'];
    }
    return item;
}

// For Change Question Section Type
function changeQueSectionType(id, stype)
{
    var c = $('#'+id).attr('data-que_section_count');
    var question_id = $('#'+id).attr('data-question_id');

    if(stype == 'image')
    {
        $('#edit_que_section_type_div_'+c).html('<div class="pramtr_file">'+
            '<input type="hidden" class="form-control required edit_question_'+question_id+'_section" name="question['+question_id+'][image]" id="que_image_'+c+'" data-question_id="'+c+'" data-sectionvalue="" data-sectioncaption="">'+
            '<span class="custm_btn image_edit_que_span_detail_'+c+'" id="ques_choose_image_'+c+'" data-mode="edit" data-option="question" data-optionsection="" data-type="image" data-question_count="'+c+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true" aria-hidden="true">'+message['choose_image']+'</span>'+
            '<span  class="filenme"  id="filename_'+c+'" aria-hidden="true"></span>'+
            '</div>'+'<label for="que_image_'+c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'video')
    {
        $('#edit_que_section_type_div_'+c).html(
            '<textarea class="form-control lang-dir required videourl txera_vdo edit_question_'+question_id+'_section" name="question['+question_id+'][video]" id="edit_que_video_'+question_id+'" placeholder="Paste embed link here. To generate embed link,1. Open video in youtube 2. Click on share and select embed 3. Copy src link and paste here" onpaste="getQueVideoPreview(this.id)" onkeyup="getQueVideoPreview(this.id)" onchange="getQueVideoPreview(this.id)"></textarea>'+
            '<label for="edit_que_video_'+c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'audio')
    {
        $('#edit_que_section_type_div_'+c).html('<div class="pramtr_file">'+
            '<input type="hidden" class="form-control required edit_question_'+question_id+'_section" name="question['+question_id+'][audio]" id="que_audio_'+c+'" data-sectionvalue=" " data-sectioncaption=" ">'+
            '<span class="custm_btn audio_edit_que_span_detail_'+c+'" id="audio_'+c+'" data-mode="edit" data-option="question" data-optionsection="" data-type="audio" data-question_count="'+c+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true">'+message['choose_audio']+'</span>'+
            '<span class="filenme" id="audio_filename_'+c+'"></span>'+
            '</div>'+'<label for="que_audio_'+c+'" generated="true" class="error"></label>');
    }
    else
    {
        $('#edit_que_section_type_div_'+c).html('<textarea  class="form-control lang-dir edit_question_'+question_id+'_section required" name="question['+question_id+'][description]" id="edit_que_description_'+c+'" placeholder="'+message['description']+'"></textarea>');
    }

    if(stype == 'plugin' || stype == 'plugins') {
        $('#edit_que_plugin_span_detail_'+c+'').css('display','block');
        $('#edit_que_span_detail_'+c+'').css('display','block');
    } else {
        $('#edit_que_plugin_span_detail_'+c+'').css('display','none');
        $('#edit_que_span_detail_'+c+'').css('display','none');

        $('#image_edit_que_span_detail_'+c+'').remove();
        $('#audio_edit_que_span_detail_'+c+'').remove();
    }

    $('#edit_preview_que_section_'+c).html('');
    $('.lang-dir').attr('dir', direction);
    // render question display function.
    runQuestionRenderAndDisplay2();
    
}

function changeSpan(c) {
    $("#que_description_"+c).on('keyup',function() {
        $("#span_detail_"+c).attr('title',$(this).val());
    });
}

// For Delete Question Section
function deleteQueSection(id)
{
    var c = $('#'+id).attr('data-quecount');
    $('#edit_que_li_'+c).remove();
    $('#edit_preview_que_section_'+c).remove();
    runQuestionRenderAndDisplay2();
}

// ----------------- For Answer ---------------------
// Add More Answer Option
function addMoreAnswer(that)
{
    var ans_count = parseInt($('#edit_ans_div > div.ans_option').last().attr('data-anscount'));
    
    ans_count += 1;
    var ans_sec_count = $(that).data('section_count');
    var opt_text = $('p.name_answer').last().text();
    aCharCode = opt_text.charCodeAt(0) + 1;
    var option_name = String.fromCharCode(aCharCode);
    var question_id = $(that).attr('data-question_count');
    $('#edit_ans_div').append(
        '<div class="ans_option edit_question_1_answer_div" id="edit_ans_option_'+ans_count+'" data-option_count="'+ans_count+'" data-anscount="'+ans_count+'">'+
            '<ul class="mrgn-tp-40" id="edit_ans_option_'+ans_count+'_ul_list">'+
                '<li class="list_of_exersize" id="edit_ans_option_'+ans_count+'_li_1" data-ans_sec_count="'+ans_count+'">'+
                    '<div class="form-group">'+
                        '<div class="row">'+
                            '<div class="col-md-5 col-lg-5 col-xl-4">'+
                                '<div class="answer_pdng rmv_btn_cls right_ans">'+
                                    '<button type="button" class="close_icon" id="edit_ans_option_clear_btn_'+ans_count+'" data-option_count="'+ans_count+'" onclick="deleteAnsOption(this.id)"></button>'+
                                    '<div class="text_wt_icon">'+
                                        '<p class="name_answer" id="edit_ans_option_'+ans_count+'_text">'+option_name+'</p>'+
                                    '</div>'+
                                    '<div class="df-select">'+
                                        '<select onclick="showQuePluginList(1)" class="selectpicker edit_question_'+question_id+'_answer_'+ans_count+'_section_1_type required" name="answer[op_'+ans_count+'][1][section_type]" id="edit_ans_option_'+ans_count+'_section_type_1" data-question_count="'+question_id+'" data-option_count="'+ans_count+'" data-ans_section_count="1" data-ques_ans_section_count="1" onchange="changeAnsSectionType(this.id, this.value)">'+

                                        '</select>'+
                                    '</div>'+
                                    '<select style="display:none;" class="dflt_slctpckr" id="edit_ans_'+ans_count+'_span_detail_'+ans_sec_count+'" data-mode="edit"  data-part="answer" data-answer_id="'+ans_count+'" data-ans_section_count="'+ans_sec_count+'" onchange="changePluginType(this.id, this.value)">'+
                                        '<option value="">'+message['select_plugin']+'</option>'+
                                        '<option value="clock"> '+message['clock']+'</option>'+
                                        '<option value="chess"> '+message['chess']+'</option>'+
                                        '<option value="video"> '+message['video']+'</option>'+
                                        '<option value="audio"> '+message['audio']+'</option>'+
                                        '<option value="image"> '+message['image']+'</option>'+
                                        '<option value="table"> '+message['table']+'</option>'+
                                        '<option value="textbox"> '+message['textbox']+'</option>'+
                                        '<option value="flowchart">'+message['flowChart']+'</option>'+
                                        '<option value="math"> '+message['math']+'</option>'+
                                        '<option value="chart">'+message['chart']+'</option>'+
                                    '</select>'+
                                    '<div class="questn_circl">' +
                                    '<span title="" style="cursor:pointer;display:none;"  onclick="showQuePluginList('+ans_count+')" id="edit_ans_plugin_'+ans_count+'_span_detail_1">'+
                                        '<i class="fa fa-question-circle-o"></i>'+
                                       '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-md-7 col-lg-7 col-xl-8" id="edit_ans_option_'+ans_count+'_section_type_div_1">'+
                                '<textarea class="form-control lang-dir edit_question_1_answer_'+ans_count+'_section required" name="answer[op_'+ans_count+'][1][description]" id="edit_ans_option_'+ans_count+'_description_1" data-question_count="'+question_id+'" data-option_count="'+ans_count+'" data-ans_section_count="1" data-ques_ans_section_count="1" placeholder="'+message['description']+'" ></textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    // '<button type="button" class="close_icon"></button>'+
                '</li>'+
            '</ul>'+
            '<div class="checkbox_action">'+
                '<div class="custom-control custom-checkbox wihtut_bg_ck float-left float_ar_right">'+
                    '<input name="correct" value="'+ans_count+'" id="edit_is_correct_'+ans_count+'" type="radio" class="custom-control-input" data-option_count="'+ans_count+'" onchange="selectCorrectAns(this.id)">'+
                    '<label class="custom-control-label" for="edit_is_correct_'+ans_count+'">'+message['is_correct']+'</label>'+
                '</div>'+
                '<div class="add_section_cls float-right float_ar_left">'+
                    '<a href="javascript:;" class="add_section_btn"  id="edit_ans_option_'+ans_count+'_add_section_btn" data-question_count="'+question_id+'" data-option_count="'+ans_count+'" data-section_count="1" onclick="addMoreAnsOptionSection(this.id)">+ '+message['add_section']+' </a>'+
                '</div>'+
            '</div>'+
            '<div class="clearfix"></div>'+
        '</div>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);
        $('#edit_ans_option_'+ans_count+'_section_type_1').append('<option value="'+ind+'">'+item2+'</option>');
    });
    $('#edit_ans_option_'+ans_count+'_section_type_1').selectpicker('refresh');
    // For Preview
    $('#edit_preview_ans_option_div > ul').append('<li class="" id="edit_preview_option_'+ans_count+'"></li>');
    var option_name = getAnswerOptionName();
    $('#edit_preview_option_'+ans_count).prepend('<p class="option_name" id="edit_preview_option_name_'+ans_count+'">'+option_name+' </p>');
    $('.lang-dir').attr('dir', direction);
}

// For Delete Answer Option
function deleteAnsOption(id)
{
    var opt_c = $('#'+id).attr('data-option_count');
    $('#edit_ans_option_'+opt_c).remove();
    $('#edit_preview_option_'+opt_c).remove();

    var opt_text = 'A';
    var aCharCode = opt_text.charCodeAt(0);
    $('#edit_preview_ans_option_div > ul > li').each(function(i) {
        if(i != 0) {
            aCharCode = opt_text.charCodeAt(0) + 1;
        }
        var option_name = String.fromCharCode(aCharCode);
        if($(this).find('p.option_name').length > 0)
            $(this).find('p.option_name').html(option_name+'.&nbsp;');
        opt_text = option_name;
    });

    var opt_text = 'A';
    var aCharCode = opt_text.charCodeAt(0);
    $('#edit_ans_div > div').each(function(i) {
        if(i != 0) {
            aCharCode = opt_text.charCodeAt(0) + 1;
        }
        var option_name = String.fromCharCode(aCharCode);
        if($(this).find('ul > li').find('div.text_wt_icon').find('p.name_answer').length > 0)
            $(this).find('ul > li').find('div.text_wt_icon').find('p.name_answer').html(option_name+'. ');
        opt_text = option_name;
    });

    $('input[type=radio][name=correct]').each(function(i) {
        i = i+ + +1;
        $(this).val(i);
    });
    if (!$("input[name='correct']").is(":checked")) {
        $('#edit_is_correct_1').prop('checked', true);
        selectCorrectAns('edit_is_correct_1');
    }

    runQuestionRenderAndDisplay2();
}

// For Add More Answer Section Option wise
var ans_section_count = 1;
function addMoreAnsOptionSection(id)
{
    var option_count = $('#'+id).attr('data-option_count');
    var sectionCount = Number($('#'+id).attr('data-section_count')) + 1;
    $('#'+id).attr('data-section_count',sectionCount);
    var questioncount = $('#'+id).attr('data-question_count');
    //var sec_c = $('#'+id).attr('data-ans_section_count');
    //var sectionCount = parseInt($('#'+id).attr('data-ques_ans_section_count'));
    //var ans_section_count = parseInt($('#edit_ans_option_'+option_count+'_ul_list > li').last().attr('data-ans_sec_count'));
    
    //ans_section_count = sec_c;
    ans_section_count = ans_section_count + 1;
    
    $('#edit_ans_option_'+option_count+'_ul_list').append(
        '<li class="list_of_exersize" id="edit_ans_option_'+option_count+'_li_'+sectionCount+'" data-ans_sec_count="'+sectionCount+'">'+
            '<div class="form-group">'+
                '<div class="row">'+
                    '<div class="col-md-5 col-lg-5 col-xl-4">'+
                        '<div class="answer_pdng right_ans">'+
                            '<div class="df-select">'+
                                '<select class="selectpicker edit_question_'+questioncount+'_answer_'+option_count+'_section_'+sectionCount+'_type required" name="answer[op_'+option_count+']['+sectionCount+'][section_type]" id="edit_ans_option_'+option_count+'_section_type_'+sectionCount+'" data-question_count="'+questioncount+'" data-option_count="'+option_count+'" data-ans_section_count="'+sectionCount+'" data-ques_ans_section_count="'+sectionCount+'" onchange="changeAnsSectionType(this.id, this.value)">'+

                                '</select>'+
                            '</div>'+
                            '<select style="display:none;" class="dflt_slctpckr" id="edit_ans_'+option_count+'_span_detail_'+sectionCount+'" data-mode="edit"  data-part="answer" data-answer_id="'+option_count+'" data-ans_section_count="'+sectionCount+'" onchange="changePluginType(this.id, this.value)">'+
                                '<option value="">'+message['select_plugin']+'</option>'+
                                '<option value="clock"> '+message['clock']+'</option>'+
                                '<option value="chess"> '+message['chess']+'</option>'+
                                '<option value="video"> '+message['video']+'</option>'+
                                '<option value="audio"> '+message['audio']+'</option>'+
                                '<option value="image"> '+message['image']+'</option>'+
                                '<option value="table"> '+message['table']+'</option>'+
                                '<option value="textbox"> '+message['textbox']+'</option>'+
                                '<option value="flowchart">'+message['flowChart']+'</option>'+
                                '<option value="math"> '+message['math']+'</option>'+
                                '<option value="chart">'+message['chart']+'</option>'+
                            '</select>'+
                            '<div class="questn_circl">' +
                            '<span title="" style="cursor:pointer;display:none;"  onclick="showQuePluginList('+option_count+')" id="edit_ans_plugin_'+option_count+'_span_detail_'+sectionCount+'">'+
                                '<i class="fa fa-question-circle-o"></i>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-7 col-lg-7 col-xl-8" id="edit_ans_option_'+option_count+'_section_type_div_'+sectionCount+'">'+
                        '<textarea class="form-control lang-dir edit_question_'+questioncount+'_answer_'+option_count+'_section required" name="answer[op_'+option_count+']['+sectionCount+'][description]" id="edit_ans_option_'+option_count+'_description_'+sectionCount+'" data-question_count="'+questioncount+'" data-option_count="'+option_count+'" data-ans_section_count="'+sectionCount+'" data-ques_ans_section_count="'+sectionCount+'" placeholder="'+message['description']+'"></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<button type="button" class="close_icon" id="edit_ans_'+option_count+'_clear_btn_'+sectionCount+'" data-option_count="'+option_count+'" data-ans_section_count="'+sectionCount+'" onclick="deleteAnsSection(this.id)"></button>'+
        '</li>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);
        $('#edit_ans_option_'+option_count+'_section_type_'+sectionCount).append('<option value="'+ind+'">'+item2+'</option>');
    });
    $('#edit_ans_option_'+option_count+'_section_type_'+sectionCount).selectpicker('refresh');
    $('.lang-dir').attr('dir', direction);
}

// For Delete Answer Option Section
function deleteAnsSection(id)
{
    var opt_c = $('#'+id).attr('data-option_count');
    var sec_c = $('#'+id).attr('data-ans_section_count');
    $('#edit_ans_option_'+opt_c+'_li_'+sec_c).remove();
    $('#edit_preview_option_'+opt_c+'_section_'+sec_c).remove();

    runQuestionRenderAndDisplay2();
}

// For CHange Answer Section Type
function changeAnsSectionType(id, stype)
{
    var opt_c = $('#'+id).attr('data-option_count');
    var sec_c = $('#'+id).attr('data-ans_section_count');
    var sectionCount = $('#'+id).attr('data-ques_ans_section_count');
    
    var divEle = $('#edit_ans_option_'+opt_c+'_section_type_div_'+sectionCount);
    var questioncount = $('#'+id).attr('data-question_count');

    if(stype == 'image')
    {
        divEle.html('<div class="pramtr_file">'+
            '<input type="hidden" class="prmtr_sn form-control required edit_question_1_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sec_c+'][image]" id="edit_ans_option_'+opt_c+'_image_'+sec_c+'" data-question_id="1" data-option_count="'+opt_c+'" data-question_count="'+opt_c+'" data-ans_section_count="'+sec_c+'" data-ques_ans_section_count="'+sec_c+'" data-sectionvalue="" data-sectioncaption="">'+
            '<span class="custm_btn image_edit_que_span_detail_'+opt_c+'" id="ans_choose_'+opt_c+'_image_'+sec_c+'" data-mode="edit" data-option="answer" data-optionsection="'+sectionCount+'" data-type="image" data-question_count="'+opt_c+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true" aria-hidden="true" >'+message['choose_image']+'</span>'+
            '<span id="ans_filename_'+opt_c+'_image_'+sec_c+'" class="filenme" aria-hidden="true"></span>'+
            '</div>'+'<label for="edit_ans_option_'+opt_c+'_image_'+sec_c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'video') 
    {
        divEle.html(
            '<textarea class="form-control lang-dir required videourl txera_vdo edit_question_'+questioncount+'_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sectionCount+'][video]" id="edit_ans_option_'+opt_c+'_video_'+sec_c+'" placeholder="Paste embed link here. To generate embed link,1. Open video in youtube 2. Click on share and select embed 3. Copy src link and paste here" data-option_count="'+opt_c+'"  data-ans_section_count="'+sectionCount+'" data-ques_ans_section_count="'+sectionCount+'" onpaste="getAnsVideoPreview(this.id)" onkeyup="getAnsVideoPreview(this.id)" onchange="getAnsVideoPreview(this.id)"></textarea>'+
            '<label for="edit_ans_option_'+opt_c+'_video_'+sec_c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'audio')
    {
        divEle.html(
            '<div class="pramtr_file">'+
            '<input type="hidden" class="form-control required filesize edit_question_'+questioncount+'_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sectionCount+'][audio]" id="edit_ans_option_'+opt_c+'_audio_'+sec_c+'" data-option_count="'+opt_c+'"  data-ans_section_count="'+sectionCount+'" data-ques_ans_section_count="'+sectionCount+'" >'+
            '<span class="custm_btn audio_edit_que_span_detail_'+opt_c+'" id="ans_choose_'+opt_c+'_audio_'+sec_c+'" data-mode="edit" data-option="answer" data-optionsection="'+sectionCount+'" data-type="audio" data-question_count="'+opt_c+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true" aria-hidden="true">'+message['choose_audio']+'</span>'+
            '<span class="filenme" id="ans_filename_'+opt_c+'_audio_'+sec_c+'" aria-hidden="true"></span>'+
            '</div>'+'<label for="edit_ans_option_'+opt_c+'_audio_'+sec_c+'" generated="true" class="error"></label>');
    }
    else
    {
        divEle.html('<textarea class="form-control lang-dir required edit_question_'+questioncount+'_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sectionCount+'][description]" id="edit_ans_option_'+opt_c+'_description_'+sec_c+'" placeholder="'+message['description']+'" data-option_count="'+opt_c+'"  data-ans_section_count="'+sectionCount+'" data-ques_ans_section_count="'+sectionCount+'"></textarea>');
    }

    if(stype == 'plugin' || stype == 'plugins') {
        // edit_ans_2_span_detail_2
        // console.log('#edit_ans_'+opt_c+'_span_detail_'+sec_c+'');
        
        $('#edit_ans_plugin_'+opt_c+'_span_detail_'+sec_c+'').css('display','block');
        $('#edit_ans_'+opt_c+'_span_detail_'+sec_c+'').css('display','block');
    } else {
        $('#edit_ans_plugin_'+opt_c+'_span_detail_'+sec_c+'').css('display','none');
        $('#edit_ans_'+opt_c+'_span_detail_'+sec_c+'').css('display','none');

        $('#image_edit_ans_'+opt_c+'_span_detail_'+sec_c+'').remove();
        $('#audio_edit_ans_'+opt_c+'_span_detail_'+sec_c+'').remove();
    }

    $('#edit_preview_option_'+opt_c+'_section_'+sec_c).html('');
    $('.lang-dir').attr('dir', direction);

    runQuestionRenderAndDisplay2();

}

// For Select Correct Answer
function selectCorrectAns(id)
{
    var opt_c = $('#'+id).attr('data-option_count');
    $('p.option_name').removeClass('coorect_prvew');
    $('#edit_preview_option_name_'+opt_c).addClass('coorect_prvew');
    $('p.name_answer').removeClass('correct_answer');
    $('#edit_ans_option_'+opt_c+'_text').addClass('correct_answer');
    runQuestionRenderAndDisplay2();
}

// ----------------- For Hint ---------------------
// Add More Hint
var multi_hint_count = 1;

function addMoreHint(id)
{
    var hintsectioncount = 1;
    var multi_hint_count = parseInt($('#'+id).data('hint_count'))+1;

    var opt_text = $('p.name_hint').last().text();
    var hint_name = parseInt(opt_text.substr(opt_text.indexOf("H") + 1))+ + +1;
    var question_id = 1;
    $('#edit_hint_div').append(
        '<div class="hint_option edit_question_1_hint_div" id="edit_hint_'+multi_hint_count+'" data-option_count="'+multi_hint_count+'">'+
            '<ul id="edit_hint_'+multi_hint_count+'_ul_list">'+
                '<li class="list_of_exersize pdng_70_lft" id="edit_hint_'+multi_hint_count+'_li_1" data-hint_count="'+multi_hint_count+'" data-hint_section_count="1">'+
                    '<div class="form-group">'+
                        '<div class="row">'+
                            '<div class="col-md-5 col-lg-5 col-xl-4">'+
                                '<div class="answer_pdng rmv_btn_cls right_ans">'+
                                    '<button type="button" class="close_icon" id="edit_clear_hint_btn_'+multi_hint_count+'" data-hint_count="'+multi_hint_count+'" onclick="removeHint(this.id)"></button>'+
                                    '<div class="text_wt_icon">'+
                                        '<p class="name_hint" id="edit_hint_'+multi_hint_count+'_text">H'+hint_name+'. </p>'+
                                    '</div>'+
                                    '<div class="df-select">'+
                                        '<select class="selectpicker edit_question_'+question_id+'_hint_'+multi_hint_count+'_section_1_type" name="hint['+multi_hint_count+'][1][section_type]" data-question_count="'+question_id+'" id="edit_hint_'+multi_hint_count+'_section_type_1" data-question_count="1" data-hint_count="'+multi_hint_count+'" data-hint_section_count="1" onchange="changeHintSectionType(this.id, this.value)">'+

                                        '</select>'+
                                    '</div>'+
                                    '<select style="display:none;" class="dflt_slctpckr" id="edit_'+multi_hint_count+'_hint_span_detail_'+hintsectioncount+'" data-mode="edit"  data-part="hint" data-hint_id="'+multi_hint_count+'" data-hint_section_count="'+hintsectioncount+'" onchange="changePluginType(this.id, this.value)">'+
                                        '<option value="">'+message['select_plugin']+'</option>'+
                                        '<option value="clock"> '+message['clock']+'</option>'+
                                        '<option value="chess"> '+message['chess']+'</option>'+
                                        '<option value="video"> '+message['video']+'</option>'+
                                        '<option value="audio"> '+message['audio']+'</option>'+
                                        '<option value="image"> '+message['image']+'</option>'+
                                        '<option value="table"> '+message['table']+'</option>'+
                                        '<option value="textbox"> '+message['textbox']+'</option>'+
                                        '<option value="flowchart">'+message['flowChart']+'</option>'+
                                        '<option value="math"> '+message['math']+'</option>'+
                                        '<option value="chart">'+message['chart']+'</option>'+
                                    '</select>'+
                                    '<div class="questn_circl">' +
                                        '<span title="" onclick="showQuePluginList(1)" style="cursor:pointer;display:none;" id="edit_plugin_'+hint_name+'_hint_span_detail_'+hintsectioncount+'">'+
                                            '<i class="fa fa-question-circle-o"></i>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-md-7 col-lg-7 col-xl-8" id="edit_hint_'+multi_hint_count+'_section_type_div_1">'+
                                '<textarea class="form-control lang-dir edit_question_'+question_id+'_hint_'+multi_hint_count+'_section" name="hint['+multi_hint_count+'][1][description]" id="edit_hint_'+multi_hint_count+'_description_1" data-question_count="'+question_id+'" data-hint_count="'+multi_hint_count+'" data-hint_section_count="1" placeholder="'+message['description']+'" ></textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</li>'+
            '</ul>'+
            '<div class="add_section_cls text-right text-ar-left">'+
                '<a href="javascript:;" class="add_section_btn" data-question_count="'+question_id+'" id="edit_hint_'+multi_hint_count+'_add_section_btn" data-hint_count="'+multi_hint_count+'" onclick="addHintSection(this.id)">+ '+message['add_section']+' </a>'+
            '</div>'+
        '</div>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);
        $('#edit_hint_'+multi_hint_count+'_section_type_1').append('<option value="'+ind+'">'+item2+'</option>');
    });
    $('#edit_hint_'+multi_hint_count+'_section_type_1').selectpicker('refresh');
    // For Preview
    //$('#edit_preview_hint_div > ul').append('<li class="" id="edit_preview_hint_'+multi_hint_count+'"></li>');
    //$('#edit_preview_hint_div > ul > li#edit_preview_hint_'+multi_hint_count).prepend('<p class="option_name hint_name" id="edit_preview_hint_name_'+multi_hint_count+'">H'+hint_name+'. </p>');
    //$('#edit_preview_hint_div > ul > li#edit_preview_hint_'+multi_hint_count).append('<div id="edit_preview_hint_'+multi_hint_count+'_section_1"></div>');
    $('.lang-dir').attr('dir', direction);
    $('#'+id).data('hintsectioncount',hintsectioncount);
    $('#'+id).data('hint_count',multi_hint_count);

    runQuestionRenderAndDisplay2();

}

// For Delete Hint
function removeHint(id)
{
    var hin_c = $('#'+id).attr('data-hint_count');
    $('#edit_hint_'+hin_c).remove();
    $('#edit_preview_hint_'+hin_c).remove();

    var opt_text = 'H';
    $('#edit_preview_hint_div > ul > li').each(function(i) {
        var hint_name = opt_text+(i+ + 1);
        if($(this).find('p.hint_name').length > 0)
            $(this).find('p.hint_name').html(hint_name+'.&nbsp;');
    });

    var opt_text = 'H';
    $('#edit_hint_div > div').each(function(i) {
        var hint_name = opt_text+(i+ + 1);
        if($(this).find('ul > li').find('div.text_wt_icon').find('p.name_hint').length > 0)
            $(this).find('ul > li').find('div.text_wt_icon').find('p.name_hint').html(hint_name+' ');
    });

    runQuestionRenderAndDisplay2();
}

// For Add Section in Hint
function addHintSection(id)
{
    var multi_hint_count = $('#'+id).attr('data-hint_count');
    var hintsectioncount = $('#'+id).data('hintsectioncount');
    var hint_count = parseInt($('#edit_hint_'+multi_hint_count+'_ul_list > li').last().attr('data-hint_section_count'));
    hint_count += 1;
    $('#edit_hint_'+multi_hint_count+'_ul_list').append(
        '<li class="list_of_exersize" id="edit_hint_'+multi_hint_count+'_li_'+hint_count+'" data-hint_section_count="'+hint_count+'">'+
            '<div class="form-group">'+
                '<div class="row">'+
                    '<div class="col-md-5 col-lg-5 col-xl-4">'+
                      '<div class="answer_pdng">'+
                        '<div class="df-select">'+
                            '<select class="selectpicker edit_question_1_hint_'+multi_hint_count+'_section_'+hint_count+'_type " name="hint['+multi_hint_count+']['+hint_count+'][section_type]" id="edit_hint_'+multi_hint_count+'_section_type_'+hint_count+'" data-hintsectioncount="'+hintsectioncount+'" data-hint_count="'+multi_hint_count+'" data-hint_section_count="'+hint_count+'" data-question_count="1" onchange="changeHintSectionType(this.id, this.value)">'+

                            '</select>'+
                        '</div>'+
                            '<select style="display:none;" class="dflt_slctpckr" id="edit_'+multi_hint_count+'_hint_span_detail_'+hint_count+'" data-mode="edit"  data-part="hint" data-hint_id="'+multi_hint_count+'" data-hint_section_count="'+hint_count+'" onchange="changePluginType(this.id, this.value)">'+
                                '<option value="">'+message['select_plugin']+'</option>'+
                                '<option value="clock"> '+message['clock']+'</option>'+
                                '<option value="chess"> '+message['chess']+'</option>'+
                                '<option value="video"> '+message['video']+'</option>'+
                                '<option value="audio"> '+message['audio']+'</option>'+
                                '<option value="image"> '+message['image']+'</option>'+
                                '<option value="table"> '+message['table']+'</option>'+
                                '<option value="textbox"> '+message['textbox']+'</option>'+
                                '<option value="flowchart">'+message['flowChart']+'</option>'+
                                '<option value="math"> '+message['math']+'</option>'+
                                '<option value="chart">'+message['chart']+'</option>'+
                            '</select>'+
                        '<div class="questn_circl">' +                            
                            '<span title="" onclick="showQuePluginList(1)" style="cursor:pointer;display:none;" id="edit_plugin_'+multi_hint_count+'_hint_span_detail_'+hint_count+'">'+
                                '<i class="fa fa-question-circle-o"></i>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="col-md-7 col-lg-7 col-xl-8" id="edit_hint_'+multi_hint_count+'_section_type_div_'+hint_count+'">'+
                        '<textarea class="form-control lang-dir edit_question_1_hint_'+multi_hint_count+'_section required" name="hint['+multi_hint_count+']['+hint_count+'][description]" id="edit_hint_'+multi_hint_count+'_description_'+hint_count+'" data-hint_count="'+multi_hint_count+'" data-hint_section_count="'+hint_count+'" data-question_count="1" placeholder="'+message['description']+'"></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<button type="button" class="close_icon" id="edit_hint_'+multi_hint_count+'_clear_btn_'+hint_count+'" data-hintcount="'+multi_hint_count+'" data-hintsectioncount="'+hint_count+'" onclick="deleteHintSection(this.id)"></button>'+
        '</li>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);
        $('#edit_hint_'+multi_hint_count+'_section_type_'+hint_count).append('<option value="'+ind+'">'+item2+'</option>');
    });
    $('#edit_hint_'+multi_hint_count+'_section_type_'+hint_count).selectpicker('refresh');
    // For Preview
    $('#edit_preview_hint_div > ul > li#edit_preview_hint_'+multi_hint_count).append('<div id="edit_preview_hint_'+multi_hint_count+'_section_'+hint_count+'"></div>');
    $('.lang-dir').attr('dir', direction);
}

// For Delete Hint Section
function deleteHintSection(id)
{
    var sc = $('#'+id).attr('data-hintsectioncount');
    var hc = $('#'+id).attr('data-hintcount');
    $('#edit_hint_'+hc+'_li_'+sc).remove();
    $('#edit_preview_hint_'+hc+'_section_'+sc).remove();
    runQuestionRenderAndDisplay2();
}

// For CHange Hint Section Type
function changeHintSectionType(id, stype)
{
    var sc = $('#'+id).attr('data-hint_section_count');
    var hc = $('#'+id).attr('data-hint_count');
    var hintsectioncount = $('#'+id).data('hintsectioncount');
    var question_id = "1";

    if(stype == 'image')
    {
        // $('#edit_hint_'+hc+'_section_type_div_'+sc).html('<div class="pramtr_file">'+
        //     '<input type="file" class="form-control edit_question_1_hint_'+hc+'_section filesize" name="hint['+hc+']['+sc+'][image]" id="edit_hint_'+hc+'_image_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="1" accept="image/*" placeholder="Upload Image" onchange="getHintImagePreview(this.id)">'+
        //     '<span class="custm_btn" aria-hidden="true">Choose file</span>'+
        //     '<span class="filenme" aria-hidden="true"></span>'+
        //     '</div>'+'<label for="edit_hint_'+hc+'_image_'+sc+'" generated="true" class="error"></label>');

        $('#edit_hint_'+hc+'_section_type_div_'+sc).html('<div class="pramtr_file">'+
            '<input type="hidden" class="form-control required edit_question_1_hint_'+hc+'_section filesize" name="hint['+hc+']['+sc+'][image]" id="edit_hint_'+hc+'_image_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="1">'+
            '<span class="custm_btn image_edit_que_span_detail_'+hc+'" id="hint_choos_'+hc+'_image_'+sc+'" data-mode="edit" data-option="hint" data-optionsection="'+sc+'" data-type="image" data-question_count="'+hc+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true" aria-hidden="true">'+message['choose_image']+'</span>'+
            '<span class="filenme" id="hint_filename_'+hc+'_image_'+sc+'" aria-hidden="true"></span>'+
            '</div>'+'<label for="edit_hint_'+hc+'_image_'+sc+'" generated="true" class="error"></label>');
    }
    else if(stype == 'video')
    {
        $('#edit_hint_'+hc+'_section_type_div_'+sc).html(
            '<textarea class="form-control lang-dir required videourl edit_question_'+question_id+'_hint_'+hc+'_section"" name="hint['+hc+']['+sc+'][video]" id="edit_hint_'+hc+'_video_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="1" placeholder="Paste embed link here. To generate embed link,1. Open video in youtube 2. Click on share and select embed 3. Copy src link and paste here" onpaste="getHintVideoPreview(this.id)" onkeyup="getHintVideoPreview(this.id)" onchange="getHintVideoPreview(this.id)"></textarea>'+
            '<label for="edit_hint_'+hc+'_video_'+sc+'" generated="true" class="error"></label>');
    }
    else if(stype == 'audio')
    {
        $('#edit_hint_'+hc+'_section_type_div_'+sc).html('<div class="pramtr_file">'+
            '<input type="hidden" class="form-control required filesize edit_question_1_hint_'+hc+'_section"" name="hint['+hc+']['+sc+'][audio]" id="edit_hint_'+hc+'_audio_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="1">'+
            '<span class="custm_btn audio_edit_que_span_detail_'+hc+'" id="hint_choos_'+hc+'_audio_'+sc+'" data-mode="edit" data-option="hint" data-optionsection="'+sc+'" data-type="audio" data-question_count="'+hc+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true" aria-hidden="true" aria-hidden="true">'+message['choose_audio']+'</span>'+
            '<span class="filenme"  id="hint_filename_'+hc+'_audio_'+sc+'" aria-hidden="true"></span>'+
            '</div>'+'<label for="edit_hint_'+hc+'_audio_'+sc+'" generated="true" class="error"></label>');
    }
    else
    {
        $('#edit_hint_'+hc+'_section_type_div_'+sc).html('<textarea class="form-control lang-dir edit_question_1_hint_'+hc+'_section" required" name="hint['+hc+']['+sc+'][description]" id="edit_hint_'+hc+'_description_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="1" placeholder="'+message['description']+'" ></textarea>');
    }

    if(stype == 'plugin' || stype == 'plugins') {
        $('#edit_plugin_'+hc+'_hint_span_detail_'+sc+'').css('display','block');
        $('#edit_'+hc+'_hint_span_detail_'+sc+'').css('display','block');
    } else {
        $('#edit_plugin_'+hc+'_hint_span_detail_'+sc+'').css('display','none');
        $('#edit_'+hc+'_hint_span_detail_'+sc+'').css('display','none');

        $('#image_edit_'+hc+'_hint_span_detail_'+sc+'').remove();
        $('#audio_edit_'+hc+'_hint_span_detail_'+sc+'').remove();
    }
    $('#edit_preview_hint_'+hc+'_section_'+sc).html('');
    $('.lang-dir').attr('dir', direction);

    runQuestionRenderAndDisplay2();

}

// ----------------- For Preview ---------------------
// For Question Text Preview


// For Question Image Preview
function getQueImagePreview(id)
{
    $('.'+id).hide();

    $('.textarea').trigger('blur');
    var fileInput = document.getElementById(id);   
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }    
    runQuestionRenderAndDisplay2();

    var qc = id.substr(id.lastIndexOf("_") + 1);
    var fileInput = document.getElementById(id);

    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    
    var photo = $('<img />', {
        id: 'edit_preview_que_img_section_'+qc,
        src: fileUrl,
        alt: ''
    });
    if($('#edit_preview_que_section_'+qc).length > 0) {
        if($('#edit_preview_que_img_section_'+qc).length > 0)
            $('#edit_preview_que_img_section_'+qc).attr("src", fileUrl);
        else
            photo.appendTo($('#edit_preview_que_section_'+qc));
    } else {
        $('#edit_preview_que_div').append('<div id="preview_que_section_'+qc+'"></div>');
        photo.appendTo($('#edit_preview_que_section_'+qc));
    }
    $('#edit_preview_que_img_section_'+qc).css({"width": "350px", "height": "200px"});
    
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);

    setTimeout(() => {
        $('#'+id).blur();
    }, 100);
}

// For Question Video Preview
function getQueVideoPreview(id)
{
    var fileInput = document.getElementById(id);   
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }    
    runQuestionRenderAndDisplay2();

    var qc = id.substr(id.lastIndexOf("_") + 1);
    var fileUrl = $('#'+id).val();
    var video = $('<iframe />', {
        id: 'edit_preview_que_video_section_'+qc,
        src: fileUrl,
        frameborder: "0",
        allowfullscreen: true,
    });
    var matches = fileUrl.match(/embed\/([a-zA-Z0-9\-_]+)/);
    if (matches)
    {
        if($('#edit_preview_que_section_'+qc).length > 0) {
            if($('#edit_preview_que_video_section_'+qc).length > 0)
                $('#edit_preview_que_video_section_'+qc).attr("src", fileUrl);
            else
                video.appendTo($('#edit_preview_que_section_'+qc));
        } else {
            $('#edit_preview_que_div').append('<div id="edit_preview_que_section_'+qc+'"></div>');
            video.appendTo($('#edit_preview_que_div'));
        }
        $('#edit_preview_que_video_section_'+qc).css({"width": "350px", "height": "200px"});
        // $('#'+id).next().next().next('span.filenme').text(fileInput.files[0].name);
        setTimeout(() => {
            $('#'+id).blur();
        }, 100);
    }
}

// For Question Audio Preview
function getQueAudioPreview(id)
{
    $('.'+id).hide();
    var fileInput = document.getElementById(id);   
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);

    runQuestionRenderAndDisplay2();

    var qc = id.substr(id.lastIndexOf("_") + 1);
    var fileInput = document.getElementById(id);
    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    var audio = $('<audio />', {
        id: 'edit_preview_que_audio_section_'+qc,
        src: fileUrl,
        controls: true,
        'volume':0.4,
    });
    if($('#edit_preview_que_section_'+qc).length > 0) {
        if($('#edit_preview_que_audio_section_'+qc).length > 0)
            $('#edit_preview_que_audio_section_'+qc).attr("src", fileUrl);
        else
            audio.appendTo($('#edit_preview_que_section_'+qc));
    } else {
        $('#edit_preview_que_div').append('<div id="preview_que_section_'+qc+'"></div>');
        audio.appendTo($('#edit_preview_que_div'));
    }
    $('#edit_preview_que_audio_section_'+qc).css({"width": "350px", "height": "60px"});
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    setTimeout(() => {
        $('#'+id).blur();
    }, 100);
}

// -------------------------------------------------------------------
//For Answer Option Text Preview
function getAnswerOptionName()
{
    var opt_text = $('#edit_preview_ans_option_div > ul > li > p.option_name').last().text();
    if(opt_text == '') {
        opt_text = 'A';
        aCharCode = opt_text.charCodeAt(0);
    } else
        aCharCode = opt_text.charCodeAt(0) + 1;
    return String.fromCharCode(aCharCode)+'.&nbsp;';
}

function getAnsOptionPreview(id)
{
    var fileInput = document.getElementById(id);   
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }
    

    runQuestionRenderAndDisplay2();

    // var currentVal = $('#'+id).val();
    // var sec_c = id.substr(id.lastIndexOf("_") + 1);
    // var opt_c = $('#'+id).attr('data-option_count');

    // if($('#edit_preview_option_'+opt_c).length > 0) {
    //     if($('#edit_preview_option_'+opt_c+'_section_'+sec_c).length > 0) {
    //         if($('#edit_preview_option_'+opt_c+'_section_'+sec_c+'text').length > 0)
    //             $('#edit_preview_option_'+opt_c+'_section_'+sec_c+'text').text(currentVal);
    //         else
    //             $('div#edit_preview_option_'+opt_c+'_section_'+sec_c).append('<p class="text-new-line" id="edit_preview_option_'+opt_c+'_section_'+sec_c+'text">'+currentVal+'</p>');
    //     } else {
    //         $('li#edit_preview_option_'+opt_c).append('<div id="edit_preview_option_'+opt_c+'_section_'+sec_c+'"><p class="text-new-line" id="edit_preview_option_'+opt_c+'_section_'+sec_c+'text">'+currentVal+'</p></div>');
    //     }
    // } else {
    //     var option_name = getAnswerOptionName();
    //     $('#edit_preview_option_'+opt_c).prepend('<p class="option_name" id="edit_preview_option_name_'+opt_c+'">'+option_name+' </p>');
    // }
    // if ($("input[name='correct']").is(":checked")) {
    //     var co_id = $("input[name='correct']:checked").attr('id');
    //     selectCorrectAns(co_id);
    // }
}

// For Answer Option Image Preview
function getAnsImagePreview(id)
{
    $('.'+id).hide();

    var fileInput = document.getElementById(id);   
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }

    runQuestionRenderAndDisplay2();

    /* var sec_c = id.substr(id.lastIndexOf("_") + 1);
    var opt_c = $('#'+id).attr('data-option_count');

    var fileInput = document.getElementById(id);
    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    
    var photo = $('<img />', {
        id: 'edit_preview_option_'+opt_c+'_section_'+sec_c+'img',
        src: fileUrl,
        alt: ''
    });

    if($('#edit_preview_option_'+opt_c).length > 0) {
        if($('#edit_preview_option_'+opt_c+'_section_'+sec_c).length > 0) {
            if($('#edit_preview_option_'+opt_c+'_section_'+sec_c+'img').length > 0)
                $('#edit_preview_option_'+opt_c+'_section_'+sec_c+'img').attr("src", fileUrl);
            else
                photo.appendTo($('div#edit_preview_option_'+opt_c+'_section_'+sec_c));
        } else {
            $('li#edit_preview_option_'+opt_c).append('<div id="edit_preview_option_'+opt_c+'_section_'+sec_c+'"></div>');
            photo.appendTo($('div#edit_preview_option_'+opt_c+'_section_'+sec_c));
        }
    } else {
        var option_name = getAnswerOptionName();
        $('#edit_preview_option_'+opt_c).prepend('<p class="option_name" id="edit_preview_option_name_'+opt_c+'">'+option_name+' </p>');
    }
    $('#edit_preview_option_'+opt_c+'_section_'+sec_c+'img').css({"width": "350px", "height": "200px"});
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    if ($("input[name='correct']").is(":checked")) {
        var co_id = $("input[name='correct']:checked").attr('id');
        selectCorrectAns(co_id);
    }
    setTimeout(() => {
        $('#'+id).blur();
    }, 100); */
}

// For Answer Option Video Preview
function getAnsVideoPreview(id)
{
    var fileInput = document.getElementById(id); 
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {  
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }

    runQuestionRenderAndDisplay2();

    // var sec_c = id.substr(id.lastIndexOf("_") + 1);
    // var opt_c = $('#'+id).attr('data-option_count');
    // var fileUrl = $('#'+id).val();
    // var video = $('<iframe />', {
    //     id: 'edit_preview_option_'+opt_c+'_section_'+sec_c+'video',
    //     src: fileUrl,
    //     frameborder: "0",
    //     allowfullscreen: true,
    // });
    // var matches = fileUrl.match(/embed\/([a-zA-Z0-9\-_]+)/);
    // if (matches)
    // {
    //     if($('#edit_preview_option_'+opt_c).length > 0) {
    //         if($('#edit_preview_option_'+opt_c+'_section_'+sec_c).length > 0) {
    //             if($('#edit_preview_option_'+opt_c+'_section_'+sec_c+'video').length > 0)
    //                 $('#edit_preview_option_'+opt_c+'_section_'+sec_c+'video').attr("src", fileUrl);
    //             else
    //                 video.appendTo($('div#edit_preview_option_'+opt_c+'_section_'+sec_c));
    //         } else {
    //             $('li#edit_preview_option_'+opt_c).append('<div id="edit_preview_option_'+opt_c+'_section_'+sec_c+'"></div>');
    //             video.appendTo($('div#edit_preview_option_'+opt_c+'_section_'+sec_c));
    //         }
    //     } else {
    //         var option_name = getAnswerOptionName();
    //         $('#edit_preview_option_'+opt_c).prepend('<p class="option_name" id="edit_preview_option_name_'+opt_c+'">'+option_name+' </p>');
    //     }
    //     $('#edit_preview_option_'+opt_c+'_section_'+sec_c+'video').css({"width": "350px", "height": "200px"});
    //     // $('#'+id).next().next().next('span.filenme').text(fileInput.files[0].name);
    //     setTimeout(() => {
    //         $('#'+id).blur();
    //     }, 100);
    //     if ($("input[name='correct']").is(":checked")) {
    //         var co_id = $("input[name='correct']:checked").attr('id');
    //         selectCorrectAns(co_id);
    //     }
    // }
}

// For Answer Option Video Preview
function getAnsAudioPreview(id)
{
    $('.'+id).hide();
    var fileInput = document.getElementById(id);
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {   
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }

    runQuestionRenderAndDisplay2();
    // var sec_c = id.substr(id.lastIndexOf("_") + 1);
    // var opt_c = $('#'+id).attr('data-option_count');

    // var fileInput = document.getElementById(id);
    
    // var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    // var audio = $('<audio />', {
    //     id: 'preview_option_'+opt_c+'_section_'+sec_c+'audio',
    //     src: fileUrl,
    //     controls: true,
    //     'volume':0.4,
    // });

    // if($('#edit_preview_option_'+opt_c).length > 0) {
    //     if($('#edit_preview_option_'+opt_c+'_section_'+sec_c).length > 0) {
    //         if($('#edit_preview_option_'+opt_c+'_section_'+sec_c+'audio').length > 0)
    //             $('#edit_preview_option_'+opt_c+'_section_'+sec_c+'audio').attr("src", fileUrl);
    //         else
    //             audio.appendTo($('div#edit_preview_option_'+opt_c+'_section_'+sec_c));
    //     } else {
    //         $('li#edit_preview_option_'+opt_c).append('<div id="edit_preview_option_'+opt_c+'_section_'+sec_c+'"></div>');
    //         audio.appendTo($('div#edit_preview_option_'+opt_c+'_section_'+sec_c));
    //     }
    // } else {
    //     var option_name = getAnswerOptionName();
    //     $('#edit_preview_option_'+opt_c).prepend('<p class="option_name" id="edit_preview_option_name_'+opt_c+'">'+option_name+' </p>');
    // }
    // $('#edit_preview_option_'+opt_c+'_section_'+sec_c+'audio').css({"width": "350px", "height": "60px"});
    // $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    // if ($("input[name='correct']").is(":checked")) {
    //     var co_id = $("input[name='correct']:checked").attr('id');
    //     selectCorrectAns(co_id);
    // }
    // setTimeout(() => {
    //     $('#'+id).blur();
    // }, 100);
}

// ---------------------------------------------------------------------
// For Hint Text Preview
function getHintPreview(id)
{
    
    var fileInput = document.getElementById(id);   
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }
    

    runQuestionRenderAndDisplay2();

    // var currentVal = $('#'+id).val();
    // var sec_c = id.substr(id.lastIndexOf("_") + 1);
    // var hin_c = $('#'+id).attr('data-hint_count');

    // if($('#edit_preview_hint_'+hin_c).length > 0) {
    //     if($('#edit_preview_hint_'+hin_c+'_section_'+sec_c).length > 0) {
    //         if($('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'text').length > 0)
    //             $('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'text').text(currentVal);
    //         else
    //             $('div#edit_preview_hint_'+hin_c+'_section_'+sec_c).append('<p class="text-new-line" id="edit_preview_hint_'+hin_c+'_section_'+sec_c+'text">'+currentVal+'</p>');
    //     } else {
    //         $('li#edit_preview_hint_'+hin_c).append('<div class="ttt" id="edit_preview_hint_'+hin_c+'_section_'+sec_c+'"><p id="edit_preview_hint_'+hin_c+'_section_'+sec_c+'text">'+currentVal+'</p></div>');
    //     }
    // }
}

// For Hint Image Preview
function getHintImagePreview(id)
{
    $('.'+id).hide();
    var fileInput = document.getElementById(id);
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {   
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }    
    runQuestionRenderAndDisplay2();

    // var sec_c = id.substr(id.lastIndexOf("_") + 1);
    // var hin_c = $('#'+id).attr('data-hint_count');

    // var fileInput = document.getElementById(id);
    // var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    // var photo = $('<img />', {
    //     id: 'edit_preview_hint_'+hin_c+'_section_'+sec_c+'img',
    //     src: fileUrl,
    //     alt: ''
    // });

    // if($('#edit_preview_hint_'+hin_c).length > 0) {
    //     if($('#edit_preview_hint_'+hin_c+'_section_'+sec_c).length > 0) {
    //         if($('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'img').length > 0)
    //             $('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'img').attr("src", fileUrl);
    //         else
    //             photo.appendTo($('div#edit_preview_hint_'+hin_c+'_section_'+sec_c));
    //     } else {
    //         $('li#edit_preview_hint_'+hin_c).append('<div class="ttt" id="edit_preview_hint_'+hin_c+'_section_'+sec_c+'"></div>');
    //         photo.appendTo($('div#edit_preview_hint_'+hin_c+'_section_'+sec_c));
    //     }
    // }
    // $('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'img').css({"width": "350px", "height": "200px"});
    // $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    // setTimeout(() => {
    //     $('#'+id).blur();
    // }, 100);
}

// For Hint Video Preview
function getHintVideoPreview(id)
{
    var fileInput = document.getElementById(id); 
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {  
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }
    runQuestionRenderAndDisplay2();

    // var sec_c = id.substr(id.lastIndexOf("_") + 1);
    // var hin_c = $('#'+id).attr('data-hint_count');

    // var fileUrl = $('#'+id).val();
    // var video = $('<iframe />', {
    //     id: 'edit_preview_hint_'+hin_c+'_section_'+sec_c+'video',
    //     src: fileUrl,
    //     frameborder: "0",
    //     allowfullscreen: true,
    // });
    // var matches = fileUrl.match(/embed\/([a-zA-Z0-9\-_]+)/);
    // if (matches)
    // {
    //     if($('#edit_preview_hint_'+hin_c).length > 0) {
    //         if($('#edit_preview_hint_'+hin_c+'_section_'+sec_c).length > 0) {
    //             if($('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'video').length > 0)
    //                 $('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'video').attr("src", fileUrl);
    //             else
    //                 video.appendTo($('div#edit_preview_hint_'+hin_c+'_section_'+sec_c));
    //         } else {
    //             $('li#edit_preview_hint_'+hin_c).append('<div class="ttt" id="preview_hint_'+hin_c+'_section_'+sec_c+'"></div>');
    //             video.appendTo($('div#edit_preview_hint_'+hin_c+'_section_'+sec_c));
    //         }
    //     }
    //     $('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'video').css({"width": "350px", "height": "200px"});
    //     setTimeout(() => {
    //         $('#'+id).blur();
    //     }, 100);
    // }
}
// For Hint Audio Preview
function getHintAudioPreview(id)
{
    $('.'.id).hide();
    var fileInput = document.getElementById(id);
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {   
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }
    runQuestionRenderAndDisplay2();

    // var sec_c = id.substr(id.lastIndexOf("_") + 1);
    // var hin_c = $('#'+id).attr('data-hint_count');

    // var fileInput = document.getElementById(id);
    // var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    // var audio = $('<audio />', {
    //     id: 'edit_preview_hint_'+hin_c+'_section_'+sec_c+'audio',
    //     src: fileUrl,
    //     controls: true,
    //     'volume':0.4,
    // });

    // if($('#edit_preview_hint_'+hin_c).length > 0) {
    //     if($('#edit_preview_hint_'+hin_c+'_section_'+sec_c).length > 0) {
    //         if($('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'audio').length > 0)
    //             $('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'audio').attr("src", fileUrl);
    //         else
    //             audio.appendTo($('div#edit_preview_hint_'+hin_c+'_section_'+sec_c));
    //     } else {
    //         $('li#edit_preview_hint_'+hin_c).append('<div class="ttt" id="edit_preview_hint_'+hin_c+'_section_'+sec_c+'"></div>');
    //         audio.appendTo($('div#edit_preview_hint_'+hin_c+'_section_'+sec_c));
    //     }
    // }
    // $('#edit_preview_hint_'+hin_c+'_section_'+sec_c+'audio').css({"width": "350px", "height": "60px"});
    // $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    // setTimeout(() => {
    //     $('#'+id).blur();
    // }, 100);
}

// ----------------------------------------------------------------------------
// For Parameter
if($('#edit_param_1').text() != '') {
    setTimeout(function(){
        $('#edit_add_parameter').trigger('click');
        $('#csv-download-btn').show();

    }, 300);
}
$('#edit_add_parameter').click(function(){
    $('#edit_main_nw_accordian').show();
    $('#edit_remove_parameter').show();
    $('#edit_parameter_file').addClass('required');

    $('#csv-download-btn').hide();
    $(this).hide();
});
$('#edit_remove_parameter').click(function(){
    $('#edit-csv-div').hide();
    $('#edit_parameter_file').val('');
    $('#edit_parameter_file').attr('data-name',null);
    $('#edit_param_1').html('');
    $("#csv_pre_tbl_body_edit").empty();
    $('#edit_main_nw_accordian').hide();
    $('#edit_add_parameter').show();
    $('#edit_parameter_file').removeClass('required');
    $(this).hide();
    runQuestionRenderAndDisplay2();
});

// For Cancel Button
$('#edit_cancel_que_btn').click(function() {
    var url = $('#edit_cancel_que_btn').data('url');
    window.location.href = url;
    // $('.tab-pane').removeClass('active show');
    // $('#pills-tab > li > a[href="#edit_simple_editor"]').parent('li').hide();
    // $('#pills-tab > li > a[href="#simple_editor"]').parent('li').show();
    // $('#pills-tab > li > a[href="#detail"]').tab('show');
    // document.documentElement.scrollTop = 0;
});

// For Form Submit
$("#edit_simple_editor_form").validate({
    ignore: "",
    rules: {
        min_time: {
            required: true,
            max: function () {
                return parseInt($('#edit_max_time').val());
            }
        },
        max_time: {
            required: true,
            min: function () {
                return parseInt($('#edit_min_time').val());
            }
        }
    },
    submitHandler: function(form) {
        form.submit();
    }
});

// For Preview Fix
$(document).ready(function(){
    // For Language Direction
    $('.lang-dir').attr('dir', direction);
    if(direction == 'rtl') {
        $('.priew_body').css({"text-align": "right"});
        $('.priew_body .question_ans').addClass("ar_question_ans");
        $('.priew_body .hint_sec').addClass("ar_hint_sec");
    }
    // For Preview Sidebar
    $(window).scroll(function () {

        if($(window).scrollTop() > 260) {
            $('#edit_sidebar').addClass('fixed');
            $('#edit_sidebar').css('top','80px');
        }

        else if ($(window).scrollTop() <= 260) {
            $('#edit_sidebar').removeClass('fixed');
            $('#edit_sidebar').css('top','');
        }
        if ($('#edit_sidebar').offset().top + $("#edit_sidebar").height() > $("footer").offset().top) {
            $('#edit_sidebar').css('top',-($("#edit_sidebar").offset().top + $("#edit_sidebar").height() - $("footer").offset().top));
        }
    });
});


// --------------------------------------------------------------------------
//Onchage in csv priview

//-----------CSV-----------------

// $(document).ready(function() {
//     var localCsvPath = $('#edit_parameter_file').val();
//     // var localCsvPath = $('#parameter_file_path').val();
//     //    console.log(localCsvPath);
//     // $.get( localCsvPath, function( openCsv ) {
//     //     appendCsvtoTable(openCsv)
//     // });

//     $.ajax({
//         type: "GET",
//         url: localCsvPath,
//         dataType: "text",
//         success: function(data) {
//             appendCsvtoTable(data);
//         }
//     }); 
// });


function editCsvFileRender(){
    $.ajax({
        type: "GET",
        url: $('#edit_parameter_file').val(),
        dataType: "text",
        success: function(data) {
            appendCsvtoTable(data);
        }
    }); 
}



// The event listener for the file upload
// document.getElementById('edit_parameter_file').addEventListener('change', upload, false);
// // The Drop event listener for the file upload.
// document.getElementById('edit_parameter_file').addEventListener('drop', upload, false);


// Method that checks that the browser supports the HTML5 File API
    // function browserSupportFileUpload() {
    //     var isCompatible = false;
    // if (window.File && window.FileReader && window.FileList && window.Blob) {
    //     isCompatible = true;
    // }
    //     return isCompatible;
    // }

// Method that reads and processes the selected file
    // function upload(evt) {        
    // if (!browserSupportFileUpload()) {
    //     alert('The File APIs are not fully supported in this browser!');
    //     } else {
    //         var data = null;
    //         var file = evt.target.files[0];

    //        var extension = file.name.replace(/^.*\./, '');
    //         // console.log(extension)
    //         if(extension === 'csv'){
    //             var reader = new FileReader();
    //             reader.readAsText(file);
    //             reader.onload = function(event) {
    //                 $('#csv-div-edit').show();
    //                 finalcsvArrayEdit = [];
    //                 var csvData = event.target.result;
    //                 appendCsvtoTable(csvData);

    //                 $("#edit_param_1").text(evt.target.files[0].name);
    //                 runQuestionRenderAndDisplay2();

    //             };
    //             reader.onerror = function() {
    //                 alert('Unable to read ' + file.fileName);
    //             };
    //         } else {
    //             swal("Cancelled", "Select Only CSV file.", "error");
    //             $('#edit_parameter_file"').val('');
    //             $("#csv_pre_tbl_body_edit").empty();
    //         }
    //     }
    // }


    
function appendCsvtoTable(csvData){    
    var csvArray = csvData.split("\n");
    var formattedString = [];

    var csvRows = [];
    var csvHeaderString = [];
    var csvRowsValue = [];
    
    for(i=0;i < csvArray.length;i++){
        formattedString.push('<tr><td>' + csvArray[i].split(",").join("</td><td>") + '</td></tr>');
        
        csvRows.push(csvArray[i].split(","));
        if(i === 0){
            csvHeaderString = csvArray[i].split(",");
        } else {
            
            var splitCell = csvArray[i].split(",");
            //Skip blank cell in row.
            if(jQuery.inArray("",splitCell) !== 0){
                csvRowsValue.push(csvArray[i]);
            }
        }
    }

    var randKey = Math.floor(Math.random()*csvRowsValue.length);
    if(randKey === -1){
        randKey = 1
    }
    
    var item = csvRowsValue[randKey];

    finalcsvArrayEdit = [];   
    var splitItem = item.split(",");
    for (i = 0; i < csvHeaderString.length; ++i)
    {
        //var outString = csvHeaderString[i].replace(/[`' '~!@#%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase().trim();
        var outString = csvHeaderString[i].trim();
        finalcsvArrayEdit[outString] = splitItem[i];
    }

    $("#edit_csv_pre_tbl_body").html('');
    for(i=0;i <= 5;i++){
        $("#edit_csv_pre_tbl_body").append(formattedString[i]); 
    }
}


function getRandomKey(csvRowsValue){
    var randKey = Math.floor(Math.random()*csvRowsValue.length);
    if(randKey === -1){
        randKey = 1
    }

    return randKey;
}

