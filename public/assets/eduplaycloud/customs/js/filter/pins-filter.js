// $( document ).ready(function() {
    
    $(document).on('click','#pills-pins-tab', function(){
        // $('#publish_to_class_btn').hide();
        // $('#pins_publish').show();
    });

    //Seach By Title.
    $('#descriptio-apply').click(function(){
        if( $("#fltered-text-list-pin input[name=Description_search]").length ){
            $("#fltered-text-list-pin input[name=Description_search]").parent().remove();
        }

        var titleOperator = $('#description-operator').val();
        var titleName = $('#description-name').val();
        var type = "Description";
        appendFilterListText(type,titleOperator,titleName)

    });

    //Sorting by ASC DESC.
    $('#sort-by-pin').change(function(){
        if( $("#fltered-text-list-pin input[name=Sort_search]").length ){
            $("#fltered-text-list-pin input[name=Sort_search]").parent().remove();
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
    
            $('#fltered-text-list-pin').append(list);
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
    $('#clear_all_btn-pin').click(function () {
        $('#fltered-text-list-pin').empty()
        filterFormSubmit();
        blankAllFileld();
    });

    function blankAllFileld() {
        $(".selectpicker").val(0).selectpicker("refresh");
        $(".sort-by-pin").val('Ascending').selectpicker("refresh");
        $('#description-name').val('');
    }

    // Filter Data form submit by apply button.
    function filterFormSubmit(page = null){
        $('.main_loader').show();
        var form = $('#filter-form-pin').serialize();

        $.ajax({
            type: "GET",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url:  site_url + '/exercisesets/pins/filter',
            data: form,
            success: function( response ) {
                //  console.log(response);
                $('#pinsFilter').empty();
                $('#pinsFilter').html(response);
                $('.main_loader').hide();
            }
        });

    }

    // Enter keypree submit filter.
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){
            jQuery('#descriptio-apply').focus().click();
            return false;
        }
    });

    // var page = null;
    // filterFormSubmit(page);


    // $(document).on('click', '.pagination span',function(event)
    // {
    //     event.preventDefault();

    //     $('li').removeClass('active');
    //     $(this).parent('li').addClass('active');

    //     var myurl = $(this).attr('href');
    //     var page=$(this).attr('href').split('page=')[1];

    //     filterFormSubmit(page);
    // });

// });


// $(window).on('hashchange', function() {
//     if (window.location.hash) {
//         var page = window.location.hash.replace('#', '');
//         if (page == Number.NaN || page <= 0) {
//             return false;
//         }else{
//             filterFormSubmit(page);
//         }
//     }
// });
 