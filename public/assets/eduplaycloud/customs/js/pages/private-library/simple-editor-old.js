// ----------------- For Question ---------------------
// For Add Section in Question
var que_count = 1;
$('#que_add_section_btn').click(function()
{
    que_count += 1;
    $('#que_ul_list').append(
        '<li class="list_of_exersize" id="que_li_'+que_count+'">'+
            '<div class="form-group">'+
                '<div class="row">'+
                    '<div class="col-md-5 col-lg-5 col-xl-3">'+
                        '<div class="df-select">'+
                            '<select class="selectpicker required" name="question['+que_count+'][section_type]" id="que_section_type_'+que_count+'" data-que_section_count="'+que_count+'" onchange="changeQueSectionType(this.id, this.value)">'+

                            '</select>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-7 col-lg-7 col-xl-9" id="que_section_type_div_'+que_count+'">'+
                        '<textarea class="form-control lang-dir required" name="question['+que_count+'][description]" id="que_description_'+que_count+'" placeholder="'+message['description']+'"></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<button type="button" class="close_icon" id="que_clear_btn_'+que_count+'" data-quecount="'+que_count+'" onclick="deleteQueSection(this.id)"></button>'+
        '</li>'
    );
    $.each(sectionArr, function(ind, item){
        $('#que_section_type_'+que_count).append('<option value="'+ind+'">'+item+'</option>');
    });
    $('#que_section_type_'+que_count).selectpicker('refresh');
    $('#preview_que_div').append('<div class="lang-dir" id="preview_que_section_'+que_count+'"></div>');
    $('.lang-dir').attr('dir', direction);
});

// For Delete Question Section
function deleteQueSection(id)
{
    var c = $('#'+id).attr('data-quecount');
    $('#que_li_'+c).remove();
    $('#preview_que_section_'+c).remove();
}

