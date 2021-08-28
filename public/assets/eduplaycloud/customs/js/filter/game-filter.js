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
        filterFormSubmit();
        }
    }
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
    blankAllFileld();        
});


function blankAllFileld() {
    $(".selectpicker").val(0).selectpicker("refresh");
    $(".sort-by").val('Ascending').selectpicker("refresh");
    $('#publisher-name').val('');
    $('#age-name').val('');
    $('#category-name').val('');
}
    
// Filter Data form submit by apply button.
function filterFormSubmit(){
    $('.main_loader').show();
    var form = $('#filter-form').serialize();
    
    $.ajax({
        type: "GET",
        url:  site_url + '/games/filter',
        data: form, 
        success: function( response ) {
            // console.log(response);
            $('#games-result').empty();
            $('#games-result').html(response);
            $('.main_loader').hide();
        }
    });

}

// Enter keypree submit filter.
$(document).bind('keypress', function(e) {
    if(e.keyCode==13){     
        jQuery('#publisher-apply').focus().click();
        jQuery('#age-apply').focus().click();
        jQuery('#category-apply').focus().click();
        jQuery('#operating-system-apply').focus().click();
        jQuery('#rating-apply').focus().click();
        return false;
    }
});


//Seach By Publisher.
$(document).on('click','#publisher-apply',function(){

    if( $("#fltered-text-list input[name=Publisher_search]").length ){
        $("#fltered-text-list input[name=Publisher_search]").parent().remove();
    }

    var publisherOperator = $('#publisher-operator').val();
    var publisherName = $('#publisher-name').val();
    var type = "Publisher";
    appendFilterListText(type,publisherOperator,publisherName)

});

//Seach By Age.
$(document).on('click','#age-apply',function(){

    if( $("#fltered-text-list input[name=Age_search]").length ){
        $("#fltered-text-list input[name=Age_search]").parent().remove();
    }

    var ageOperator = $('#age-operator').val();
    var ageName = $('#age-name').val();
    var type = "Age";
    appendFilterListText(type,ageOperator,ageName)

});

//Seach By Category.
$(document).on('click','#category-apply',function(){

    if( $("#fltered-text-list input[name=Category_search]").length ){
        $("#fltered-text-list input[name=Category_search]").parent().remove();
    }

    var categoryOperator = $('#category-operator').val();
    var categoryName = $('#category-name').val();
    var type = "Category";
    appendFilterListText(type,categoryOperator,categoryName)

});

 //Seach By Oprating system.
 $(document).on('click','#operating-system-apply',function(){
    if( $("#fltered-text-list input[name=OS_search]").length ){
        $("#fltered-text-list input[name=OS_search]").parent().remove();
    }

    var OSOperator = 'Like' ;
    var OSName = $('#operating-system').val();
    var type = "OS";
    appendFilterListText(type,OSOperator,OSName)

});

 //Seach By rating.
 $(document).on('click','#rating-apply',function(){
    if( $("#fltered-text-list input[name=Rating_search]").length ){
        $("#fltered-text-list input[name=Rating_search]").parent().remove();
    }

    var ratingOperator = 'Like' ;
    var ratingName = $('#rating-name').val();
    var type = "Rating";
    appendFilterListText(type,ratingOperator,ratingName)

});

  //Sorting by ASC DESC.
  $('#sort-by').change(function(){
    if( $("#fltered-text-list input[name=Sort_search]").length ){
        $("#fltered-text-list input[name=Sort_search]").parent().remove();
    }
    appendFilterListText('Sort','By',$(this).val())
});