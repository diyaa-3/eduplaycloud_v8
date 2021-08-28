    //Seach By Title.
    $(document).off('click','#exercise-title-apply').on("click","#exercise-title-apply", function(){
        if( $("#exercise-fltered-text-list input[name=Title_search]").length ){
            $("#exercise-fltered-text-list input[name=Title_search]").parent().remove();

            $("#exercise_filter_input input[name=Title_search]").remove();
            $("#exercise_filter_input input[name=Title_operator]").remove();
        }
        var titleOperator = $('#exercise-title-operator').val();
        var titleName = $('#exercise-title-name').val();
        var type = "Title";
        appendFilterListText(type,titleOperator,titleName)
    });

    //Seach By Created Date.
    $(document).off('click','#exercise-created-date-apply').on("click","#exercise-created-date-apply", function(){
        if( $("#exercise-fltered-text-list input[name=start_date]").length ){
            $("#exercise-fltered-text-list input[name=start_date]").parent().remove();

            $("#exercise_filter_input input[name=start_date]").remove();
            $("#exercise_filter_input input[name=end_date]").remove();
        }
        var startDate = $('#exercise-startDate').val();
        var endDate = $('#exercise-endDate').val();
        var type = "Date";
        if(startDate){
            if(endDate){
            var list =  "<li>"
                        +"<span >"+ type + "</span>"
                        +"<span class='bold_name'>&nbsp;" + startDate + "&nbsp;</span>"
                        +"<span class='bold_name'>&nbsp;"+ "To" +"&nbsp;</span>"
                        +"<span class='bold_name'>"+ endDate +"</span>"
                        +"<button type='button' class='exe_close_name' data-search='start_date' data-operator='end_date' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"
                        +"<input type='hidden' name='start_date' value='" + startDate + "'>"
                        +"<input type='hidden' name='end_date' value='"+endDate+"'>"
                    +"</li>";

                    var hidden_input =  "<input type='hidden' name='start_date' value='" + startDate + "'>"
                    +"<input type='hidden' name='end_date' value='"+endDate+"'>";

                    $('#exercise_filter_input').append(hidden_input);

                    $('#exercise-fltered-text-list').append(list);
                    filterFormSubmit();
            }
        }
    });

    //Seach By Disicipline.
    $(document).off('click','#exercise-disicipline-apply').on("click","#exercise-disicipline-apply", function(){
        if( $("#fltered-text-list input[name=Curriculum_search]").length ){
            $("#fltered-text-list input[name=Curriculum_search]").parent().remove();

            $("#exercise_filter_input input[name=Curriculum_search]").remove();
            $("#exercise_filter_input input[name=Curriculum_operator]").remove();
        }

        var disiciplineOperator = $('#exercise-disicipline-operator').val();
        var disiciplineName = $('#exercise-disicipline-name').val();
        var type = "Curriculum";

        if(disiciplineOperator == 'na'){
            disiciplineOperator = '=';
            disiciplineName = 'N/A';
        }
        appendFilterListText(type,disiciplineOperator,disiciplineName)

    });

    // On change Disicipline in N/A selecte.
    $(document).off('change','#exercise-disicipline-operator').on("change","#exercise-disicipline-operator", function(){
        if($(this).val() == 'na'){
            $('#exercise-disicipline-name').slideUp();
        } else {
            $('#exercise-disicipline-name').slideDown();
        }
    });

    //Seach By Grade.
    $(document).off('click','#exercise-grade-apply').on("click","#exercise-grade-apply", function(){
        if( $("#exercise-fltered-text-list input[name=Grade_search]").length ){
            $("#exercise-fltered-text-list input[name=Grade_search]").parent().remove();

            $("#exercise_filter_input input[name=Grade_search]").remove();
            $("#exercise_filter_input input[name=Grade_operator]").remove();
        }
        var gradeOperator = $('#exercise-grade-operator').val();
        var gradeName = $('#exercise-grade-name').val();
        var type = "Grade";

        if(gradeOperator == 'na'){
            gradeOperator = '=';
            gradeName = 'N/A';
        }
        appendFilterListText(type,gradeOperator,gradeName)
    });

    // On change Grade in N/A selecte.
    $(document).off('change','#exercise-grade-operator').on("change","#exercise-grade-operator", function(){
        if($(this).val() == 'na'){
            $('#exercise-grade-name').slideUp();
        } else {
            $('#exercise-grade-name').slideDown();
        }
    });

    //Seach By question.
    $(document).off('click','#exercise-question-apply').on("click","#exercise-question-apply", function(){
        if( $("#exercise-fltered-text-list input[name=Question_search]").length ){
            $("#exercise-fltered-text-list input[name=Question_search]").parent().remove();

            $("#exercise_filter_input input[name=Question_search]").remove();
            $("#exercise_filter_input input[name=Question_operator]").remove();
        }

        var questionOperator = $('#exercise-question-operator').val();
        var questionName = $('#exercise-question-name').val();
        var type = "Question";
        appendFilterListText(type,questionOperator,questionName)
    });

    //Seach By Student.
    $(document).off('click','#exercise-buyer-apply').on("click","#exercise-buyer-apply", function(){
        if( $("#exercise-fltered-text-list input[name=Buyer_search]").length ){
            $("#exercise-fltered-text-list input[name=Buyer_search]").parent().remove();

            $("#exercise_filter_input input[name=Buyer_search]").remove();
            $("#exercise_filter_input input[name=Buyer_operator]").remove();
        }
        var buyerOperator = $('#exercise-buyer-operator').val();
        var buyerName = $('#exercise-buyer-name').val();
        var type = "Buyer";
        appendFilterListText(type,buyerOperator,buyerName)
    });

    //Seach By rating.
    $(document).off('click','#exercise-rating-apply').on("click","#exercise-rating-apply", function(){
        if( $("#exercise-fltered-text-list input[name=Rating_search]").length ){
            $("#exercise-fltered-text-list input[name=Rating_search]").parent().remove();

            $("#exercise_filter_input input[name=Rating_search]").remove();
            $("#exercise_filter_input input[name=Rating_operator]").remove();
        }
        var ratingOperator = 'Like' ;
        var ratingName = $('#exercise-rating-name').val();
        var type = "Rating";
        appendFilterListText(type,ratingOperator,ratingName)
        filterFormSubmit();
    });

    //Sorting by ASC DESC.
    $(document).off('change','#exercise-sort-by').on("change","#exercise-sort-by", function(){
        if( $("#exercise-fltered-text-list input[name=Sort_search]").length ){
            $("#exercise-fltered-text-list input[name=Sort_search]").parent().remove();

            $("#exercise_filter_input input[name=Sort_search]").remove();
            $("#exercise_filter_input input[name=Sort_operator]").remove();
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
                            +"<button type='button' class='exe_close_name' data-type='"+type+"' data-search='"+type+"_search' data-operator='"+type+"_operator'><i class='icn_cls_nm'></i></button>"
                            +"<input type='hidden' name='"+type+"_search' value='" + search + "'>"
                            +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>"
                        +"</li>";

            var hidden_input =  "<input type='hidden' name='"+type+"_search' value='" + search + "'>"
                                +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>";

                $('#exercise_filter_input').append(hidden_input);

                $('#exercise-fltered-text-list').append(list);
                filterFormSubmit();
            }
        }
    }

    //Remove filtered name from displayed in filter search box.
    $(document).on( "click", ".exe_close_name", function(){
        var seachType = $(this).attr('data-type').toLowerCase();
        // console.log(seachType);
        if(seachType == 'sort'){
            $('#exercise-sort-by').val('Ascending').selectpicker("refresh");
        } else if(seachType == 'date') {
            $('#exercise-startDate').val('');
            $('#exercise-endDate').val('');
        } else {
            $('#exercise-'+seachType+'-name').val('');
            $('#exercise-'+seachType+'-operator').val(0).selectpicker("refresh");
        }

        $(this).parent().remove();
        var type = $(this).attr('data-search');
        var oprator = $(this).attr('data-operator');
        $("#exercise_filter_input input[name="+type+"]").remove();
        $("#exercise_filter_input input[name="+oprator+"]").remove();
        filterFormSubmit();
    });

    //Clear all filter data.
    $(document).off('click','#exercise_clear_all_btn').on("click","#exercise_clear_all_btn", function(){
        $('#exercise-fltered-text-list').empty()
        $('#exercise_filter_input').empty()
        filterFormSubmit();
        blankAllFileld();
    });

    function blankAllFileld() {
        $(".selectpicker").val(0).selectpicker("refresh");
        $(".sort-by").val('Ascending').selectpicker("refresh");
        $('#exercise-title-name').val('');
        $('#exercise-disicipline-name').val('');
        $('#exercise-grade-name').val('');
        $('#exercise-startDate').val('');
        $('#exercise-question-name').val('');
        $('#exercise-buyer-name').val('');
        $('#exercise-rating-name').val('');
        $('#exercise-endDate').val('');
    }
        
    // Filter Data form submit by apply button.
    function filterFormSubmit(){
        var form = $('#exercise-filter-form').serialize();
        $.ajax({
            type: "GET",
            url:  site_url + '/exams/exercisesset/filter',
            data: form, 
            success: function( response ) {
                $('#ExercisessetsHTML').empty();
                $('#ExercisessetsHTML').html(response);
                $('.main_loader').hide();
            }
        });

    }
$( document ).ready(function() {
    // Enter keypree submit filter.
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){     
            jQuery('#exercise-title-apply').focus().click();
            jQuery('#exercise-created-date-apply').focus().click();
            jQuery('#exercise-grade-apply').focus().click();
            jQuery('#exercise-question-apply').focus().click();
            jQuery('#exercise-buyer-apply').focus().click();
            jQuery('#exercise-rating-apply').focus().click();
            return false;
        }
    });
});