$( document ).ready(function() {

    //Seach By Name.
    $(document).off('click','#curriculum-name-apply').on("click","#curriculum-name-apply", function(){
        if( $("#curriculum-fltered-text-list input[name=Name_search]").length ){
            $("#curriculum-fltered-text-list input[name=Name_search]").parent().remove();
        }

        if( $("#curriculum_filter_input input[name=Name_search]").length ){
            $("#curriculum_filter_input input[name=Name_search]").remove();
            $("#curriculum_filter_input input[name=Name_operator]").remove();
        }

        var nameOperator = $('#curriculum-name-operator').val();
        var name = $('#curriculum-name').val();
        var type = "Name";
        curriculumAppendFilterListText(type,nameOperator,name)
    });

    //Seach By Language.
    $(document).off('click','#curriculul-language-apply').on("click","#curriculul-language-apply", function(){
        if( $("#curriculum-fltered-text-list input[name=Language_search]").length ){
            $("#curriculum-fltered-text-list input[name=Language_search]").parent().remove();
        }

        if( $("#curriculum_filter_input input[name=Language_search]").length ){
            $("#curriculum_filter_input input[name=Language_search]").remove();
            $("#curriculum_filter_input input[name=Language_operator]").remove();
        }

        var languageOperator = 'Like' ;
        var languageName = $('#curriculul-language-name').val();
        var languageText = $("#curriculul-language-name option:selected").text();
        var type = "Language";

        if(languageName){
            if(languageOperator){
            var list =  "<li>"
                            +"<span>"+ type + "</span>"
                            +"<span>&nbsp;" + languageOperator + "&nbsp;</span>"
                            +"<span class='bold_name'>"+ languageText +"</span>"
                            +"<button type='button' data-name='"+type+"_search' data-opt-name='"+type+"_operator' class='close_name' ><i class='icn_cls_nm'></i></button>"
                            +"<input type='hidden' name='"+type+"_search' value='" + languageName + "'>"
                            +"<input type='hidden' name='"+type+"_operator' value='"+languageOperator+"'>"
                        +"</li>"; 

                $('#curriculum-fltered-text-list').append(list);
                var hidden_input =  "<input type='hidden' name='"+type+"_search' value='" + languageName + "'>"
                +"<input type='hidden' name='"+type+"_operator' value='"+languageOperator+"'>";

                $('#curriculum_filter_input').append(hidden_input);
            }
        }
        curriculumExamFilterFormSubmit();
    });

    //Sorting by ASC DESC.
    $(document).off('change','#curriculum-sort-by').on("change","#curriculum-sort-by", function(){
        if( $("#curriculum-fltered-text-list input[name=Sort_search]").length ){
            $("#curriculum-fltered-text-list input[name=Sort_search]").parent().remove();
        }

        if( $("#curriculum_filter_input input[name=Sort_search]").length ){
            $("#curriculum_filter_input input[name=Sort_search]").remove();
            $("#curriculum_filter_input input[name=Sort_operator]").remove();
        }
        curriculumAppendFilterListText('Sort','By',$(this).val())
    });

    //Seach By exercisesets.
    $(document).off('click','#curriculum-exercisesets-apply').on("click","#curriculum-exercisesets-apply", function(){
        if( $("#curriculum-fltered-text-list input[name=Exercisesets_search]").length ){
            $("#curriculum-fltered-text-list input[name=Exercisesets_search]").parent().remove();
        }

        if( $("#curriculum_filter_input input[name=Exercisesets_search]").length ){
            $("#curriculum_filter_input input[name=Exercisesets_search]").remove();
            $("#curriculum_filter_input input[name=Exercisesets_operator]").remove();
        }

        var exercisesetsOperator = $('#curriculum-exercisesets-operator').val();
        var exercisesetsName = $('#curriculum-exercisesets-name').val();
        var type = "Exercisesets";
        curriculumAppendFilterListText(type,exercisesetsOperator,exercisesetsName)
    });

    //Seach By classes.
    $(document).off('click','#classes-apply').on("click","#classes-apply", function(){
        if( $("#curriculum-fltered-text-list input[name=Classes_search]").length ){
            $("#curriculum-fltered-text-list input[name=Classes_search]").parent().remove();
        }

        if( $("#curriculum_filter_input input[name=Classes_search]").length ){
            $("#curriculum_filter_input input[name=Classes_search]").remove();
            $("#curriculum_filter_input input[name=Classes_operator]").remove();
        }

        var classesOperator = $('#classes-operator').val();
        var classesName = $('#classes-name').val();
        var type = "Classes";
        curriculumAppendFilterListText(type,classesOperator,classesName)
    });

    //Seach By Disicipline.
    $(document).off('click','#topic-apply').on("click","#topic-apply", function(){
        if( $("#curriculum-fltered-text-list input[name=Discipline_search]").length ){
            $("#curriculum-fltered-text-list input[name=Discipline_search]").parent().remove();
        }

        if( $("#curriculum_filter_input input[name=Discipline_search]").length ){
            $("#curriculum_filter_input input[name=Discipline_search]").remove();
            $("#curriculum_filter_input input[name=Discipline_operator]").remove();
        }

        var topicOperator = $('#topic-operator').val();
        var topicName = $('#topic-name').val();
        var type = "Discipline";

        if(topicOperator == 'na'){
            topicOperator = '=';
            topicName = 'N/A';
        }
        curriculumAppendFilterListText(type,topicOperator,topicName)
    });

    //This function user for Filtered text display.
    function curriculumAppendFilterListText(type,operator,search){
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

                $('#curriculum-fltered-text-list').append(list);

                var hidden_input =  "<input type='hidden' name='"+type+"_search' value='" + search + "'>"
                +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>";

                $('#curriculum_filter_input').append(hidden_input);
                curriculumExamFilterFormSubmit();
            }
        }
    }

    //Remove filtered name from displayed in filter search box.
    $(document).off('click','.close_name').on( "click", ".close_name", function(){
        var search_name = $(this).attr('data-name');
        var opt_name = $(this).attr('data-opt-name');

        $('#curriculum_filter_input [name='+search_name+']').remove();
        $('#curriculum_filter_input [name='+opt_name+']').remove();

        $('#curriculum-fltered-text-list [name='+search_name+']').empty();
        $('#curriculum-fltered-text-list [name='+opt_name+']').empty();
        $(this).parent().remove();
        curriculumExamFilterFormSubmit();
        blankAllFileld();
    });

    //Clear all filter data.
    $(document).off('click','#curriculum_exam_clear_all_btn').on("click","#curriculum_exam_clear_all_btn", function(){
        $('#curriculum-fltered-text-list').empty();
        $('#curriculum_filter_input').empty();
        curriculumExamFilterFormSubmit();
        blankAllFileld();
    });

    function blankAllFileld() {
        $(".selectpicker").val(0).selectpicker("refresh");
        $(".sort-by").val('Ascending').selectpicker("refresh");
        $('#curriculum-name-apply').val('');
        $('#price-name').val('');
        $('#disicipline-name').val('');
        $('#grade-name').val('');
        $('#startDate').val('');
        $('#endDate').val('');
    }

    // Filter Data form submit by apply button.
    function curriculumExamFilterFormSubmit(){
        $('.main_loader').show();
        var form = $('#curriculum-filter-form').serialize();
        $.ajax({
            type: "GET",
            url: site_url+'/exams/curriculum/filter',
            data: form,
            success: function( response ) {
                $('#DisciplinesHTML').empty();
                $('#DisciplinesHTML').html(response.html);
                $('.examId').val(response.exam_id);
                $('.main_loader').hide();
            }
        });
    }

    // Enter keypree submit filter.
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){
            jQuery('#curriculum-name-apply').focus().click();
            jQuery('#price-apply').focus().click();
            jQuery('#created-date-apply').focus().click();
            jQuery('#disicipline-apply').focus().click();
            jQuery('#grade-apply').focus().click();
            return false;
        }
    });
});