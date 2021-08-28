

function getQuestions(page = null, formData = null)
{
    var formData = $('#question-filter-form').serialize();
    var url;

    url = site_url+'/exams/getQuestions/filter';

    $('.main_loader').show();

    $.ajax({
        method: "GET",
        url: url,
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        data:formData,
        success: function (response) {
            $('.main_loader').hide();
            $('#questionListHTML').empty();
            $('#questionListHTML').html(response);
        }
    });
}

//This function user for Filtered text display. 
function appendQuestionFilterListText(type,operator,search){
    if(search){
        if(operator){
            var list =  "<li>"
            +"<span>"+ type + "</span>"
            +"<span>&nbsp;" + operator + "&nbsp;</span>"
            +"<span class='bold_name'>"+ search +"</span>"
            +"<button type='button' data-name='"+type+"_search' data-opt-name='"+type+"_operator' class='que_close_name' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"
            +"<input type='hidden' name='"+type+"_search' value='" + search + "'>"
            +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>"
            +"</li>";

            $('#question-fltered-text-list').append(list);
            var page = null;

            var hidden_input =  "<input type='hidden' name='"+type+"_search' value='" + search + "'>"
            +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>";

            $('#question_filter_input').append(hidden_input);
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
$(document).off('click','#question-details-apply').on('click','#question-details-apply',function(){
    if( $("#question-fltered-text-list input[name=Details_search]").length ){
        $("#question-fltered-text-list input[name=Details_search]").parent().remove();
        $("#question_filter_input input[name=Details_search]").remove();
        $("#question_filter_input input[name=Details_operator]").remove();
    }

    var detailsOperator = $('#question-details-operator').val();
    var detailsName = $('#question-details-name').val();
    var type = "Details";
    appendQuestionFilterListText(type,detailsOperator,detailsName)

});

//Sorting by ASC DESC.
$(document).off('change','#question-sort-by').on('change','#question-sort-by',function(){

    if( $("#question-fltered-text-list input[name=Sort_search]").length ){
        $("#question-fltered-text-list input[name=Sort_search]").parent().remove();
        $("#question_filter_input input[name=Sort_search]").remove();
        $("#question_filter_input input[name=Sort_operator]").remove();
    }
    appendQuestionFilterListText('Sort','By',$(this).val())
});

 //Remove filtered name from displayed in filter search box.
 $(document).off("click", ".que_close_name").on( "click", ".que_close_name", function(){
    var seachType = $(this).attr('data-type').toLowerCase();

    if(seachType == 'sort'){
        $('#question-sort-by').val('Ascending').selectpicker("refresh");
    } else if(seachType == 'difficuly') {
        $('#question-difficuly-name').val(0).selectpicker("refresh");

    } else {
        $('#question-'+seachType+'-name').val('');
        $('#question-'+seachType+'-operator').val(0).selectpicker("refresh");
    }

    var search_name = $(this).attr('data-name');
    var opt_name = $(this).attr('data-opt-name');
    $('#question_filter_input [name='+search_name+']').remove();
    $('#question_filter_input [name='+opt_name+']').remove();

    $('#question-fltered-text-list [name='+search_name+']').remove();
    $('#question-fltered-text-list [name='+opt_name+']').remove();
    $(this).parent().remove();

    getQuestions();
} );

//Clear all filter data.
$(document).off('click','#question_clear_all_btn').on('click','#question_clear_all_btn',function(){
    $('#question_filter_input').empty();
    $('#question-fltered-text-list').empty();
    getQuestions();
    blankAllFileld();
});

function blankAllFileld() {
    $(".selectpicker").val(0).selectpicker("refresh");
    $('#question-min-time-name').val('');
    $('#question-max-time-name').val('');
}

//Seach By Min-time.
$(document).off('click','#question-min-time-apply').on('click','#question-min-time-apply',function(){
    if( $("#question-fltered-text-list input[name=question-Min-time_search]").length ){
        $("#question-fltered-text-list input[name=question-Min-time_search]").parent().remove();
        $("#question_filter_input input[name=Min-time_search]").remove();
        $("#question_filter_input input[name=Min-time_operator]").remove();
    }

    var mintimeOperator = $('#question-min-time-operator').val();
    var mintimeName = $('#question-min-time-name').val();
    var type = "question-Min-time";
    appendQuestionFilterListText(type,mintimeOperator,mintimeName)
});


//Seach By max-time.
$(document).off('click','#question-max-time-apply').on('click','#question-max-time-apply',function(){
    if( $("#question-fltered-text-list input[name=question-Max-time_search]").length ){
        $("#question-fltered-text-list input[name=question-Max-time_search]").parent().remove();
        $("#question_filter_input input[name=Max-time_search]").remove();
        $("#question_filter_input input[name=Max-time_operator]").remove();
    }

    var mintimeOperator = $('#question-max-time-operator').val();
    var mintimeName = $('#question-max-time-name').val();
    var type = "question-Max-time";

    appendQuestionFilterListText(type,mintimeOperator,mintimeName)
});


//Seach By Difficuly.
$(document).off('click','#question-difficuly-apply').on('click','#question-difficuly-apply',function(){
    if( $("#question-fltered-text-list input[name=Difficuly_search]").length ){
        $("#question-fltered-text-list input[name=Difficuly_search]").parent().remove();
        $("#question_filter_input input[name=Difficuly_search]").remove();
        $("#question_filter_input input[name=Difficuly_operator]").remove();
    }

    var mintimeOperator = '=';
    var mintimeName = $('#question-difficuly-name').val();
    var type = "Difficuly";
    appendQuestionFilterListText(type,mintimeOperator,mintimeName)
});
