function getPublicLibrary(page, formData = null)
{
    var formData = $('#filter-form').serialize();
    
    $('.main_loader').show();
    $.ajax({
        url: site_url+'/explore/exerciseset'+'?page=' + page,
        type: "GET",
        data: formData,
        success: function(response){ // What to do if we succeed
            $('#public_library_result').empty();
            $('#public_library_result').html(response);
            $('.main_loader').hide();
        },
        error: function(response){
            // console.log('Error'+response);
        }
    })
    .fail(function(jqXHR, ajaxOptions, thrownError)
    {
        // console.log('No response from server');
    })
}
$(window).on('hashchange', function() {
    if (window.location.hash) {
        var page = window.location.hash.replace('#', '');
        if (page == Number.NaN || page <= 0) {
            return false;
        }else{
            getPublicLibrary(page);
        }
    }
});

$(document).ready(function()
{
    var page = null;
    getPublicLibrary(page);


    $(document).on('click', '.pagination a',function(event)
    {
        event.preventDefault();

        $('li').removeClass('active');
        $(this).parent('li').addClass('active');

        var myurl = $(this).attr('href');
        var page=$(this).attr('href').split('page=')[1];

        getPublicLibrary(page);
    });

});

//Filter part on.

// Filter Data form submit by apply button.
function filterFormSubmit(){
    page = null;
    getPublicLibrary(page)
 
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
            filterFormSubmit()
        }
    }
}

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
    } else {
        $('#'+seachType+'-name').val('');
        $('#'+seachType+'-operator').val(0).selectpicker("refresh");
    }

    $(this).parent().remove();
    filterFormSubmit(); 
} );

//Clear all filter data.
$('#clear_all_btn').click(function () {
    $('#fltered-text-list').empty()
    filterFormSubmit();
    blankAllFileld();    
});

function blankAllFileld() {
    $(".selectpicker").val(0).selectpicker("refresh");
    $('#title-name').val('');
    $('#disicipline-name').val('');
    $('#topic-name').val('');
    $('#grade-name').val('');
    $('#question-name').val('');
    $('#buyer-name').val('');
    $('#rating-name').val('');
    $('#startDate').val('');
    $('#endDate').val('');
}

// Enter keypree submit filter.
$(document).bind('keypress', function(e) {
    if(e.keyCode==13){     
        jQuery('#title-apply').focus().click();
        jQuery('#disicipline-apply').focus().click();
        jQuery('#topic-apply').focus().click();
        jQuery('#grade-apply').focus().click();
        jQuery('#teacher-apply').focus().click();
        jQuery('#question-apply').focus().click();
        jQuery('#buyer-apply').focus().click();
        jQuery('#rating-apply').focus().click();
        jQuery('#created-date-apply').focus().click();
        return false;
    }
});

//Seach By Title.
$('#title-apply').click(function(){
    if( $("#fltered-text-list input[name=Title_search]").length ){
        $("#fltered-text-list input[name=Title_search]").parent().remove();
    }

    var titleOperator = $('#title-operator').val();
    var titleName = $('#title-name').val();
    var type = message['title'];
    appendFilterListText(type,titleOperator,titleName)
});

 //Seach By Created Date.
 $('#created-date-apply').click(function(){
    if( $("#fltered-text-list input[name=start_date]").length ){
        $("#fltered-text-list input[name=start_date]").parent().remove();
    }
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var type = "Date";
    if(startDate){
        if(endDate){
            var list =  "<li>"
                        +"<span >"+ type + "</span>"
                        +"<span class='bold_name'>&nbsp;" + startDate + "&nbsp;</span>"
                        +"<span class='bold_name'>&nbsp;"+ "To" +"&nbsp;</span>"
                        +"<span class='bold_name'>"+ endDate +"</span>"
                        +"<button type='button' class='close_name' data-type='"+type+"' ><i class='icn_cls_nm'></i></button>"
                        +"<input type='hidden' name='start_date' value='" + startDate + "'>"
                        +"<input type='hidden' name='end_date' value='"+endDate+"'>"
                    +"</li>"; 

                    $('#fltered-text-list').append(list);
                    filterFormSubmit();
        }
    }
});


 //Seach By Disicipline.
 $('#disicipline-apply').click(function(){
    if( $("#fltered-text-list input[name=Curriculum_search]").length ){
        $("#fltered-text-list input[name=Curriculum_search]").parent().remove();
    }

    var disiciplineOperator = $('#disicipline-operator').val();
    var disiciplineName = $('#disicipline-name').val();
    var type = "Curriculum";
    
    if(disiciplineOperator == 'na'){
        disiciplineOperator = '=';
        disiciplineName = 'N/A';
    }
    
    appendFilterListText(type,disiciplineOperator,disiciplineName)
});


