// ----------------- For Question ---------------------
// For Add Section in Question
var que_count = 1;
$('#que_add_section_btn').click(function()
{
    var question_id = $(this).data("question_id");
    que_count += 1;
    $('#que_ul_list').append(
        '<li class="list_of_exersize" id="que_li_'+que_count+'" data-quid="'+que_count+'">'+
            '<div class="form-group">'+
                '<div class="row">'+
                    '<div class="col-md-5 col-lg-5 col-xl-3">'+
                        '<div class="df-select">'+
                            '<select class="selectpicker question_'+question_id+'_section_'+que_count+'_type required" name="question['+que_count+'][section_type]" id="que_section_type_'+que_count+'" data-question_id="'+question_id+'"  data-que_section_count="'+que_count+'" onchange="changeQueSectionType(this.id, this.value)">'+

                            '</select>'+
                        '</div>'+
                        ' <select style="Display:none;" class="dflt_slctpckr" id="que_span_detail_'+que_count+'" data-mode="create" data-part="question" data-question_id="'+que_count+'" data-que_section_count="'+que_count+'" onchange="changePluginType(this.id, this.value)">'+
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
                        ' </select>'+
                        '<div class="questn_circl">'+
                        '<span title="" style="cursor:pointer;display:none;" id="que_plugin_span_detail_'+que_count+'" onclick="showQuePluginList(1)">'+
                            '<i class="fa fa-question-circle-o"></i>'+
                        '</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-7 col-lg-7 col-xl-9" id="que_section_type_div_'+que_count+'">'+
                        '<textarea class="form-control question_'+question_id+'_section lang-dir required" name="question['+que_count+'][description]" id="que_description_'+que_count+'" data-question_id="'+question_id+'" data-quid="'+que_count+'" placeholder="'+message['description']+'" ></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<button type="button" class="close_icon" id="que_clear_btn_'+que_count+'" data-quecount="'+que_count+'" onclick="deleteQueSection(this.id)"></button>'+
        '</li>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);

        $('#que_section_type_'+que_count).append('<option value="'+ind+'">'+item2+'</option>');
    });
    $('#que_section_type_'+que_count).selectpicker('refresh');
    $('#preview_que_div').append('<div class="lang-dir" id="preview_que_section_'+que_count+'"></div>');
    $('.lang-dir').attr('dir', direction);
});

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

// For Delete Question Section
function deleteQueSection(id)
{
    var c = $('#'+id).attr('data-quecount');
    $('#que_li_'+c).remove();
    $('#preview_que_section_'+c).remove();
    runQuestionRenderAndDisplay();
}

