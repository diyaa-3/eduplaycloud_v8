var page = null;
$(document).ready(function () {
    if($('#auth_check').val == 1){
        getQuestions(page);
    }
})



//-------------------------------Question display with render js plug in-----------------------------------------------
function getQuestionListJsonByInput(){
    var json_question = [];            
        $('.json_question').each(function(key){
            if($(this).val() != ''){
                json_question.push(jQuery.parseJSON($(this).val()));
                json_question[key]['key'] = key;
            }
        });
    pRunQuestionListPreview(json_question);
    
}

function renderToHtml_qList(Q) {
    var template = document.getElementById('question_list_template').innerHTML;
    var output = Mustache.render(template, Q);
    // console.log(output);
    return output;
}

function pRunQuestionListPreview(list) {
    
    var data = list;    
    var previewFrame = document.getElementById('question_list_preview');

    // var static_parserOutputObj = get through api;
    var static_parserOutputObjExamDetail = data;
    var static_plugin_parserOutputObj = renderPluginsinObj(static_parserOutputObjExamDetail);
    var finalObj = static_plugin_parserOutputObj;
    if(previewFrame != undefined) {
        previewFrame.innerHTML = renderToHtml_qList(finalObj);
    }
    
    // reInitiate();
}

function reInitiate() {
    plugIns.forEach(function (plugIn) {
      if (plugIn.init) {
        eval(plugIn.init);
      };
    })
  }
//-------------------------------End Question display with render js plug in-----------------------------------------------


function getQuestions(page, formData = null)
{
    var formData = $('#filter-form').serialize();
    var route = $('#route_name').val();
    var url;

    var exerciseID = $('#exercise_id').val();
    
    url = site_url+'/exercisesets/questions/'+exerciseID+'/filter'+'?page=' + page;
    
    $('.main_loader').show();
    $.ajax({
        url: url,
        type: "GET",
        data: formData,
        success: function(response){ // What to do if we succeed
            
            $('#questiondiv').empty();
            $('#questiondiv').html(response);
            $('.main_loader').hide();

            getQuestionListJsonByInput();
            reInitiate();

        }, error: function(response){
            // console.log('Error'+response);
        }
    }).fail(function(jqXHR, ajaxOptions, thrownError)
    {
        // console.log('No response from server');
    });
}

//This function user for Filtered text display. 
function appendFilterListText(type,operator,search){
    if(search){
        if(operator){
            var list =  "<li>"
            +"<span>"+ type + "</span>"
            +"<span>&nbsp;" + operator + "&nbsp;</span>"
            +"<span class='bold_name'>"+ search +"</span>"
            +"<button type='button' class='close_name' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"
            +"<input type='hidden' name='"+type+"_search' value='" + search + "'>"
            +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>"
            +"</li>"; 
            
            $('#fltered-text-list').append(list);
            var page = null;
            getQuestions(page);
        }
    }
}

$(window).on('hashchange', function() {
    if (window.location.hash) {
        var page = window.location.hash.replace('#', '');
        if (page == Number.NaN || page <= 0) {
            return false;
        }else{
            getQuestions(page);
        }
    }
});

$(document).ready(function()
{
    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("id") // activated tab
        if(target == "detail-tab")
        {
            getQuestions(page);
        }
    });


    $(document).on('click', '.pagination a',function(event)
    {
        event.preventDefault();

        $('li').removeClass('active');
        $(this).parent('li').addClass('active');

        var myurl = $(this).attr('href');
        var page=$(this).attr('href').split('page=')[1];

        getQuestions(page);
    });

});

  //Seach By details.
  $('#details-apply').click(function(){
    if( $("#fltered-text-list input[name=Details_search]").length ){
        $("#fltered-text-list input[name=Details_search]").parent().remove();
    }

    var detailsOperator = $('#details-operator').val();
    var detailsName = $('#details-name').val();
    var type = "Details";
    appendFilterListText(type,detailsOperator,detailsName)

});

//Seach By tags.
$('#tags-apply').click(function(){
    if( $("#fltered-text-list input[name=Tags_search]").length ){
        $("#fltered-text-list input[name=Tags_search]").parent().remove();
    }

    var detailsOperator = $('#tags-operator').val();
    var detailsName = $('#tags-name').val();
    var type = "Tag";
    appendFilterListText(type,detailsOperator,detailsName)

});



