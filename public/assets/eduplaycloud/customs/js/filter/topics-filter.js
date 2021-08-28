$(document).ready(function () {
    var page = null;
    getTopicsFilter(page);

    $(document).on('click', '.pagination a',function(event) {
        event.preventDefault();

        $('li').removeClass('active');
        $(this).parent('li').addClass('active');

        var myurl = $(this).attr('href');
        var page = $(this).attr('href').split('page=')[1];

        getTopicsFilter(page);
    });
})

function getTopicsFilter(page, formData = null)
{
    var formData = $('#filter-form').serialize();

    $('.main_loader').show();
    $.ajax({
        url: site_url+'/topics'+'?page=' + page,
        type: "GET",
        data: formData,
        success: function(response) { // What to do if we succeed
           $('.main_loader').hide();
            $('#topics-result').empty();
            $('#topics-result').html(response);
            $('#topics-result').unblock();

        }, error: function(response) {
           $('.main_loader').hide();
            console.log('Error'+response);
        }
    }).fail(function(jqXHR, ajaxOptions, thrownError) {
       $('.main_loader').hide();
        console.log('No response from server');
    });
}

// This function user for Filtered text display.
function appendFilterListText(type, operator, search) {
    if (search) {
        if (operator) {
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
            getTopicsFilter(page);
        }
    }
}

$(window).on('hashchange', function() {
    if (window.location.hash) {
        var page = window.location.hash.replace('#', '');
        if (page == Number.NaN || page <= 0) {
            return false;
        }else{
            getTopicsFilter(page);
        }
    }
});

// Sorting by ASC DESC.
$('#sort-by').change(function() {
    if ($("#fltered-text-list input[name=Sort_search]").length) {
        $("#fltered-text-list input[name=Sort_search]").parent().remove();
    }
    appendFilterListText('Sort','By',$(this).val())
});

// Remove filtered name from displayed in filter search box.
$(document).on("click", ".close_name", function() {
    var seachType = $(this).attr('data-type').toLowerCase();
    if(seachType == 'sort'){
        $('#'+seachType+'-by').val('Ascending').selectpicker("refresh");
    } else if(seachType == 'language') {
        $('#language-name').val(0).selectpicker("refresh");
    } else {
        $('#'+seachType+'-name').val('');
        $('#'+seachType+'-operator').val(0).selectpicker("refresh");
    }
       

    $(this).parent().remove();
    getTopicsFilter();
});

// Clear all filter data.
$('#clear_all_btn').click(function () {
    $('#fltered-text-list').empty()
    getTopicsFilter();
    blankAllFileld();
});

function blankAllFileld() {
    $(".selectpicker").val(0).selectpicker("refresh");
    $('#title-name').val('');
    $('#disicipline-name').val('');
    $('#grade-name').val('');
    $('#startDate').val('');
    $('#endDate').val('');
}

// Enter keypree submit filter.[staging-web] : practice >> que and ans page >> after choosing answer and click on next button screen should redirect on correct answer and then screen should go onto next question for practice
$(document).bind('keypress', function(e) {
    if(e.keyCode==13){     
        jQuery('#title-apply').focus().click();
        jQuery('#created-date-apply').focus().click();
        jQuery('#disicipline-apply').focus().click();
        jQuery('#exercisesets-apply').focus().click();
        jQuery('#grade-apply').focus().click();
        jQuery('#curriculum-apply').focus().click();
        return false;
    }
});

// Search By Title.
$('#title-apply').click(function() {
    if ($("#fltered-text-list input[name=Title_search]").length ) {
        $("#fltered-text-list input[name=Title_search]").parent().remove();
    }

    var titleOperator = $('#title-operator').val();
    var titleName = $('#title-name').val();
    var type = "Title";
    appendFilterListText(type, titleOperator, titleName)
});


//Seach By exercisesets.
$('#exercisesets-apply').click(function(){
    if( $("#fltered-text-list input[name=Exercisesets_search]").length ){
        $("#fltered-text-list input[name=Exercisesets_search]").parent().remove();
    }

    var exercisesetsOperator = $('#exercisesets-operator').val();
    var exercisesetsName = $('#exercisesets-name').val();
    var type = "Exercisesets";
    appendFilterListText(type,exercisesetsOperator,exercisesetsName)

});

//Seach By curriculum.
$('#curriculum-apply').click(function(){
    if( $("#fltered-text-list input[name=Curriculum_search]").length ){
        $("#fltered-text-list input[name=Curriculum_search]").parent().remove();
    }

    var curriculumOperator = $('#curriculum-operator').val();
    var curriculumName = $('#curriculum-name').val();
    var type = "Curriculum";
    appendFilterListText(type,curriculumOperator,curriculumName)

});


//Seach By Language.
$('#language-apply').click(function(){
    if( $("#fltered-text-list input[name=Language_search]").length ){
        $("#fltered-text-list input[name=Language_search]").parent().remove();
    }

    var languageOperator = 'Like' ;
    var languageName = $('#language-name').val();
    var languageText = $("#language-name option:selected").text();
    var type = "Language";
    // appendFilterListText(type,languageOperator,languageName)

    if(languageName){
        if(languageOperator){
        var list =  "<li>"
                        +"<span>"+ type + "</span>"
                        +"<span>&nbsp;" + languageOperator + "&nbsp;</span>"
                        +"<span class='bold_name'>"+ languageText +"</span>"
                        +"<button type='button' class='close_name' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"
                        +"<input type='hidden' name='"+type+"_search' value='" + languageName + "'>"
                        +"<input type='hidden' name='"+type+"_operator' value='"+languageOperator+"'>"
                    +"</li>"; 

            $('#fltered-text-list').append(list);
        }
    }
    
    var page = '';
    getTopicsFilter(page);
});