//Seach By Topic.
$('#topic-apply').click(function(){
    if( $("#fltered-text-list input[name=Disicipline_search]").length ){
        $("#fltered-text-list input[name=Disicipline_search]").parent().remove();
    }

    var topicOperator = $('#topic-operator').val();
    var topicName = $('#topic-name').val();
    var type = "Disicipline";

    if(topicOperator == 'na'){
        topicOperator = '=';
        topicName = 'N/A';
    }
    appendFilterListText(type,topicOperator,topicName)
});

// On change Disicipline in N/A selecte.
$('#disicipline-operator').on('change', function(){
    if($(this).val() == 'na'){
        $('#disicipline-name').slideUp();
    } else {
        $('#disicipline-name').slideDown();
    }
});


//Seach By Grade.
$('#grade-apply').click(function(){
    if( $("#fltered-text-list input[name=Grade_search]").length ){
        $("#fltered-text-list input[name=Grade_search]").parent().remove();
    }

    var gradeOperator = $('#grade-operator').val();
    var gradeName = $('#grade-name').val();
    var type = "Grade";


    if(gradeOperator == 'na'){
        gradeOperator = '=';
        gradeName = 'N/A';
    }

    appendFilterListText(type,gradeOperator,gradeName)
});

 // On change Grade in N/A selecte.
 $('#grade-operator').on('change', function(){
    if($(this).val() == 'na'){
        $('#grade-name').slideUp();
    } else {
        $('#grade-name').slideDown();
    }
});


//Seach By Teacher.
$('#teacher-apply').click(function(){
    if( $("#fltered-text-list input[name=Teacher_search]").length ){
        $("#fltered-text-list input[name=Teacher_search]").parent().remove();
    }

    var teacherOperator = $('#teacher-operator').val();
    var teacherName = $('#teacher-name').val();
    var type = "Teacher";
    appendFilterListText(type,teacherOperator,teacherName)
});


//Seach By question.
$('#question-apply').click(function(){
    if( $("#fltered-text-list input[name=Question_search]").length ){
        $("#fltered-text-list input[name=Question_search]").parent().remove();
    }

    var questionOperator = $('#question-operator').val();
    var questionName = $('#question-name').val();
    var type = "Question";
    appendFilterListText(type,questionOperator,questionName)

});

//Seach By Student.
$('#buyer-apply').click(function(){
    if( $("#fltered-text-list input[name=Buyer_search]").length ){
        $("#fltered-text-list input[name=Buyer_search]").parent().remove();
    }

    var buyerOperator = $('#buyer-operator').val();
    var buyerName = $('#buyer-name').val();
    var type = "Buyer";
    appendFilterListText(type,buyerOperator,buyerName)

});

//Seach By rating.
$('#rating-apply').click(function(){
    if( $("#fltered-text-list input[name=Rating_search]").length ){
        $("#fltered-text-list input[name=Rating_search]").parent().remove();
    }

    var ratingOperator = 'Like' ;
    var ratingName = $('#rating-name').val();
    var type = "Rating";
    appendFilterListText(type,ratingOperator,ratingName)
    filterFormSubmit();

});