// For CHange Question Section Type
function changeQueSectionType(id, stype)
{
    var c = $('#'+id).attr('data-que_section_count');
    var question_id = $('#'+id).attr('data-question_id');
    
    if(stype == 'image')
    {
        // $('#que_section_type_div_'+c).html('<div class="pramtr_file">'+
        //     '<input type="file" class="form-control question_'+question_id+'_section required filesize" name="question['+c+'][image]" id="que_image_'+c+'" accept="image/*" placeholder="'+message['upload_image']+'" data-question_id="1" onchange="getQueImagePreview(this.id)">'+
        //     '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
        //     '<span  class="filenme" aria-hidden="true"></span>'+
        //     '</div>'+'<label for="que_image_'+c+'" generated="true" class="error"></label>');

         $('#que_section_type_div_'+c).html('<div class="pramtr_file">'+
            '<input type="hidden" class="form-control question_'+question_id+'_section required filesize" name="question['+c+'][image]" id="que_image_'+c+'" placeholder="'+message['upload_image']+'" data-question_id="'+question_id+' required">'+
            '<span class="custm_btn image_'+id+'" id="image_'+id+'" data-mode="create" data-option="question" data-optionsection="" data-type="image" data-question_count="'+c+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true">'+message['choose_image']+'</span>'+
            '<span  class="filenme que_image_'+c+'" id="filename_'+c+'" aria-hidden="true"></span>'+
            '</div>'+'<label for="que_image_'+c+'" generated="true" class="error"></label>');

        
    }
    else if(stype == 'video')
    {
        $('#que_section_type_div_'+c).html(
            '<textarea class="form-control lang-dir required videourl txera_vdo question_'+question_id+'_section" name="question['+c+'][video]" id="que_video_'+c+'" placeholder="'+message['video_desc']+'" onpaste="getQueVideoPreview(this.id)" onkeyup="getQueVideoPreview(this.id)" onchange="getQueVideoPreview(this.id)"></textarea>'+
            '<label for="que_video_'+c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'audio')
    {
        // $('#que_section_type_div_'+c).html('<div class="pramtr_file">'+
        //     '<input type="file" class="form-control required filesize question_'+question_id+'_section" name="question['+c+'][audio]" id="que_audio_'+c+'" accept="audio/*" placeholder="'+message['upload_audio']+'" onchange="getQueAudioPreview(this.id)">'+
        //     '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
        //     '<span class="filenme" aria-hidden="true"></span>'+
        //     '</div>'+'<label for="que_audio_'+c+'" generated="true" class="error"></label>');

        $('#que_section_type_div_'+c).html('<div class="pramtr_file">'+
        '<input type="hidden" class="form-control question_'+question_id+'_section required filesize"  name="question['+c+'][audio]" id="que_audio_'+c+'"  placeholder="'+message['upload_audio']+'">'+
        '<span class="custm_btn audio_'+id+'" id="audio_'+id+'" data-mode="create" data-option="question" data-optionsection="" data-type="audio" data-question_count="'+c+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true">'+message['choose_audio']+'</span>'+
        '<span  class="filenme que_audio_'+c+'" id="audio_filename_'+c+'" aria-hidden="true"></span>'+
        '</div>'+'<label for="que_audio_'+c+'" generated="true" class="error"></label>');
    }
    else
    {
        $('#que_section_type_div_'+c).html('<textarea onkeyup="changeSpan('+c+')" class="form-control lang-dir question_'+question_id+'_section required" name="question['+c+'][description]" id="que_description_'+c+'" placeholder="'+message['description']+'"></textarea>');
    }

    if(stype == 'plugin') {
        $('#que_plugin_span_detail_'+c+'').css('display','block');
        $('#que_span_detail_'+c+'').css('display','block');
        $('#que_span_detail_'+c+'').parent('.bootstrap-select').removeClass('plgn-cstm-slctpckr');
        
        
    } else {
        $('#que_plugin_span_detail_'+c+'').css('display','none');
        $('#que_span_detail_'+c+'').css('display','none');
        $('#que_span_detail_'+c+'').parent('.bootstrap-select').addClass('plgn-cstm-slctpckr');
        $('#image_que_span_detail_'+c).remove();
        $('#audio_que_span_detail_'+c).remove();
    }
   
    $('#preview_que_section_'+c).html('');
    $('.lang-dir').attr('dir', direction);

    runQuestionRenderAndDisplay();
}

function changeSpan(c) {
    $("#que_description_"+c).on('keyup',function() {
        $("#que_span_detail_"+c).attr('title',$(this).val());
    });
    runQuestionRenderAndDisplay();
}
// ----------------- For Answer ---------------------
// Add More Answer Option
var ans_count = 1;
$('#add_more_ans_btn').click(function()
{
    ans_count += 1;
    var opt_text = $('p.name_answer').last().text();
    aCharCode = opt_text.charCodeAt(0) + 1;
    var option_name = String.fromCharCode(aCharCode);
    
    var question_id = $(this).attr('data-question_count');

    $('#ans_div').append(
        '<div id="ans_option_'+ans_count+'" class="question_'+question_id+'_answer_div" data-option_count="'+ans_count+'">'+
            '<ul class="mrgn-tp-40" id="ans_option_'+ans_count+'_ul_list">'+
                '<li class="list_of_exersize" id="ans_option_'+ans_count+'_li_1">'+
                    '<div class="form-group">'+
                        '<div class="row">'+
                            '<div class="col-md-5 col-lg-5 col-xl-4">'+
                                '<div class="answer_pdng rmv_btn_cls right_ans">'+
                                    '<button type="button" class="close_icon" id="ans_option_clear_btn_'+ans_count+'" data-option_count="'+ans_count+'" onclick="deleteAnsOption(this.id)"></button>'+
                                    '<div class="text_wt_icon">'+
                                        '<p class="name_answer" id="ans_option_'+ans_count+'_text">'+option_name+'</p>'+
                                    '</div>'+
                                    '<div class="df-select">'+
                                        '<select class="selectpicker question_'+question_id+'_answer_'+ans_count+'_section_1_type required" name="answer[op_'+ans_count+'][1][section_type]" id="ans_option_'+ans_count+'_section_type_1" data-question_count="'+question_id+'" data-option_count="'+ans_count+'" data-ans_section_count="1" data-ques_ans_section_count="1" onchange="changeAnsSectionType(this.id, this.value)">'+

                                        '</select>'+

                                        '<select style="Display:none;" class="dflt_slctpckr" id="ans_'+ans_count+'_span_detail_1" data-mode="create" data-part="answer" data-answer_id="'+ans_count+'" data-ans_section_count="1" onchange="changePluginType(this.id, this.value)">'+
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
                                    '</div>'+
                                    '<div class="questn_circl">' +
                                        '<span title="" style="cursor:pointer;display:none;"  onclick="showQuePluginList('+que_count+')" id="ans_plugin_'+ans_count+'_span_detail_1">'+
                                            '<i class="fa fa-question-circle-o"></i>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-md-7 col-lg-7 col-xl-8" id="ans_option_'+ans_count+'_section_type_div_1">'+
                            '<textarea class="form-control lang-dir question_'+question_id+'_answer_'+ans_count+'_section required" name="answer[op_'+ans_count+'][1][description]" id="ans_option_'+ans_count+'_description_1" data-question_count="'+question_id+'" data-option_count="'+ans_count+'" data-ans_section_count="1" data-ques_ans_section_count="1" placeholder='+ 
                            message['description'] +
                            '></textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    // '<button type="button" class="close_icon"></button>'+
                '</li>'+
            '</ul>'+
            '<div class="checkbox_action">'+
                '<div class="custom-control custom-checkbox wihtut_bg_ck float-left float_ar_right">'+
                    '<input name="correct" value="'+ans_count+'" id="is_correct_'+ans_count+'" type="radio" class="custom-control-input question_'+que_count+'_answer_'+ans_count+'_is_checked" data-option_count="'+ans_count+'" onchange="selectCorrectAns(this.id)">'+
                    '<label class="custom-control-label" for="is_correct_'+ans_count+'">'+message['is_correct']+'</label>'+
                '</div>'+
                '<div class="add_section_cls float-right float_ar_left">'+
                    '<a href="javascript:;" class="add_section_btn"  id="ans_option_'+ans_count+'_add_section_btn" data-option_count="'+ans_count+'" data-question_count="'+question_id+'" data-section_count="1" onclick="addMoreAnsOptionSection(this.id)">+ '+message['add_section']+'</a>'+
                '</div>'+
            '</div>'+
            '<div class="clearfix"></div>'+
        '</div>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);
        $('#ans_option_'+ans_count+'_section_type_1').append('<option value="'+ind+'">'+item2 +'</option>');
    });
    $('#ans_option_'+ans_count+'_section_type_1').selectpicker('refresh');
    $('.lang-dir').attr('dir', direction);
});

