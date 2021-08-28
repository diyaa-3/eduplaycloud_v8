$( document ).ready(function() {

    //Seach By Title.
    $(document).on("click","#title-apply", function(){

        if( $("#topic-fltered-text-list input[name=Title_search]").length ){
            $("#topic-fltered-text-list input[name=Title_search]").parent().remove();
        }

        if( $("#topic_filter_input input[name=Title_search]").length ){
            $("#topic_filter_input input[name=Title_search]").remove();
            $("#topic_filter_input input[name=Title_operator]").remove();
        }

        var titleOperator = $('#title-operator').val();
        var titleName = $('#title-name').val();
        var type = "Title";
        appendFilterListText(type,titleOperator,titleName)
    });

    //Seach By exercisesets.
    $(document).on("click","#exercisesets-apply", function(){
        if( $("#topic-fltered-text-list input[name=Exercisesets_search]").length ){
            $("#topic-fltered-text-list input[name=Exercisesets_search]").parent().remove();
        }

        if( $("#topic_filter_input input[name=Exercisesets_search]").length ){
            $("#topic_filter_input input[name=Exercisesets_search]").remove();
            $("#topic_filter_input input[name=Exercisesets_operator]").remove();
        }

        var exercisesetsOperator = $('#exercisesets-operator').val();
        var exercisesetsName = $('#exercisesets-name').val();
        var type = "Exercisesets";
        appendFilterListText(type,exercisesetsOperator,exercisesetsName)

    });

    //Seach By curriculum.
    $(document).on("click","#curriculum-apply", function(){
        if( $("#topic-fltered-text-list input[name=Curriculum_search]").length ){
            $("#topic-fltered-text-list input[name=Curriculum_search]").parent().remove();
        }

        if( $("#topic_filter_input input[name=Curriculum_search]").length ){
            $("#topic_filter_input input[name=Curriculum_search]").remove();
            $("#topic_filter_input input[name=Curriculum_operator]").remove();
        }

        var curriculumOperator = $('#curriculum-operator').val();
        var curriculumName = $('#topic_curriculum_name').val();
        var type = "Curriculum";
        appendFilterListText(type,curriculumOperator,curriculumName)
    });

    //Seach By Language.
    $(document).on("click","#language-apply", function(){
        if( $("#fltered-text-list input[name=Language_search]").length ){
            $("#fltered-text-list input[name=Language_search]").parent().remove();
        }

        if( $("#topic_filter_input input[name=Language_search]").length ){
            $("#topic_filter_input input[name=Language_search]").remove();
            $("#topic_filter_input input[name=Language_operator]").remove();
        }

        var languageOperator = 'Like' ;
        var languageName = $('#language-name').val();
        var languageText = $("#language-name option:selected").text();
        var type = "Language";

        if(languageName){
            if(languageOperator){
            var list =  "<li>"
                            +"<span>"+ type + "</span>"
                            +"<span>&nbsp;" + languageOperator + "&nbsp;</span>"
                            +"<span class='bold_name'>"+ languageText +"</span>"
                            +"<button type='button' class='close_name' ><i class='icn_cls_nm'></i></button>"
                            +"<input type='hidden' name='"+type+"_search' value='" + languageName + "'>"
                            +"<input type='hidden' name='"+type+"_operator' value='"+languageOperator+"'>"
                        +"</li>";

                $('#topic_filter_input').append(list);
                $('#topic-fltered-text-list').append(list);
                topicExerciseFilterFormSubmit();
            }
        }
    });

    //Sorting by ASC DESC.
    $(document).on("change","#sort-by", function(){
        if( $("#topic-fltered-text-list input[name=Sort_search]").length ){
            $("#topic-fltered-text-list input[name=Sort_search]").parent().remove();
        }
        if( $("#topic_filter_input input[name=Sort_search]").length ){
            $("#topic_filter_input input[name=Sort_search]").remove();
            $("#topic_filter_input input[name=Sort_operator]").remove();
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
                                +"<button type='button' data-name='"+type+"_search' data-opt-name='"+type+"_operator' class='close_name' ><i class='icn_cls_nm'></i></button>"
                                +"<input type='hidden' name='"+type+"_search' value='" + search + "'>"
                                +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>"
                            +"</li>";

                var hidden_input =  "<input type='hidden' name='"+type+"_search' value='" + search + "'>"
                            +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>";

                $('#topic_filter_input').append(hidden_input);

                $('#topic-fltered-text-list').append(list);
                topicExerciseFilterFormSubmit();
            }
        }
    }

    //Remove filtered name from displayed in filter search box.
    $(document).on( "click", ".close_name", function(){
        var search_name = $(this).attr('data-name');
        var opt_name = $(this).attr('data-opt-name');
        $('#topic_filter_input [name='+search_name+']').remove();
        $('#topic_filter_input [name='+opt_name+']').remove();

        $('#topic-fltered-text-list [name='+search_name+']').empty();
        $('#topic-fltered-text-list [name='+opt_name+']').empty();
        $(this).parent().remove();
        topicExerciseFilterFormSubmit();
    });

    //Clear all filter data.
    $(document).on( "click", "#exam_clear_all_btn", function(){
        $('#topic-fltered-text-list').empty();
        $('#topic_filter_input').empty();
        topicExerciseFilterFormSubmit();
        blankAllFileld();
    });

    function blankAllFileld() {
        $(".selectpicker").val(0).selectpicker("refresh");
        $(".sort-by").val('Ascending').selectpicker("refresh");
        $('#title-name').val('');
        $('#price-name').val('');
        $('#disicipline-name').val('');
        $('#grade-name').val('');
        $('#startDate').val('');
        $('#endDate').val('');
    }

    // Filter Data form submit by apply button.
    function topicExerciseFilterFormSubmit(){
        var getExamID =$('#examId').val();
        if(getExamID){
            var url = site_url+'/exams/topics/filter/'+getExamID;
        }else{
            var url =site_url+'/exams/topics/filter';
        }
        $('.main_loader').show();
        var form = $('#topic-filter-form').serialize();
        $.ajax({
            type: "GET",
            url: url,
            data: form,
            success: function( response ) {
                // console.log(response);
                $('#topicssHTML').empty();
                $('#topicssHTML').html(response);
                $('.main_loader').hide();
            }
        });
    }

    // Enter keypree submit filter.
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){
            jQuery('#title-apply').focus().click();
            jQuery('#price-apply').focus().click();
            jQuery('#created-date-apply').focus().click();
            jQuery('#disicipline-apply').focus().click();
            jQuery('#grade-apply').focus().click();
            return false;
        }
    });
});