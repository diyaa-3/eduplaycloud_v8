function getClassesAssignment()
{
    var formData = $('#filter-form').serialize();

    $('.main_loader').show();
    $.ajax({
        url: site_url+'/courseclasses/assignment/filter',
        type: "GET",
        data: formData,
        success: function(response){ // What to do if we succeed
            
            $('#assignment-result').empty();
            $('#assignment-result').html(response);
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
          
            getClassesAssignment();
        }
    }
}

// $(window).on('hashchange', function() {
//     if (window.location.hash) {
//         var page = window.location.hash.replace('#', '');
//         if (page == Number.NaN || page <= 0) {
//             return false;
//         }else{
//             getClassesAssignment(page);
//         }
//     }
// });


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
    getClassesAssignment(); 
} );

//Clear all filter data.
$('#clear_all_btn').click(function () {
    $('#fltered-text-list').empty()
    getClassesAssignment();
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
                    getClassesAssignment();
        }
    }
});

 // Enter keypree submit filter.
 $(document).bind('keypress', function(e) {
    if(e.keyCode==13){     
        jQuery('#title-apply').focus().click();
        jQuery('#created-date-apply').focus().click();
        return false;
    }
});