// For Delete Answer Option
function deleteAnsOption(id)
{
    var opt_c = $('#'+id).attr('data-option_count');
    $('#ans_option_'+opt_c).remove();
    $('#preview_option_'+opt_c).remove();

    var opt_text = 'A';
    var aCharCode = opt_text.charCodeAt(0);
    $('#preview_ans_option_div > ul > li').each(function(i) {
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
    $('#ans_div > div').each(function(i) {
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
        $('#is_correct_1').prop('checked', true);
        selectCorrectAns('is_correct_1');
    }
    runQuestionRenderAndDisplay();
}

// For Add More Answer Section Option wise
var ans_section_count = 1;
function addMoreAnsOptionSection(id)
{
    var sectionCount = Number($('#'+id).attr('data-section_count')) + 1;
    $('#'+id).attr('data-section_count',sectionCount);

    ans_section_count += 1;
    var option_count = $('#'+id).attr('data-option_count');
    var questioncount = $('#'+id).attr('data-question_count');
    $('#ans_option_'+option_count+'_ul_list').append(
        '<li class="list_of_exersize" id="ans_option_'+option_count+'_li_'+sectionCount+'">'+
            '<div class="form-group">'+
                '<div class="row">'+
                    '<div class="col-md-5 col-lg-5 col-xl-4">'+
                        '<div class="answer_pdng right_ans">'+
                            '<div class="df-select">'+
                                '<select class="selectpicker question_'+questioncount+'_answer_'+option_count+'_section_'+sectionCount+'_type required" name="answer[op_'+option_count+']['+sectionCount+'][section_type]" id="ans_option_'+option_count+'_section_type_'+sectionCount+'" data-question_count="'+questioncount+'" data-option_count="'+option_count+'" data-ans_section_count="'+sectionCount+'" data-ques_ans_section_count="'+sectionCount+'" onchange="changeAnsSectionType(this.id, this.value)">'+

                                '</select>'+

                               ' <select style="Display:none;" class="dflt_slctpckr" id="ans_'+option_count+'_span_detail_'+sectionCount+'" data-mode="create"  data-part="answer" data-answer_id="'+option_count+'" data-ans_section_count="'+sectionCount+'" onchange="changePluginType(this.id, this.value)">'+
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
                            '</div>'+
                            '<div class="questn_circl">' +
                                '<span title="" style="cursor:pointer;display:none;"  onclick="showQuePluginList('+ans_section_count+')" id="ans_plugin_'+option_count+'_span_detail_'+sectionCount+'">'+
                                    '<i class="fa fa-question-circle-o"></i>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-7 col-lg-7 col-xl-8" id="ans_option_'+option_count+'_section_type_div_'+sectionCount+'">'+
                        '<textarea class="form-control question_'+questioncount+'_answer_'+option_count+'_section  lang-dir required" name="answer[op_'+option_count+']['+sectionCount+'][description]" id="ans_option_'+option_count+'_description_'+sectionCount+'" data-option_count="'+option_count+'" data-ans_section_count="'+sectionCount+'" data-ques_ans_section_count="'+sectionCount+'" placeholder="'
                        + message['description'] + '"></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<button type="button" class="close_icon" id="ans_clear_btn_'+sectionCount+'" data-option_count="'+option_count+'" data-ans_section_count="'+sectionCount+'" onclick="deleteAnsSection(this.id)"></button>'+
        '</li>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);
        $('#ans_option_'+option_count+'_section_type_'+sectionCount).append('<option value="'+ind+'">'+item2+'</option>');
    });
    $('#ans_option_'+option_count+'_section_type_'+sectionCount).selectpicker('refresh');
    $('.lang-dir').attr('dir', direction);
}

// For Delete Answer Option Section
function deleteAnsSection(id)
{
    var opt_c = $('#'+id).attr('data-option_count');
    var sec_c = $('#'+id).attr('data-ans_section_count');
    $('#ans_option_'+opt_c+'_li_'+sec_c).remove();
    $('#preview_option_'+opt_c+'_section_'+sec_c).remove();
    runQuestionRenderAndDisplay();
}

// For CHange Answer Section Type
function changeAnsSectionType(id, stype)
{
    var opt_c = $('#'+id).attr('data-option_count');
    var sec_c = $('#'+id).attr('data-ans_section_count');
    var sectionCount = $('#'+id).attr('data-ques_ans_section_count');
    var divEle = $('#ans_option_'+opt_c+'_section_type_div_'+sec_c);
    var questioncount = $('#'+id).attr('data-question_count');
    
    if(stype == 'image')
    {
        // divEle.html('<div class="pramtr_file">'+
        //     '<input type="file" class="prmtr_sn form-control required filesize  question_'+questioncount+'_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sectionCount+'][image]" id="ans_option_'+opt_c+'_image_'+sec_c+'" accept="image/*" placeholder="'+ message['upload_image']+'" data-option_count="'+opt_c+'" data-ans_section_count="'+sectionCount+'" onchange="getAnsImagePreview(this.id)">'+
        //     '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
        //     '<span id="answr_2" class="filenme" aria-hidden="true"></span>'+
        //     '</div>'+'<label for="ans_option_'+opt_c+'_image_'+sec_c+'" generated="true" class="error"></label>');

        divEle.html('<div class="pramtr_file">'+
            '<input type="hidden" class="prmtr_sn form-control required filesize  question_'+questioncount+'_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sectionCount+'][image]" id="ans_option_'+opt_c+'_image_'+sectionCount+'" placeholder="'+ message['upload_image']+'" data-option_count="'+opt_c+'" data-ans_section_count="'+sectionCount+'">'+
            '<span class="custm_btn image_'+id+'" id="image_'+id+'" data-mode="create" data-option="answer" data-optionsection="'+sectionCount+'" data-type="image" data-question_count="'+opt_c+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true">'+message['choose_image']+'</span>'+
            '<span  class="filenme ans_option_'+opt_c+'_image_'+sectionCount+'" id="ans_filename_'+opt_c+'_image_'+sectionCount+'" aria-hidden="true"></span>'+
            '</div>'+'<label for="ans_option_'+opt_c+'_image_'+sectionCount+'" generated="true" class="error"></label>'
            );
    }   
    else if(stype == 'video') 
    {
        divEle.html(
            '<textarea class="form-control lang-dir required videourl txera_vdo question_'+questioncount+'_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sectionCount+'][video]" id="ans_option_'+opt_c+'_video_'+sec_c+'" placeholder="'+message['video_desc']+'" data-option_count="'+opt_c+'" data-ans_section_count="'+sectionCount+'" onpaste="getAnsVideoPreview(this.id)" onkeyup="getAnsVideoPreview(this.id)" onchange="getAnsVideoPreview(this.id)"></textarea>'+
            '<label for="ans_option_'+opt_c+'_video_'+sec_c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'audio')
    {
        // divEle.html(
        //     '<div class="pramtr_file">'+
        //     '<input type="file" class="form-control required filesize question_'+questioncount+'_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sectionCount+'][audio]" id="ans_option_'+opt_c+'_audio_'+sec_c+'" accept="audio/*" placeholder="'+message['upload_audio']+'" data-option_count="'+opt_c+'" data-ans_section_count="'+sectionCount+'" onchange="getAnsAudioPreview(this.id)">'+
        //     '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
        //     '<span class="filenme" aria-hidden="true"></span>'+
        //     '</div>'+'<label for="ans_option_'+opt_c+'_audio_'+sec_c+'" generated="true" class="error"></label>');
        divEle.html('<div class="pramtr_file">'+
            '<input type="hidden" class="prmtr_sn form-control required filesize  question_'+questioncount+'_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sectionCount+'][audio]" id="ans_option_'+opt_c+'_audio_'+sectionCount+'" placeholder="'+ message['upload_audio']+'" data-option_count="'+opt_c+'" data-ans_section_count="'+sectionCount+'">'+
            '<span class="custm_btn audio_'+id+'" id="audio_'+id+'" data-mode="create" data-option="answer" data-optionsection="'+sectionCount+'" data-type="audio" data-question_count="'+opt_c+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true">'+message['choose_audio']+'</span>'+
            '<span  class="filenme ans_option_'+opt_c+'_audio_'+sectionCount+'" id="ans_filename_'+opt_c+'_audio_'+sectionCount+'" aria-hidden="true"></span>'+
            '</div>'+'<label for="ans_option_'+opt_c+'_audio_'+sectionCount+'" generated="true" class="error"></label>');
    }
    else
    {
        divEle.html('<textarea class="form-control lang-dir required question_'+questioncount+'_answer_'+opt_c+'_section" name="answer[op_'+opt_c+']['+sectionCount+'][description]" id="ans_option_'+opt_c+'_description_'+sectionCount+'" placeholder="'+message['description']+'" data-option_count="'+opt_c+'" data-ans_section_count="'+sectionCount+'"></textarea>');
    }

    if(stype == 'plugin') {
        
        $('#ans_plugin_'+opt_c+'_span_detail_'+sectionCount+'').css('display','block');
        $('#ans_'+opt_c+'_span_detail_'+sectionCount+'').css('display','block');
        $('#ans_'+opt_c+'_span_detail_'+sectionCount+'').parent('.bootstrap-select').removeClass('plgn-cstm-slctpckr');
    } else {
        
        $('#ans_plugin_'+opt_c+'_span_detail_'+sectionCount+'').css('display','none');
        $('#ans_'+opt_c+'_span_detail_'+sectionCount+'').css('display','none');

        $('#ans_'+opt_c+'_span_detail_'+sectionCount+'').parent('.bootstrap-select').addClass('plgn-cstm-slctpckr');

        $('#image_ans_'+opt_c+'_span_detail_'+sectionCount+'').remove();
        $('#audio_ans_'+opt_c+'_span_detail_'+sectionCount+'').remove();
    }
    $('#preview_option_'+opt_c+'_section_'+sec_c).html('');
    $('.lang-dir').attr('dir', direction);

    runQuestionRenderAndDisplay();
}

