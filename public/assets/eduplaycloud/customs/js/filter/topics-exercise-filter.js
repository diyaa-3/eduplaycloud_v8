$( document ).ready(function() {
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
                    topicExerciseFilterFormSubmit();
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
                            +"<button type='button' class='close_name' data-type='"+type+"' ><i class='icn_cls_nm'></i></button>"
                            +"<input type='hidden' name='"+type+"_search' value='" + search + "'>"
                            +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>"
                        +"</li>"; 
    
            $('#fltered-text-list').append(list);
            topicExerciseFilterFormSubmit();
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
            topicExerciseFilterFormSubmit(); 
        } );
        
    //Clear all filter data.
    $('#clear_all_btn').click(function () {
        $('#fltered-text-list').empty()
        topicExerciseFilterFormSubmit();
        blankAllFileld();        
    });

    function blankAllFileld() {
        $(".selectpicker").val(0).selectpicker("refresh");
        $(".sort-by").val('Ascending').selectpicker("refresh");
        $('#title-name').val('');
        // $('#price-name').val('');
        $('#disicipline-name').val('');
        $('#grade-name').val('');
        $('#startDate').val('');
        $('#endDate').val('');
    }
        
    // Filter Data form submit by apply button.
    function topicExerciseFilterFormSubmit(){
        
        $('.main_loader').show();
        var form = $('#filter-form').serialize();
        
        $.ajax({
            type: "GET",
            url:  site_url + '/topics/exercisesets/filter',
            data: form, 
            success: function( response ) {
                // console.log(response);
                $('#topic-exercise').empty();
                $('#topic-exercise').html(response);
                $('.main_loader').hide();
            }
        });
    }

    // Enter keypree submit filter.
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){     
            jQuery('#title-apply').focus().click();
            // jQuery('#price-apply').focus().click();
            jQuery('#created-date-apply').focus().click();
            jQuery('#disicipline-apply').focus().click();
            jQuery('#grade-apply').focus().click();
            return false;
        }
    });
});