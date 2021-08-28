$( document ).ready(function() {
    //Seach By Title.
    $('#skill-title-apply').click(function(){
        if( $("#fltered-text-list input[name=Title_search]").length ){
            $("#fltered-text-list input[name=Title_search]").parent().remove();
        }

        var titleOperator = $('#skill-title-operator').val();
        var titleName = $('#skill-title-name').val();
        var type = "Title";
        appendSkillFilterListText(type,titleOperator,titleName)
    });

    //Sorting by ASC DESC.
    $('#skill_sort-by').change(function(){
        if( $("#fltered-text-list input[name=Sort_search]").length ){
            $("#fltered-text-list input[name=Sort_search]").parent().remove();
        }
        appendSkillFilterListText('Sort','By',$(this).val())
    });

    //This function user for Filtered text display.
    function appendSkillFilterListText(type,operator,search){
        if(search){
            if(operator){
            var list =  "<li>"
                            +"<span>"+ type + "</span>"
                            +"<span>&nbsp;" + operator + "&nbsp;</span>"
                            +"<span class='bold_name'>"+ search +"</span>"
                            +"<button type='button' data-name='"+type+"_search' data-opt-name='"+type+"_operator' class='skill_close_name' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"
                            +"<input type='hidden' name='"+type+"_search' value='" + search + "'>"
                            +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>"
                        +"</li>";

            var hidden_input =  "<input type='hidden' name='"+type+"_search' value='" + search + "'>"
                                +"<input type='hidden' name='"+type+"_operator' value='"+operator+"'>";

            $('#skill_filter_input').append(hidden_input);

            $('#fltered-text-list').append(list);
                SkillfilterFormSubmit();
            }
        }
    }

    //Remove filtered name from displayed in filter search box.
    $(document).on( "click", ".skill_close_name", function(){

        var seachType = $(this).attr('data-type').toLowerCase();
        // console.log(seachType);
        if(seachType == 'sort'){
            $('#skill-sort-by').val('Ascending').selectpicker("refresh");
        } else {
            $('#skill-'+seachType+'-name').val('');
            $('#skill-'+seachType+'-operator').val(0).selectpicker("refresh");
        }

        var search_name = $(this).attr('data-name');
        var opt_name = $(this).attr('data-opt-name');

        $('#skill_filter_input [name='+search_name+']').remove();
        $('#skill_filter_input [name='+opt_name+']').remove();

        $(this).parent().remove();
        SkillfilterFormSubmit();
            SkillfilterFormSubmit(); 
        SkillfilterFormSubmit();
    });

    //Clear all filter data.
    $(document).on( "click", "#clear_all_btn", function(){
        $('#fltered-text-list').empty();
        $('#skill_filter_input').empty();
        SkillfilterFormSubmit();
        blankAllFileld();
    });

    function blankAllFileld() {
        $(".selectpicker").val(0).selectpicker("refresh");
        $(".sort-by").val('Ascending').selectpicker("refresh");
        $('#skill-title-name').val('');
    }

    // Filter Data form submit by apply button.
    function SkillfilterFormSubmit(){
        $('.main_loader').show();
        var form = $('#skill-filter-form').serialize();

        $.ajax({
            type: "GET",
            url:  site_url + '/exams/skill/filter',
            data: form,
            success: function( response ) {
                // console.log(response);
                $('#skillCatListHTML').empty();
                $('#skillCatListHTML').html(response);
                $('.main_loader').hide();
            }
        });
    }

    // Enter keypree submit filter.
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){
            jQuery('#skill-title-apply').focus().click();
            return false;
        }
    });
});