// For Select Correct Answer
function selectCorrectAns(id)
{
    var opt_c = $('#'+id).attr('data-option_count');
    $('p.option_name').removeClass('coorect_prvew');
    $('#preview_option_name_'+opt_c).addClass('coorect_prvew');
    $('p.name_answer').removeClass('correct_answer');
    $('#ans_option_'+opt_c+'_text').addClass('correct_answer');
    runQuestionRenderAndDisplay();
}

// ----------------- For Hint ---------------------
// Add More Hint
var multi_hint_count = 1;
$('#add_more_hint_btn').click(function()
{
    multi_hint_count += 1;
    var opt_text = $('p.name_hint').last().text();
    var hint_name = parseInt(opt_text.substr(opt_text.indexOf("H") + 1))+ + +1;
    var question_id = $(this).data('question_count');
    var hintsectioncount = $(this).data('hint_section_count');

    $('#hint_div').append(
        '<div id="hint_'+multi_hint_count+'" class="question_'+question_id+'_hint_div" data-option_count="'+multi_hint_count+'">'+
            '<ul id="hint_'+multi_hint_count+'_ul_list">'+
                '<li class="list_of_exersize pdng_70_lft" id="hint_'+multi_hint_count+'_li_1">'+
                    '<div class="form-group">'+
                        '<div class="row">'+
                            '<div class="col-md-5 col-lg-5 col-xl-4">'+
                                '<div class="answer_pdng rmv_btn_cls right_ans">'+
                                    '<button type="button" class="close_icon" id="clear_hint_btn_'+multi_hint_count+'" data-hint_count="'+multi_hint_count+'" onclick="removeHint(this.id)"></button>'+
                                    '<div class="text_wt_icon">'+
                                        '<p class="name_hint" id="hint_'+multi_hint_count+'_text">H'+hint_name+'. </p>'+
                                    '</div>'+
                                    '<div class="df-select">'+
                                        '<select class="selectpicker  question_'+question_id+'_hint_'+multi_hint_count+'_section_1_type" name="hint['+multi_hint_count+'][1][section_type]" id="hint_'+multi_hint_count+'_section_type_1" data-hint_count="'+multi_hint_count+'" data-question_count="'+question_id+'" data-question_count="'+question_id+'" data-hint_section_count="1" onchange="changeHintSectionType(this.id, this.value)">'+

                                        '</select>'+

                                        '<select style="Display:none;" class="dflt_slctpckr" id="hint_'+multi_hint_count+'_span_detail_1" data-mode="create"  data-part="hint" data-hint_id="'+multi_hint_count+'" data-hint_section_count="1" onchange="changePluginType(this.id, this.value)">'+
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
                                    '</div>'+
                                    '<div class="questn_circl">' +
                                        '<span title="" style="cursor:pointer;display:none;"  onclick="showQuePluginList('+multi_hint_count+')" id="hint_plugin_'+hint_name+'_span_detail_'+hintsectioncount+'">'+
                                            '<i class="fa fa-question-circle-o"></i>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-md-7 col-lg-7 col-xl-8" id="hint_'+multi_hint_count+'_section_type_div_1">'+
                                '<textarea class="form-control lang-dir question_'+question_id+'_hint_'+multi_hint_count+'_section required" name="hint['+multi_hint_count+'][1][description]" id="hint_'+multi_hint_count+'_description_1" data-hint_count="'+multi_hint_count+'" data-hint_section_count="1" data-question_count="'+question_id+'" placeholder="'+message['description']+'"></textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</li>'+
            '</ul>'+
            '<div class="add_section_cls text-right text-ar-left">'+
            '<a href="javascript:;" class="add_section_btn" data-question_count="'+question_id+'" data-hintcount="'+multi_hint_count+'" data-hint_section_count="1" id="hint_'+multi_hint_count+'_add_section_btn" onclick="addMoreHintSection(this.id)">+ '+message['add_section']+' </a>'+
            '</div>'+
        '</div>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);
        $('#hint_'+multi_hint_count+'_section_type_1').append('<option value="'+ind+'">'+item2+'</option>');
    });
    $('#hint_'+multi_hint_count+'_section_type_1').selectpicker('refresh');
    // For Preview
    $('#preview_hint_div > ul').append('<li class="" id="preview_hint_'+multi_hint_count+'"></li>');
    //$('#preview_hint_div > ul > li#preview_hint_'+multi_hint_count).prepend('<p class="option_name hint_name" id="preview_hint_name_'+multi_hint_count+'">H'+hint_name+'. </p>');
    $('.lang-dir').attr('dir', direction);
});

