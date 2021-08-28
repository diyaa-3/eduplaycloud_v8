 //Seach By Name.
 $('#name-apply').click(function(){
    if( $("#fltered-text-list input[name=Name_search]").length ){
        $("#fltered-text-list input[name=Name_search]").parent().remove();
    }

    var nameOperator = $('#name-operator').val();
    var name = $('#name').val();
    var type = "Name";
    appendFilterListText(type,nameOperator,name)
    filterFormSubmit();

});



//Sorting by ASC DESC.
$('#sort-by').change(function(){
    if( $("#fltered-text-list input[name=Sort_search]").length ){
        $("#fltered-text-list input[name=Sort_search]").parent().remove();
    }
    appendFilterListText('Sort','By',$(this).val())
    filterFormSubmit();
});

//This function user for Filtered text display. 
function appendFilterListText(type,operator,search){
var list =  "<li>"
                +"<span>"+ type + "</span>"
                +"<span>&nbsp;" + operator + "&nbsp;</span>"
                +"<span class='bold_name'>"+ search +"</span>"
                +"<button type='button' class='close_name' data-type='"+type+"' ><i class='icn_cls_nm'></i></button>"
                +"<input type='hidden' name='"+type+"_search' value='" + search + "'>"
                +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>"
            +"</li>"; 

    $('#fltered-text-list').append(list);
}

//Remove filtered name from displayed in filter search box.
$(document).on( "click", ".close_name", function(){
    var seachType = $(this).attr('data-type').toLowerCase();
    if(seachType == 'sort'){
        $('#'+seachType+'-by').val('Ascending').selectpicker("refresh");
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
});



 // Filter Data form submit by apply button.
 function filterFormSubmit(){
    $('.main_loader').show();
    var form = $('#filter-form').serialize();
    ;
    $.ajax({
        type: "GET",
        url:  site_url + '/reports/skill/performance/filter',
        data: form, 
        success: function( response ) {
           
            $('#skill-performance-data').empty();  
            $('#skill-performance-data').html(response);
            $('.main_loader').hide();
        }
    });
}

// Enter keypree submit filter.
$(document).bind('keypress', function(e) {
    if(e.keyCode==13){     
        jQuery('#name-apply').focus().click();
        return false;
    }
});