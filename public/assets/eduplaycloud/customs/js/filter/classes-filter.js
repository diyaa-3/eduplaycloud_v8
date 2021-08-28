$(document).ready(function () {
    var page = null;
    getCourseClasses(page);
})

function getCourseClasses(page, formData = null)
{   
    var formData = $('#filter-form').serialize();
    var route = $('#route_name').val();
    var url;
    
    if(route == 'explore.classes' || route ==  'explore.curriculum.classes'){
        url = site_url+'/explore/classes'+'?page=' + page;
    } else {
        url = site_url+'/courseclasses/class/filter'+'?page=' + page;
    }
   
    $('.main_loader').show();
    $.ajax({
        url: url,
        type: "GET",
        data: formData,
        success: function(response){ // What to do if we succeed
            
            $('#course-classes').empty();
            $('#course-classes').html(response);
            $('.main_loader').hide();  

        }, error: function(response){
            console.log('Error'+response);
        }
    }).fail(function(jqXHR, ajaxOptions, thrownError)
    {
        console.log('No response from server');
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
            getCourseClasses(page);
        }
    }
}

$(window).on('hashchange', function() {
    if (window.location.hash) {
        var page = window.location.hash.replace('#', '');
        if (page == Number.NaN || page <= 0) {
            return false;
        }else{
            getCourseClasses(page);
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

        getCourseClasses(page);
    });

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
    } else {
        $('#'+seachType+'-name').val('');
        $('#'+seachType+'-operator').val(0).selectpicker("refresh");
    }
    
    $(this).parent().remove();
    getCourseClasses(); 
} );

//Clear all filter data.
$('#clear_all_btn').click(function () {
    $('#fltered-text-list').empty()
    getCourseClasses();
    blankAllFileld();    
});

function blankAllFileld() {
    $(".selectpicker").val(0).selectpicker("refresh");
    $('#title-name').val('');
    $('#disicipline-name').val('');
    $('#grade-name').val('');
    $('#topic-name').val('');
    $('#learner-name').val('');
    $('#teacher-name').val('');
    $('#startDate').val('');
    $('#endDate').val('');
}

// Enter keypree submit filter.
$(document).bind('keypress', function(e) {
    if(e.keyCode==13){     
        jQuery('#title-apply').focus().click();
        jQuery('#teacher-apply').focus().click();
        jQuery('#disicipline-apply').focus().click();
        jQuery('#grade-apply').focus().click();
        jQuery('#topic-apply').focus().click();
        jQuery('#learner-apply').focus().click();
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
    var type = "Title";
    appendFilterListText(type,titleOperator,titleName)
});

//Seach By teacher.
$('#teacher-apply').click(function(){
    if( $("#fltered-text-list input[name=Teacher_search]").length ){
        $("#fltered-text-list input[name=Teacher_search]").parent().remove();
    }

    var teacherOperator = $('#teacher-operator').val();
    var teacherName = $('#teacher-name').val();
    var type = "Teacher";
    appendFilterListText(type,teacherOperator,teacherName)
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
                        +"<button type='button' class='close_name' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"
                        +"<input type='hidden' name='start_date' value='" + startDate + "'>"
                        +"<input type='hidden' name='end_date' value='"+endDate+"'>"
                    +"</li>"; 

                    $('#fltered-text-list').append(list);
                    var page = null;
                    getCourseClasses(page);
        }
    }
});

//Search by Course ID.
$('#course-apply').click(function(){
    if( $("#fltered-text-list input[name=CoursID_search]").length ){
        $("#fltered-text-list input[name=CoursID_search]").parent().remove();
    }

    var courseOperator = '=';
    var courseName = $('#course_id').val();
    var type = "CoursID";
    appendFilterListText(type,courseOperator,courseName)

});


//Seach By Disicipline.
$('#disicipline-apply').click(function(){
    if( $("#fltered-text-list input[name=Curriculum_search]").length ){
        $("#fltered-text-list input[name=Curriculum_search]").parent().remove();
    }

    var disiciplineOperator = $('#disicipline-operator').val();
    var disiciplineName = $('#disicipline-name').val();
    var type = "Curriculum";
    appendFilterListText(type,disiciplineOperator,disiciplineName)
});


//Seach By Grade.
$('#grade-apply').click(function(){
    if( $("#fltered-text-list input[name=Grade_search]").length ){
        $("#fltered-text-list input[name=Grade_search]").parent().remove();
    }

    var gradeOperator = $('#grade-operator').val();
    var gradeName = $('#grade-name').val();
    var type = "Grade";
    appendFilterListText(type,gradeOperator,gradeName)
});

//Seach By Learners count.
$('#learner-apply').click(function(){
    if( $("#fltered-text-list input[name=Learner_search]").length ){
        $("#fltered-text-list input[name=Learner_search]").parent().remove();
    }

    var learnerOperator = $('#learner-operator').val();
    var learnerName = $('#learner-name').val();
    var type = "Learner";
    appendFilterListText(type,learnerOperator,learnerName)
});

//Seach By Disicipline.
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