// For Delete Hint
function removeHint(id)
{
    var hin_c = $('#'+id).attr('data-hint_count');
    $('#hint_'+hin_c).remove();
    $('#preview_hint_'+hin_c).remove();

    var opt_text = 'H';
    $('#preview_hint_div > ul > li').each(function(i) {
        var hint_name = opt_text+(i+ + 1);
        if($(this).find('p.hint_name').length > 0)
            $(this).find('p.hint_name').html(hint_name+'.&nbsp;');
    });

    var opt_text = 'H';
    $('#hint_div > div').each(function(i) {
        var hint_name = opt_text+(i+ + 1);
        if($(this).find('ul > li').find('div.text_wt_icon').find('p.name_hint').length > 0)
            $(this).find('ul > li').find('div.text_wt_icon').find('p.name_hint').html(hint_name+' ');
    });
    runQuestionRenderAndDisplay();
}

// For Add Section in Hint
var hint_section_count = 1;
function addMoreHintSection(id)
{
    var hintnewSectionCount = Number($('#'+id).attr('data-hint_section_count')) + 1;
    $('#'+id).attr('data-hint_section_count',hintnewSectionCount);

    hint_section_count += 1;
    var hint_count = $('#'+id).attr('data-hintcount');
    var question_count = $('#'+id).attr('data-question_count');
    var hintsectioncount = $('#'+id).data('hint_section_count');

    $('#hint_'+hint_count+'_ul_list').append(
        '<li class="list_of_exersize" id="hint_'+hint_count+'_li_'+hint_section_count+'">'+
            '<div class="form-group">'+
                '<div class="row">'+
                    '<div class="col-md-5 col-lg-5 col-xl-4">'+
                      '<div class="answer_pdng">'+
                        '<div class="df-select">'+
                            '<select class="selectpicker question_'+question_count+'_hint_'+hint_count+'_section_'+hintnewSectionCount+'_type" name="hint['+hint_count+']['+hintnewSectionCount+'][section_type]" id="hint_'+hint_count+'_section_type_'+hintnewSectionCount+'" data-hint_count="'+hint_count+'" data-question_count="'+question_count+'"  data-hint_section_count="'+hintnewSectionCount+'" onchange="changeHintSectionType(this.id, this.value)">'+

                            '</select>'+

                            '<select style="Display:none;" class="dflt_slctpckr" id="hint_'+hint_count+'_span_detail_'+hintnewSectionCount+'" data-mode="create"  data-part="hint" data-hint_id="'+hint_count+'" data-hint_section_count="'+hintnewSectionCount+'" onchange="changePluginType(this.id, this.value)">'+
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
                        '</div>'+
                        '<div class="questn_circl">' +
                            '<span title="" style="cursor:pointer;display:none;"  onclick="showQuePluginList('+hint_section_count+')" id="hint_plugin_'+hint_count+'_span_detail_'+hintnewSectionCount+'">'+
                                '<i class="fa fa-question-circle-o"></i>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="col-md-7 col-lg-7 col-xl-8" id="hint_'+hint_count+'_section_type_div_'+hintnewSectionCount+'">'+
                        '<textarea class="form-control lang-dir question_'+question_count+'_hint_'+hint_count+'_section required" name="hint['+hint_count+']['+hintnewSectionCount+'][description]" id="hint_'+hint_count+'_description_'+hintnewSectionCount+'" data-hint_count="'+hint_count+'" data-question_count="'+question_count+'"  data-hint_section_count="'+hintnewSectionCount+'" placeholder="'+message['description']+'" oninput="getHintPreview(this.id)"></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<button type="button" class="close_icon" id="hint_clear_btn_'+hint_section_count+'" data-question_count="'+question_count+'"  data-hintcount="'+hint_count+'" data-hintsectioncount="'+hint_section_count+'" onclick="deleteHintSection(this.id)"></button>'+
        '</li>'
    );
    $.each(sectionArr, function(ind, item){
        var item2 = languageTranslates(item);
        $('#hint_'+hint_count+'_section_type_'+hintnewSectionCount).append('<option value="'+ind+'">'+item2+'</option>');
    });
    $('#hint_'+hint_count+'_section_type_'+hintnewSectionCount).selectpicker('refresh');
    // For Preview
    $('#preview_hint_div > ul > li#preview_hint_'+hint_count).append('<div  class="ttt" id="preview_hint_'+hint_count+'_section_'+hintnewSectionCount+'"></div>');
    $('.lang-dir').attr('dir', direction);
}

