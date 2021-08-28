$(document).on('click','#pills-exersice-tab', function(){
    // $('#publish_to_class_btn').show();
    // $('#pins_publish').hide();
});

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
                        +"<button type='button' class='close_name' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"
                        +"<input type='hidden' name='start_date' value='" + startDate + "'>"
                        +"<input type='hidden' name='end_date' value='"+endDate+"'>"
                    +"</li>"; 

                    $('#fltered-text-list').append(list);
                    filterFormSubmit();
            }
        }
    });

    //Seach By Min age & Max Age
    $('#age-apply').click(function(){
        if( $("#fltered-text-list input[name=min_age]").length ){
            $("#fltered-text-list input[name=max_age]").parent().remove();
            $("#fltered-text-list input[name=min_age]").parent().remove();
        }
        var startDate = $('#min-age').val();
        var endDate = $('#max-age').val();
        var type = "Age";
        if(startDate){
            if(endDate){
            var list =  "<li>"
                        +"<span >"+ type + "</span>"
                        +"<span class='bold_name'>&nbsp;" + startDate + "&nbsp;</span>"
                        +"<span class='bold_name'>&nbsp;"+ "To" +"&nbsp;</span>"
                        +"<span class='bold_name'>"+ endDate +"</span>"
                        +"<button type='button' class='close_name' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"
                        +"<input type='hidden' name='min_age' value='" + startDate + "'>"
                        +"<input type='hidden' name='max_age' value='"+endDate+"'>"
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

    // On change Disicipline in N/A selecte.
    $('#disicipline-operator').on('change', function(){
        if($(this).val() == 'na'){
            $('#disicipline-name').slideUp();
        } else {
            $('#disicipline-name').slideDown();
        }
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
            if(seachType =="curriculum"){
                $('#disicipline-name').val('');
                $('#disicipline-operator').val(0).selectpicker("refresh");
            }
            if(seachType == 'sort'){
                $('#'+seachType+'-by').val('Ascending').selectpicker("refresh");
            } else if(seachType == 'date') {
                $('#startDate').val('');
                $('#endDate').val('');
            } if (seachType == 'age') {
                $('#min-age').val('');
                $('#max-age').val('');
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
        $(".sort-by").val('Ascending').selectpicker("refresh");
        $(".selectpicker").val(0).selectpicker("refresh");
        $('#title-name').val('');
        $('#disicipline-name').val('');
        $('#grade-name').val('');
        $('#topic-name').val('');
        $('#startDate').val('');
        $('#question-name').val('');
        $('#buyer-name').val('');
        $('#rating-name').val('');
        $('#endDate').val('');
        $('#min-age').val('');
        $('#max-age').val('');
    }
        
    // Filter Data form submit by apply button.
    function filterFormSubmit(){
        $('.main_loader').show();
        var form = $('#filter-form').serialize();
        
        $.ajax({
            type: "GET",
            url:  site_url + '/exercisesets/filter',
            data: form, 
            success: function( response ) {
                // console.log(response);
                $('#my-private-lib').empty();
                $('#my-private-lib').html(response);
                $('.main_loader').hide();
            }
        });

    }
    
    // Enter keypree submit filter.
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){     
            jQuery('#title-apply').focus().click();
            jQuery('#created-date-apply').focus().click();
            jQuery('#disicipline-apply').focus().click();
            jQuery('#grade-apply').focus().click();
            jQuery('#question-apply').focus().click();
            jQuery('#buyer-apply').focus().click();
            jQuery('#rating-apply').focus().click();
            jQuery('#age-apply').focus().click();
            jQuery('#topic-apply').focus().click();
            return false;
        }
    });
});