//Sorting by ASC DESC.
$('#sort-by').change(function(){
    if( $("#fltered-text-list input[name=Sort_search]").length ){
        $("#fltered-text-list input[name=Sort_search]").parent().remove();
    }
    appendFilterListText('Sort','By',$(this).val())
});

 //Remove filtered name from displayed in filter search box.
 $(document).on( "click", ".close_name", function(){       
    var seachType = $(this).attr('data-type').toLowerCase();

    if(seachType == 'sort'){
        $('#'+seachType+'-by').val('Ascending').selectpicker("refresh");
    } else if(seachType == 'date') {
        $('#startDate').val('');
        $('#endDate').val('');
    } else if (seachType == 'skill') {
        $('#skill_category').val(0).selectpicker("refresh");
        $('#select_skill').empty();
        $('#select_skill').append('<option value="0" selected="" disabled="">Select Skill</option>');
    
    } else {
        $('#'+seachType+'-name').val('');
        $('#'+seachType+'-operator').val(0).selectpicker("refresh");
    }
     
    $(this).parent().remove();
    getQuestions(); 
} );

//Clear all filter data.
$('#clear_all_btn').click(function () {
    $('#fltered-text-list').empty()
    getQuestions();
    blankAllFileld();    
});

function blankAllFileld() {
    $(".selectpicker").val(0).selectpicker("refresh");
    $('#details-name').val('');
    $('#min-time-name').val('');
    $('#max-time-name').val('');
    $('#tags-name').val('');
  
}

//Seach By Min-time.
$('#min-time-apply').click(function(){
    if( $("#fltered-text-list input[name=Min-time_search]").length ){
        $("#fltered-text-list input[name=Min-time_search]").parent().remove();
    }

    var mintimeOperator = $('#min-time-operator').val();
    var mintimeName = $('#min-time-name').val();
    var type = "Min-time";
    appendFilterListText(type,mintimeOperator,mintimeName)
});


//Seach By max-time.
$('#max-time-apply').click(function(){
    if( $("#fltered-text-list input[name=Max-time_search]").length ){
        $("#fltered-text-list input[name=Max-time_search]").parent().remove();
    }

    var mintimeOperator = $('#max-time-operator').val();
    var mintimeName = $('#max-time-name').val();
    var type = "Max-time";

    appendFilterListText(type,mintimeOperator,mintimeName)
});


//Seach By Difficuly.
$('#difficuly-apply').click(function(){
    if( $("#fltered-text-list input[name=Difficuly_search]").length ){
        $("#fltered-text-list input[name=Difficuly_search]").parent().remove();
    }

    var mintimeOperator = '=';
    var mintimeName = $('#difficuly-name').val();
    var type = "Difficuly";
    appendFilterListText(type,mintimeOperator,mintimeName)
});

// Get skill by selected skill categories.

$(document).on('change','#skill_category', function(){
    
    $.ajax({
        type:"get",
        data: {'skill_category' : $(this).val()},
        url: site_url + '/exercisesets/get/skills',
        success:function(skills){
            $('#select_skill').empty();
            
            $.each(skills, function( index, value ) {
                $('#select_skill').append("<option value='"+value.id+"'>"+value.skill_name+"</option>");
            });
            $('.selectpicker').selectpicker('refresh');
        }
    });
});


//Search by Skill


$(document).on('click','#skill-filter-apply',function(){
    if( $("#fltered-text-list input[name=skill_category]").length ){
        $("#fltered-text-list input[name=skill]").parent().remove();
    }

    var skill_category = $('#skill_category').val();
    var skill= $('#select_skill').val();

    var skill_category_name = $('#skill_category option:selected').text();
    var skill_name = $('#select_skill option:selected').text();
    var type = "Skill";

    if(skill_name){
        if(skill_category_name){
        var list =  "<li>"
                        +"<span>"+ type + "</span>"
                        +"<span>&nbsp; Like &nbsp;</span>"
                        +"<span class='bold_name'>"+ skill_category_name +"</span>"
                        +"<span>&nbsp; And &nbsp;</span>"
                        +"<span class='bold_name'>"+ skill_name +"</span>"
                        +"<button type='button' class='close_name' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"

                        +"<input type='hidden' name='skill_category' value='" + skill_category + "'>"
                        +"<input type='hidden' name='skill' value='"+skill+"'>"
                    +"</li>"; 

            $('#fltered-text-list').append(list);
        }
    }
    
    var page = null;
    getQuestions(page);
    // appendFilterListText(type,skill_category,skillCategory)
});