// For Delete Hint Section
function deleteHintSection(id)
{
    var sc = $('#'+id).attr('data-hintsectioncount');
    var hc = $('#'+id).attr('data-hintcount');
    $('#hint_'+hc+'_li_'+sc).remove();
    $('#preview_hint_'+hc+'_section_'+sc).remove();
    if($('#preview_hint_div').length <= 0)
    $('#preview_hint_title').hide();
    runQuestionRenderAndDisplay();
}

// For CHange Hint Section Type
function changeHintSectionType(id, stype)
{
    var sc = $('#'+id).attr('data-hint_section_count');
    var hc = $('#'+id).attr('data-hint_count');
    var question_id = $('#'+id).attr('data-question_count');


    if(stype == 'image')
    {
        // $('#hint_'+hc+'_section_type_div_'+sc).html('<div class="pramtr_file">'+
        //     '<input type="file" class="form-control required filesize  question_'+question_id+'_hint_'+hc+'_section" name="hint['+hc+']['+sc+'][image]" id="hint_'+hc+'_image_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="'+question_id+'" accept="image/*" placeholder="'+message['upload_image']+'" onchange="getHintImagePreview(this.id)">'+
        //     '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
        //     '<span class="filenme" aria-hidden="true"></span>'+
        //     '</div>'+'<label for="hint_'+hc+'_image_'+sc+'" generated="true" class="error"></label>');

        $('#hint_'+hc+'_section_type_div_'+sc).html('<div class="pramtr_file">'+
        '<input type="hidden" class="form-control required filesize  question_'+question_id+'_hint_'+hc+'_section" name="hint['+hc+']['+sc+'][image]" id="hint_'+hc+'_image_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="'+question_id+'" placeholder="'+message['upload_image']+'">'+
        '<span class="custm_btn image_'+id+'" id="image_'+id+'" data-mode="create" data-option="hint" data-optionsection="'+sc+'" data-type="image" data-question_count="'+hc+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets" aria-hidden="true">'+message['choose_audio']+'</span>'+
        '<span class="file-txt filenme hint_'+hc+'_image_'+sc+'" id="hint_filename_'+hc+'_image_'+sc+'" aria-hidden="true"></span>'+
        '</div>'+'<label for="hint_'+hc+'_image_'+sc+'" generated="true" class="error"></label>'
        );
            
    }
    else if(stype == 'video')
    {
        $('#hint_'+hc+'_section_type_div_'+sc).html(
            '<textarea class="form-control lang-dir required videourl txera_vdo question_'+question_id+'_hint_'+hc+'_section" name="hint['+hc+']['+sc+'][video]" id="hint_'+hc+'_video_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="'+question_id+'" placeholder="'+message['video_desc']+'" onpaste="getHintVideoPreview(this.id)" onkeyup="getHintVideoPreview(this.id)" onchange="getHintVideoPreview(this.id)"></textarea>'+
            '<label for="hint_'+hc+'_video_'+sc+'" generated="true" class="error"></label>');
    }
    else if(stype == 'audio')
    {
        // $('#hint_'+hc+'_section_type_div_'+sc).html('<div class="pramtr_file">'+
        //     '<input type="file" class="form-control required filesize question_'+question_id+'_hint_'+hc+'_section" name="hint['+hc+']['+sc+'][audio]" id="hint_'+hc+'_audio_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="'+question_id+'" accept="audio/*" placeholder="'+message['upload_audio']+'" onchange="getHintAudioPreview(this.id)" >'+
        //     '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
        //     '<span class="filenme" aria-hidden="true"></span>'+
        //     '</div>'+'<label for="hint_'+hc+'_audio_'+sc+'" generated="true" class="error"></label>');

        $('#hint_'+hc+'_section_type_div_'+sc).html('<div class="pramtr_file">'+
        '<input type="hidden" class="form-control required filesize question_'+question_id+'_hint_'+hc+'_section" name="hint['+hc+']['+sc+'][audio]" id="hint_'+hc+'_audio_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="'+question_id+'" accept="audio/*" placeholder="'+message['upload_audio']+'" >'+
        '<span class="custm_btn audio_'+id+'" aria-hidden="true" id="audio_'+id+'" data-mode="create" data-option="hint" data-optionsection="'+sc+'" data-type="audio" data-question_count="'+hc+'" onclick="showAsset(this.id);" data-toggle="modal" data-target="#plugin_assets">'+message['choose_image']+'</span>'+
        '<span class="filenme hint_'+hc+'_audio_'+sc+'" id="hint_filename_'+hc+'_audio_'+sc+'" aria-hidden="true"></span></div>'+'<label for="hint_'+hc+'_audio_'+sc+'" generated="true" class="error"></label>');
    }
    else
    {
        $('#hint_'+hc+'_section_type_div_'+sc).html('<textarea class="form-control lang-dir question_'+question_id+'_hint_'+hc+'_section required" name="hint['+hc+']['+sc+'][description]" id="hint_'+hc+'_description_'+sc+'" data-hint_count="'+hc+'" data-hint_section_count="'+sc+'" data-question_count="'+question_id+'" placeholder="'+message['description']+'"></textarea>');
    }
    if(stype == 'plugin') {
        $('#hint_plugin_'+hc+'_span_detail_'+sc+'').css('display','block');
        $('#hint_'+hc+'_span_detail_'+sc+'').css('display','block');
        $('#hint_'+hc+'_span_detail_'+sc+'').parent('.bootstrap-select').removeClass('plgn-cstm-slctpckr');
    } else {
        $('#hint_plugin_'+hc+'_span_detail_'+sc+'').css('display','none');
        $('#hint_'+hc+'_span_detail_'+sc+'').css('display','none');
        $('#hint_'+hc+'_span_detail_'+sc+'').parent('.bootstrap-select').addClass('plgn-cstm-slctpckr');

        $('#image_hint_'+hc+'_span_detail_'+sc+'').remove();
        $('#audio_hint_'+hc+'_span_detail_'+sc+'').remove();
    }
    $('#preview_hint_'+hc+'_section_'+sc).html('');
    $('.lang-dir').attr('dir', direction);

    runQuestionRenderAndDisplay();
}


