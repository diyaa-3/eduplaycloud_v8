// $( document ).ready(function() {
//   
//     filterFormSubmit(page);

// });

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
              
                filterFormSubmit();
        }
    }
});

//Seach By status.
$('#status-apply').click(function(){
    if( $("#fltered-text-list input[name=Status_search]").length ){
        $("#fltered-text-list input[name=Status_search]").parent().remove();
    }

    var statusOperator = 'Like' ;
    var statusName = $('#status-name').val();
    var type = "Status";
    appendFilterListText(type,statusOperator,statusName)

});


//Sorting by ASC DESC.
    $('#sort-by').change(function(){
    if( $("#fltered-text-list input[name=Sort_search]").length ){
        $("#fltered-text-list input[name=Sort_search]").parent().remove();
    }
    appendFilterListText('Sort','By',$(this).val())
});

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
        $(".sort-by").val('Ascending').selectpicker("refresh");
        $('#startDate').val('');
        $('#status-name').val('');
    }
        
    // Filter Data form submit by apply button.
    function filterFormSubmit(page = null){
        $('.main_loader').show();
        var form = $('#filter-form').serialize();

        $.ajax({
            type: "GET",
            url:  site_url + '/exams/filter'+'?page=' + page,
            data: form, 
            success: function( response ) {
                $('#exam_result').empty();
                $('#exam_result').html(response);
                $('.main_loader').hide();
            }
        });

    }
    
    // Enter keypree submit filter.
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){     
            jQuery('#created-date-apply').focus().click();
            jQuery('#status-apply').focus().click();
            return false;
        }
    });

$(document).on('click', '.pagination span',function(event)
{
    event.preventDefault();

    $('li').removeClass('active');
    $(this).parent('li').addClass('active');

    var myurl = $(this).attr('href');
    var page=$(this).attr('href').split('page=')[1];

    filterFormSubmit(page);

    
});



$(window).on('hashchange', function() {
    if (window.location.hash) {
        var page = window.location.hash.replace('#', '');
        if (page == Number.NaN || page <= 0) {
            return false;
        }else{
            filterFormSubmit(page);
        }
    }
});