// For CHange Question Section Type
function changeQueSectionType(id, stype)
{
    var c = $('#'+id).attr('data-que_section_count');
    if(stype == 'image')
    {
        $('#que_section_type_div_'+c).html('<div class="pramtr_file">'+
            '<input type="file" class="form-control required filesize" name="question['+c+'][image]" id="que_image_'+c+'" accept="image/*" placeholder="'+message['upload_image']+'" onchange="getQueImagePreview(this.id)">'+
            '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
            '<span  class="filenme" aria-hidden="true"></span>'+
            '</div>'+'<label for="que_image_'+c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'video')
    {
        $('#que_section_type_div_'+c).html(
            '<textarea class="form-control lang-dir required videourl txera_vdo" name="question['+c+'][video]" id="que_video_'+c+'" placeholder="'+message['video_desc']+'" onpaste="getQueVideoPreview(this.id)" onkeyup="getQueVideoPreview(this.id)" onchange="getQueVideoPreview(this.id)"></textarea>'+
            '<label for="que_video_'+c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'audio')
    {
        $('#que_section_type_div_'+c).html('<div class="pramtr_file">'+
            '<input type="file" class="form-control required filesize" name="question['+c+'][audio]" id="que_audio_'+c+'" accept="audio/*" placeholder="'+message['upload_audio']+'" onchange="getQueAudioPreview(this.id)">'+
            '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
            '<span class="filenme" aria-hidden="true"></span>'+
            '</div>'+'<label for="que_audio_'+c+'" generated="true" class="error"></label>');
    }
    else
    {
        $('#que_section_type_div_'+c).html('<textarea class="form-control lang-dir required" name="question['+c+'][description]" id="que_description_'+c+'" placeholder="'+message['description']+'"></textarea>');
    }
    $('#preview_que_section_'+c).html('');
    $('.lang-dir').attr('dir', direction);
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

    $('#ans_div').append(
        '<div id="ans_option_'+ans_count+'">'+
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
                                        '<select class="selectpicker required" name="answer[op_'+ans_count+'][1][section_type]" id="ans_option_'+ans_count+'_section_type_1" data-option_count="'+ans_count+'" data-ans_section_count="1" onchange="changeAnsSectionType(this.id, this.value)">'+

                                        '</select>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-md-7 col-lg-7 col-xl-8" id="ans_option_'+ans_count+'_section_type_div_1">'+
                                '<textarea class="form-control lang-dir required" name="answer[op_'+ans_count+'][1][description]" id="ans_option_'+ans_count+'_description_1" data-option_count="'+ans_count+'" placeholder='+ 
                                message['description'] +
                                'oninput="getAnsOptionPreview(this.id)"></textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    // '<button type="button" class="close_icon"></button>'+
                '</li>'+
            '</ul>'+
            '<div class="checkbox_action">'+
                '<div class="custom-control custom-checkbox wihtut_bg_ck float-left float_ar_right">'+
                    '<input name="correct" value="'+ans_count+'" id="is_correct_'+ans_count+'" type="radio" class="custom-control-input" data-option_count="'+ans_count+'" onchange="selectCorrectAns(this.id)">'+
                    '<label class="custom-control-label" for="is_correct_'+ans_count+'">'+message['is_correct']+'</label>'+
                '</div>'+
                '<div class="add_section_cls float-right float_ar_left">'+
                    '<a href="javascript:;" class="add_section_btn"  id="ans_option_'+ans_count+'_add_section_btn" data-option_count="'+ans_count+'" onclick="addMoreAnsOptionSection(this.id)">+ '+message['add_section']+'</a>'+
                '</div>'+
            '</div>'+
            '<div class="clearfix"></div>'+
        '</div>'
    );
    $.each(sectionArr, function(ind, item){
        $('#ans_option_'+ans_count+'_section_type_1').append('<option value="'+ind+'">'+item+'</option>');
    });
    $('#ans_option_'+ans_count+'_section_type_1').selectpicker('refresh');
    // For Preview
    $('#preview_ans_option_div > ul').append('<li class="" id="preview_option_'+ans_count+'"></li>');
    var option_name = getAnswerOptionName();
    $('#preview_option_'+ans_count).prepend('<p class="option_name" id="preview_option_name_'+ans_count+'">'+option_name+' </p>');
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
}

// For Add More Answer Section Option wise
var ans_section_count = 1;
function addMoreAnsOptionSection(id)
{
    ans_section_count += 1;
    var option_count = $('#'+id).attr('data-option_count');
    $('#ans_option_'+option_count+'_ul_list').append(
        '<li class="list_of_exersize" id="ans_option_'+option_count+'_li_'+ans_section_count+'">'+
            '<div class="form-group">'+
                '<div class="row">'+
                    '<div class="col-md-5 col-lg-5 col-xl-4">'+
                        '<div class="answer_pdng right_ans">'+
                            '<div class="df-select">'+
                                '<select class="selectpicker required" name="answer[op_'+option_count+']['+ans_section_count+'][section_type]" id="ans_option_'+option_count+'_section_type_'+ans_section_count+'" data-option_count="'+option_count+'" data-ans_section_count="'+ans_section_count+'" onchange="changeAnsSectionType(this.id, this.value)">'+

                                '</select>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-7 col-lg-7 col-xl-8" id="ans_option_'+option_count+'_section_type_div_'+ans_section_count+'">'+
                        '<textarea class="form-control lang-dir required" name="answer[op_'+option_count+']['+ans_section_count+'][description]" id="ans_option_'+option_count+'_description_'+ans_section_count+'" data-option_count="'+option_count+'" oninput="getAnsOptionPreview(this.id)" placeholder="'
                        + message['description'] + '"></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<button type="button" class="close_icon" id="ans_clear_btn_'+ans_section_count+'" data-option_count="'+option_count+'" data-ans_section_count="'+ans_section_count+'" onclick="deleteAnsSection(this.id)"></button>'+
        '</li>'
    );
    $.each(sectionArr, function(ind, item){
        $('#ans_option_'+option_count+'_section_type_'+ans_section_count).append('<option value="'+ind+'">'+item+'</option>');
    });
    $('#ans_option_'+option_count+'_section_type_'+ans_section_count).selectpicker('refresh');
    $('.lang-dir').attr('dir', direction);
}

// For Delete Answer Option Section
function deleteAnsSection(id)
{
    var opt_c = $('#'+id).attr('data-option_count');
    var sec_c = $('#'+id).attr('data-ans_section_count');
    $('#ans_option_'+opt_c+'_li_'+sec_c).remove();
    $('#preview_option_'+opt_c+'_section_'+sec_c).remove();
}

// For CHange Answer Section Type
function changeAnsSectionType(id, stype)
{
    var opt_c = $('#'+id).attr('data-option_count');
    var sec_c = $('#'+id).attr('data-ans_section_count');
    var divEle = $('#ans_option_'+opt_c+'_section_type_div_'+sec_c);
    if(stype == 'image')
    {
        divEle.html('<div class="pramtr_file">'+
            '<input type="file" class="prmtr_sn form-control required filesize" name="answer[op_'+opt_c+']['+sec_c+'][image]" id="ans_option_'+opt_c+'_image_'+sec_c+'" accept="image/*" placeholder="'+ message['upload_image']+'" data-option_count="'+opt_c+'" onchange="getAnsImagePreview(this.id)">'+
            '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
            '<span id="answr_2" class="filenme" aria-hidden="true"></span>'+
            '</div>'+'<label for="ans_option_'+opt_c+'_image_'+sec_c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'video') 
    {
        divEle.html(
            '<textarea class="form-control lang-dir required videourl txera_vdo" name="answer[op_'+opt_c+']['+sec_c+'][video]" id="ans_option_'+opt_c+'_video_'+sec_c+'" placeholder="'+message['video_desc']+'" data-option_count="'+opt_c+'" onpaste="getAnsVideoPreview(this.id)" onkeyup="getAnsVideoPreview(this.id)" onchange="getAnsVideoPreview(this.id)"></textarea>'+
            '<label for="ans_option_'+opt_c+'_video_'+sec_c+'" generated="true" class="error"></label>');
    }
    else if(stype == 'audio')
    {
        divEle.html(
            '<div class="pramtr_file">'+
            '<input type="file" class="form-control required filesize" name="answer[op_'+opt_c+']['+sec_c+'][audio]" id="ans_option_'+opt_c+'_audio_'+sec_c+'" accept="audio/*" placeholder="'+message['upload_audio']+'" data-option_count="'+opt_c+'" onchange="getAnsAudioPreview(this.id)">'+
            '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
            '<span class="filenme" aria-hidden="true"></span>'+
            '</div>'+'<label for="ans_option_'+opt_c+'_audio_'+sec_c+'" generated="true" class="error"></label>');
    }
    else
    {
        divEle.html('<textarea class="form-control lang-dir required" name="answer[op_'+opt_c+']['+sec_c+'][description]" id="ans_option_'+opt_c+'_description_'+sec_c+'" placeholder="'+message['description']+'" data-option_count="'+opt_c+'" oninput="getAnsOptionPreview(this.id)"></textarea>');
    }
    $('#preview_option_'+opt_c+'_section_'+sec_c).html('');
    $('.lang-dir').attr('dir', direction);
}

// For Select Correct Answer
function selectCorrectAns(id)
{
    var opt_c = $('#'+id).attr('data-option_count');
    $('p.option_name').removeClass('coorect_prvew');
    $('#preview_option_name_'+opt_c).addClass('coorect_prvew');
    $('p.name_answer').removeClass('correct_answer');
    $('#ans_option_'+opt_c+'_text').addClass('correct_answer');
}

// ----------------- For Hint ---------------------
// Add More Hint
var multi_hint_count = 1;
$('#add_more_hint_btn').click(function()
{
    multi_hint_count += 1;
    var opt_text = $('p.name_hint').last().text();
    var hint_name = parseInt(opt_text.substr(opt_text.indexOf("H") + 1))+ + +1;
    $('#hint_div').append(
        '<div id="hint_'+multi_hint_count+'">'+
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
                                        '<select class="selectpicker" name="hint['+multi_hint_count+'][1][section_type]" id="hint_'+multi_hint_count+'_section_type_1" data-hint_count="'+multi_hint_count+'" data-hint_section_count="1" onchange="changeHintSectionType(this.id, this.value)">'+

                                        '</select>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-md-7 col-lg-7 col-xl-8" id="hint_'+multi_hint_count+'_section_type_div_1">'+
                                '<textarea class="form-control lang-dir" name="hint['+multi_hint_count+'][1][description]" id="hint_'+multi_hint_count+'_description_1" data-hint_count="'+multi_hint_count+'" placeholder="'+message['description']+'"  oninput="getHintPreview(this.id)"></textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</li>'+
            '</ul>'+
            '<div class="add_section_cls text-right text-ar-left">'+
                '<a href="javascript:;" class="add_section_btn" data-hintcount="'+multi_hint_count+'" id="hint_'+multi_hint_count+'_add_section_btn" onclick="addMoreHintSection(this.id)">+ Add Section</a>'+
            '</div>'+
        '</div>'
    );
    $.each(sectionArr, function(ind, item){
        $('#hint_'+multi_hint_count+'_section_type_1').append('<option value="'+ind+'">'+item+'</option>');
    });
    $('#hint_'+multi_hint_count+'_section_type_1').selectpicker('refresh');
    // For Preview
    $('#preview_hint_div > ul').append('<li class="" id="preview_hint_'+multi_hint_count+'"></li>');
    $('#preview_hint_div > ul > li#preview_hint_'+multi_hint_count).prepend('<p class="option_name hint_name" id="preview_hint_name_'+multi_hint_count+'">H'+hint_name+'. </p>');
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
}

// For Add Section in Hint
var hint_section_count = 1;
function addMoreHintSection(id)
{
    hint_section_count += 1;
    var hint_count = $('#'+id).attr('data-hintcount');
    $('#hint_'+hint_count+'_ul_list').append(
        '<li class="list_of_exersize" id="hint_'+hint_count+'_li_'+hint_section_count+'">'+
            '<div class="form-group">'+
                '<div class="row">'+
                    '<div class="col-md-5 col-lg-5 col-xl-4">'+
                      '<div class="answer_pdng">'+
                        '<div class="df-select">'+
                            '<select class="selectpicker" name="hint['+hint_count+']['+hint_section_count+'][section_type]" id="hint_'+hint_count+'_section_type_'+hint_section_count+'" data-hint_count="'+hint_count+'" data-hint_section_count="'+hint_section_count+'" onchange="changeHintSectionType(this.id, this.value)">'+

                            '</select>'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="col-md-7 col-lg-7 col-xl-8" id="hint_'+hint_count+'_section_type_div_'+hint_section_count+'">'+
                        '<textarea class="form-control lang-dir" name="hint['+hint_count+']['+hint_section_count+'][description]" id="hint_'+hint_count+'_description_'+hint_section_count+'" data-hint_count="'+hint_count+'" placeholder="'+message['description']+'" oninput="getHintPreview(this.id)"></textarea>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<button type="button" class="close_icon" id="hint_clear_btn_'+hint_section_count+'" data-hintcount="'+hint_count+'" data-hintsectioncount="'+hint_section_count+'" onclick="deleteHintSection(this.id)"></button>'+
        '</li>'
    );
    $.each(sectionArr, function(ind, item){
        $('#hint_'+hint_count+'_section_type_'+hint_section_count).append('<option value="'+ind+'">'+item+'</option>');
    });
    $('#hint_'+hint_count+'_section_type_'+hint_section_count).selectpicker('refresh');
    // For Preview
    $('#preview_hint_div > ul > li#preview_hint_'+hint_count).append('<div  class="ttt" id="preview_hint_'+hint_count+'_section_'+hint_section_count+'"></div>');
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
}

// For CHange Hint Section Type
function changeHintSectionType(id, stype)
{
    var sc = $('#'+id).attr('data-hint_section_count');
    var hc = $('#'+id).attr('data-hint_count');
    if(stype == 'image')
    {
        $('#hint_'+hc+'_section_type_div_'+sc).html('<div class="pramtr_file">'+
            '<input type="file" class="form-control required filesize" name="hint['+hc+']['+sc+'][image]" id="hint_'+hc+'_image_'+sc+'" data-hint_count="'+hc+'" accept="image/*" placeholder="'+message['upload_image']+'" onchange="getHintImagePreview(this.id)">'+
            '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
            '<span class="filenme" aria-hidden="true"></span>'+
            '</div>'+'<label for="hint_'+hc+'_image_'+sc+'" generated="true" class="error"></label>');
    }
    else if(stype == 'video')
    {
        $('#hint_'+hc+'_section_type_div_'+sc).html(
            '<textarea class="form-control lang-dir required videourl txera_vdo" name="hint['+hc+']['+sc+'][video]" id="hint_'+hc+'_video_'+sc+'" data-hint_count="'+hc+'" placeholder="'+message['video_desc']+'" onpaste="getHintVideoPreview(this.id)" onkeyup="getHintVideoPreview(this.id)" onchange="getHintVideoPreview(this.id)"></textarea>'+
            '<label for="hint_'+hc+'_video_'+sc+'" generated="true" class="error"></label>');
    }
    else if(stype == 'audio')
    {
        $('#hint_'+hc+'_section_type_div_'+sc).html('<div class="pramtr_file">'+
            '<input type="file" class="form-control required filesize" name="hint['+hc+']['+sc+'][audio]" id="hint_'+hc+'_audio_'+sc+'" data-hint_count="'+hc+'" accept="audio/*" placeholder="'+message['upload_audio']+'" onchange="getHintAudioPreview(this.id)">'+
            '<span class="custm_btn" aria-hidden="true">'+message['choose_file']+'</span>'+
            '<span class="filenme" aria-hidden="true"></span>'+
            '</div>'+'<label for="hint_'+hc+'_audio_'+sc+'" generated="true" class="error"></label>');
    }
    else
    {
        $('#hint_'+hc+'_section_type_div_'+sc).html('<textarea class="form-control lang-dir required" name="hint['+hc+']['+sc+'][description]" id="hint_'+hc+'_description_'+sc+'" data-hint_count="'+hc+'" placeholder="'+message['description']+'" oninput="getHintPreview(this.id)"></textarea>');
    }
    $('#preview_hint_'+hc+'_section_'+sc).html('');
    $('.lang-dir').attr('dir', direction);
}


// ----------------- For Preview ---------------------
// For Question Text Preview


// For Question Image Preview
function getQueImagePreview(id)
{
    var qc = id.substr(id.lastIndexOf("_") + 1);
    var fileInput = document.getElementById(id);
    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    var photo = $('<img />', {
        id: 'preview_que_img_section_'+qc,
        src: fileUrl,
        alt: ''
    });
    if($('#preview_que_section_'+qc).length > 0) {
        if($('#preview_que_img_section_'+qc).length > 0)
            $('#preview_que_img_section_'+qc).attr("src", fileUrl);
        else
            photo.appendTo($('#preview_que_section_'+qc));
    } else {
        $('#preview_que_div').append('<div id="preview_que_section_'+qc+'"></div>');
        photo.appendTo($('#preview_que_section_'+qc));
    }
    $('#preview_que_img_section_'+qc).css({"width": "350px", "height": "200px"});
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    setTimeout(() => {
        $('#'+id).blur();
    }, 100);
}

// For Question Video Preview
function getQueVideoPreview(id)
{
    var qc = id.substr(id.lastIndexOf("_") + 1);
    var fileUrl = $('#'+id).val();
    var video = $('<iframe />', {
        id: 'preview_que_video_section_'+qc,
        src: fileUrl,
        frameborder: "0",
        allowfullscreen: true,
    });
    var matches = fileUrl.match(/embed\/([a-zA-Z0-9\-_]+)/);
    if (matches)
    {
        if($('#preview_que_section_'+qc).length > 0) {
            if($('#preview_que_video_section_'+qc).length > 0)
                $('#preview_que_video_section_'+qc).attr("src", fileUrl);
            else
                video.appendTo($('#preview_que_section_'+qc));
        } else {
            $('#preview_que_div').append('<div id="preview_que_section_'+qc+'"></div>');
            video.appendTo($('#preview_que_div'));
        }
        $('#preview_que_video_section_'+qc).css({"width": "350px", "height": "200px"});
        setTimeout(() => {
            $('#'+id).blur();
        }, 100);
    }

}
// For Question Audio Preview
function getQueAudioPreview(id)
{
    var qc = id.substr(id.lastIndexOf("_") + 1);
    var fileInput = document.getElementById(id);
    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    var audio = $('<audio />', {
        id: 'preview_que_audio_section_'+qc,
        src: fileUrl,
        controls: true,
        'volume':0.4,
    });
    if($('#preview_que_section_'+qc).length > 0) {
        if($('#preview_que_audio_section_'+qc).length > 0)
            $('#preview_que_audio_section_'+qc).attr("src", fileUrl);
        else
            audio.appendTo($('#preview_que_section_'+qc));
    } else {
        $('#preview_que_div').append('<div id="preview_que_section_'+qc+'"></div>');
        audio.appendTo($('#preview_que_div'));
    }
    $('#preview_que_audio_section_'+qc).css({"width": "350px", "height": "60px"});
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    setTimeout(() => {
        $('#'+id).blur();
    }, 100);
}
// -------------------------------------------------------------------
//For Answer Option Text Preview
function getAnswerOptionName()
{
    var opt_text = $('#preview_ans_option_div > ul > li > p.option_name').last().text();
    if(opt_text == '') {
        opt_text = 'A';
        aCharCode = opt_text.charCodeAt(0);
    } else
        aCharCode = opt_text.charCodeAt(0) + 1;
    return String.fromCharCode(aCharCode)+'.&nbsp;';
}
function getAnsOptionPreview(id)
{
    var currentVal = $('#'+id).val();
    var sec_c = id.substr(id.lastIndexOf("_") + 1);
    var opt_c = $('#'+id).attr('data-option_count');

    if($('#preview_option_'+opt_c).length > 0) {
        if($('#preview_option_'+opt_c+'_section_'+sec_c).length > 0) {
            if($('#preview_option_'+opt_c+'_section_'+sec_c+'text').length > 0)
                $('#preview_option_'+opt_c+'_section_'+sec_c+'text').text(currentVal);
            else
                $('div#preview_option_'+opt_c+'_section_'+sec_c).append('<p class="text-new-line" id="preview_option_'+opt_c+'_section_'+sec_c+'text">'+currentVal+'</p>');
        } else {
            $('li#preview_option_'+opt_c).append('<div id="preview_option_'+opt_c+'_section_'+sec_c+'"><p class="text-new-line" id="preview_option_'+opt_c+'_section_'+sec_c+'text">'+currentVal+'</p></div>');
        }
    } else {
        var option_name = getAnswerOptionName();
        $('#preview_option_'+opt_c).prepend('<p class="option_name" id="preview_option_name_'+opt_c+'">'+option_name+' </p>');
    }
    if ($("input[name='correct']").is(":checked")) {
        var co_id = $("input[name='correct']:checked").attr('id');
        selectCorrectAns(co_id);
    }
}

// For Answer Option Image Preview
function getAnsImagePreview(id)
{
    var sec_c = id.substr(id.lastIndexOf("_") + 1);
    var opt_c = $('#'+id).attr('data-option_count');

    var fileInput = document.getElementById(id);
    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    var photo = $('<img />', {
        id: 'preview_option_'+opt_c+'_section_'+sec_c+'img',
        src: fileUrl,
        alt: ''
    });

    if($('#preview_option_'+opt_c).length > 0) {
        if($('#preview_option_'+opt_c+'_section_'+sec_c).length > 0) {
            if($('#preview_option_'+opt_c+'_section_'+sec_c+'img').length > 0)
                $('#preview_option_'+opt_c+'_section_'+sec_c+'img').attr("src", fileUrl);
            else
                photo.appendTo($('div#preview_option_'+opt_c+'_section_'+sec_c));
        } else {
            $('li#preview_option_'+opt_c).append('<div id="preview_option_'+opt_c+'_section_'+sec_c+'"></div>');
            photo.appendTo($('div#preview_option_'+opt_c+'_section_'+sec_c));
        }
    } else {
        var option_name = getAnswerOptionName();
        $('#preview_option_'+opt_c).prepend('<p class="option_name" id="preview_option_name_'+opt_c+'">'+option_name+' </p>');
    }
    $('#preview_option_'+opt_c+'_section_'+sec_c+'img').css({"width": "350px", "height": "200px"});
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    if ($("input[name='correct']").is(":checked")) {
        var co_id = $("input[name='correct']:checked").attr('id');
        selectCorrectAns(co_id);
    }
    setTimeout(() => {
        $('#'+id).blur();
    }, 100);
}

// For Answer Option Video Preview
function getAnsVideoPreview(id)
{

    var sec_c = id.substr(id.lastIndexOf("_") + 1);
    var opt_c = $('#'+id).attr('data-option_count');

    var fileUrl = $('#'+id).val();
    var video = $('<iframe />', {
        id: 'preview_option_'+opt_c+'_section_'+sec_c+'video',
        src: fileUrl,
        frameborder: "0",
        allowfullscreen: true,
    });
    var matches = fileUrl.match(/embed\/([a-zA-Z0-9\-_]+)/);
    if (matches)
    {
        if($('#preview_option_'+opt_c).length > 0) {
            if($('#preview_option_'+opt_c+'_section_'+sec_c).length > 0) {
                if($('#preview_option_'+opt_c+'_section_'+sec_c+'video').length > 0)
                    $('#preview_option_'+opt_c+'_section_'+sec_c+'video').attr("src", fileUrl);
                else
                    video.appendTo($('div#preview_option_'+opt_c+'_section_'+sec_c));
            } else {
                $('li#preview_option_'+opt_c).append('<div id="preview_option_'+opt_c+'_section_'+sec_c+'"></div>');
                video.appendTo($('div#preview_option_'+opt_c+'_section_'+sec_c));
            }
        } else {
            var option_name = getAnswerOptionName();
            $('#preview_option_'+opt_c).prepend('<p class="option_name" id="preview_option_name_'+opt_c+'">'+option_name+' </p>');
        }
        $('#preview_option_'+opt_c+'_section_'+sec_c+'video').css({"width": "350px", "height": "200px"});
        // $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
        if ($("input[name='correct']").is(":checked")) {
            var co_id = $("input[name='correct']:checked").attr('id');
            selectCorrectAns(co_id);
        }
        setTimeout(() => {
            $('#'+id).blur();
        }, 100);
    }
}

// For Answer Option Video Preview
function getAnsAudioPreview(id)
{
    var sec_c = id.substr(id.lastIndexOf("_") + 1);
    var opt_c = $('#'+id).attr('data-option_count');

    var fileInput = document.getElementById(id);
    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    var audio = $('<audio />', {
        id: 'preview_option_'+opt_c+'_section_'+sec_c+'audio',
        src: fileUrl,
        controls: true,
        'volume':0.4,
    });

    if($('#preview_option_'+opt_c).length > 0) {
        if($('#preview_option_'+opt_c+'_section_'+sec_c).length > 0) {
            if($('#preview_option_'+opt_c+'_section_'+sec_c+'audio').length > 0)
                $('#preview_option_'+opt_c+'_section_'+sec_c+'audio').attr("src", fileUrl);
            else
                audio.appendTo($('div#preview_option_'+opt_c+'_section_'+sec_c));
        } else {
            $('li#preview_option_'+opt_c).append('<div id="preview_option_'+opt_c+'_section_'+sec_c+'"></div>');
            audio.appendTo($('div#preview_option_'+opt_c+'_section_'+sec_c));
        }
    } else {
        var option_name = getAnswerOptionName();
        $('#preview_option_'+opt_c).prepend('<p class="option_name" id="preview_option_name_'+opt_c+'">'+option_name+' </p>');
    }
    $('#preview_option_'+opt_c+'_section_'+sec_c+'audio').css({"width": "350px", "height": "60px"});
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    if ($("input[name='correct']").is(":checked")) {
        var co_id = $("input[name='correct']:checked").attr('id');
        selectCorrectAns(co_id);
    }
    setTimeout(() => {
        $('#'+id).blur();
    }, 100);
}
// ---------------------------------------------------------------------
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
}

// For Hint Image Preview
function getHintImagePreview(id)
{
    var sec_c = id.substr(id.lastIndexOf("_") + 1);
    var hin_c = $('#'+id).attr('data-hint_count');

    var fileInput = document.getElementById(id);
    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    var photo = $('<img />', {
        id: 'preview_hint_'+hin_c+'_section_'+sec_c+'img',
        src: fileUrl,
        alt: ''
    });

    if($('#preview_hint_'+hin_c).length > 0) {
        if($('#preview_hint_'+hin_c+'_section_'+sec_c).length > 0) {
            if($('#preview_hint_'+hin_c+'_section_'+sec_c+'img').length > 0)
                $('#preview_hint_'+hin_c+'_section_'+sec_c+'img').attr("src", fileUrl);
            else
                photo.appendTo($('div#preview_hint_'+hin_c+'_section_'+sec_c));
        } else {
            $('li#preview_hint_'+hin_c).append('<div class="ttt" id="preview_hint_'+hin_c+'_section_'+sec_c+'"></div>');
            photo.appendTo($('div#preview_hint_'+hin_c+'_section_'+sec_c));
        }
    }
    $('#preview_hint_'+hin_c+'_section_'+sec_c+'img').css({"width": "350px", "height": "200px"});
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    setTimeout(() => {
        $('#'+id).blur();
    }, 100);
}

// For Hint Video Preview
function getHintVideoPreview(id)
{
    var sec_c = id.substr(id.lastIndexOf("_") + 1);
    var hin_c = $('#'+id).attr('data-hint_count');

    var fileUrl = $('#'+id).val();
    var video = $('<iframe />', {
        id: 'preview_hint_'+hin_c+'_section_'+sec_c+'video',
        src: fileUrl,
        frameborder: "0",
        allowfullscreen: true,
    });
    var matches = fileUrl.match(/embed\/([a-zA-Z0-9\-_]+)/);
    if (matches)
    {
        if($('#preview_hint_'+hin_c).length > 0) {
            if($('#preview_hint_'+hin_c+'_section_'+sec_c).length > 0) {
                if($('#preview_hint_'+hin_c+'_section_'+sec_c+'video').length > 0)
                    $('#preview_hint_'+hin_c+'_section_'+sec_c+'video').attr("src", fileUrl);
                else
                    video.appendTo($('div#preview_hint_'+hin_c+'_section_'+sec_c));
            } else {
                $('li#preview_hint_'+hin_c).append('<div class="ttt" id="preview_hint_'+hin_c+'_section_'+sec_c+'"></div>');
                video.appendTo($('div#preview_hint_'+hin_c+'_section_'+sec_c));
            }
        }
        $('#preview_hint_'+hin_c+'_section_'+sec_c+'video').css({"width": "350px", "height": "200px"});
        setTimeout(() => {
            $('#'+id).blur();
        }, 100);
    }
}
// For Hint Audio Preview
function getHintAudioPreview(id)
{
    var sec_c = id.substr(id.lastIndexOf("_") + 1);
    var hin_c = $('#'+id).attr('data-hint_count');

    var fileInput = document.getElementById(id);
    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    var audio = $('<audio />', {
        id: 'preview_hint_'+hin_c+'_section_'+sec_c+'audio',
        src: fileUrl,
        controls: true,
        'volume':0.4,
    });

    if($('#preview_hint_'+hin_c).length > 0) {
        if($('#preview_hint_'+hin_c+'_section_'+sec_c).length > 0) {
            if($('#preview_hint_'+hin_c+'_section_'+sec_c+'audio').length > 0)
                $('#preview_hint_'+hin_c+'_section_'+sec_c+'audio').attr("src", fileUrl);
            else
                audio.appendTo($('div#preview_hint_'+hin_c+'_section_'+sec_c));
        } else {
            $('li#preview_hint_'+hin_c).append('<div class="ttt" id="preview_hint_'+hin_c+'_section_'+sec_c+'"></div>');
            audio.appendTo($('div#preview_hint_'+hin_c+'_section_'+sec_c));
        }
    }
    $('#preview_hint_'+hin_c+'_section_'+sec_c+'audio').css({"width": "350px", "height": "60px"});
    $('#'+id).next().next('span.filenme').text(fileInput.files[0].name);
    setTimeout(() => {
        $('#'+id).blur();
    }, 100);
}

// ----------------------------------------------------------------------------
// For Parameter
$('#add_parameter').click(function(){
    $('#main_nw_accordian').show();
    $('#remove_parameter').show();
    $(this).hide();
});
$('#remove_parameter').click(function(){
    $('#csv-div').hide();
    $('#parameter_file').val('');
    $('#answr_1').html('');
    $('#main_nw_accordian').hide();
    $('#add_parameter').show();
    $(this).hide();
});

// For Cancel Button
$('#cancel_que_btn').click(function(e){
    $('#pills-tab > li > a[href="#summary"]').tab('show');
    document.documentElement.scrollTop = 0;
});

// For Range Slider