// ----------------- For Question Preview ---------------------

// For Question Image Preview
function getQueImagePreview(id)
{
    var fileInput = document.getElementById(id);  
    if (fileInput.files != undefined && fileInput.files[0] != undefined) { 
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);    
    }
    runQuestionRenderAndDisplay();
   
}

// For Question Video Preview
function getQueVideoPreview(id)
{
    runQuestionRenderAndDisplay();
}

// For Question Audio Preview
function getQueAudioPreview(id)
{
    var fileInput = document.getElementById(id);
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }
    runQuestionRenderAndDisplay();
}

// -------------------------------------------------------------------
// For Answer Option Image Preview
function getAnsImagePreview(id)
{   

    var fileInput = document.getElementById(id);
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }
    runQuestionRenderAndDisplay();   

}
// For Answer Option Video Preview
function getAnsVideoPreview(id)
{
    runQuestionRenderAndDisplay();   
}
// For Answer Option Audio Preview
function getAnsAudioPreview(id)
{
    var fileInput = document.getElementById(id);
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }
    runQuestionRenderAndDisplay();   
}

// ---------------------------------------------------------------------
// For Hint Text Preview

// For Hint Text Preview
function getHintPreview(id)
{
    var currentVal = $('#'+id).val();
    var sec_c = id.substr(id.lastIndexOf("_") + 1);
    var hin_c = $('#'+id).attr('data-hint_count');

    if($('#preview_hint_'+hin_c).length > 0) {
        if($('#preview_hint_'+hin_c+'_section_'+sec_c).length > 0) {
            if($('#preview_hint_'+hin_c+'_section_'+sec_c+'text').length > 0)
                $('#preview_hint_'+hin_c+'_section_'+sec_c+'text').text(currentVal);
            else
                $('div#preview_hint_'+hin_c+'_section_'+sec_c).append('<p class="text-new-line" id="preview_hint_'+hin_c+'_section_'+sec_c+'text">'+currentVal+'</p>');
        } else {
            $('li#preview_hint_'+hin_c).append('<div class="ttt" id="preview_hint_'+hin_c+'_section_'+sec_c+'"><p id="preview_hint_'+hin_c+'_section_'+sec_c+'text">'+currentVal+'</p></div>');
        }
    }
    runQuestionRenderAndDisplay();
}

// For Hint Image Preview
function getHintImagePreview(id)
{
    
    var fileInput = document.getElementById(id);
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }
    runQuestionRenderAndDisplay();     
}

function getHintVideoPreview(id)
{
    runQuestionRenderAndDisplay();
}

// For Hint Audio Preview
function getHintAudioPreview(id)
{
    var fileInput = document.getElementById(id);
    if (fileInput.files != undefined && fileInput.files[0] != undefined) {
        $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    }
    runQuestionRenderAndDisplay();   
}

// ----------------------------------------------------------------------------
// For Parameter
$('#add_parameter').click(function(){
    $('#main_nw_accordian').show();
    $('#remove_parameter').show();
    $('#parameter_file').addClass('required');
    $(this).hide();
});
$('#remove_parameter').click(function(){
    $('#csv-div').hide();
    $('#parameter_file').val('');
    $('#answr_1').html('');
    $('#main_nw_accordian').hide();
    $('#add_parameter').show();
    $('#parameter_file').removeClass('required');
    $(this).hide();
});

// For Cancel Button
$('#cancel_que_btn').click(function(e){
    $('#pills-tab > li > a[href="#summary"]').tab('show');
    document.documentElement.scrollTop = 0;
});

// For Range Slider

function saveTextAsFile1(textToSave)
{
    
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    // var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
    var fileNameToSaveAs = textToSave;
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    // downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}


