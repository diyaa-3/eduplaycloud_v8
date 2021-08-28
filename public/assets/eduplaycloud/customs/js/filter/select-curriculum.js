    //Seach By Name.
    $(document).on('click','#name-apply',function(){
            if( $("#fltered-text-list input[name=Name_search]").length ){
                $("#fltered-text-list input[name=Name_search]").parent().remove();
            }

            var nameOperator = $('#name-operator').val();
            var name = $('#name').val();
            var type = "Name";
            appendFilterListText(type,nameOperator,name)
            filterFormSubmit();

    });

    //Seach By Language.
    $('#language-apply').click(function(){
        if( $("#fltered-text-list input[name=Language_search]").length ){
            $("#fltered-text-list input[name=Language_search]").parent().remove();
        }

        var languageOperator = 'Like' ;
        var languageName = $('#language-name').val();
        var languageText = $("#language-name option:selected").text();
        var type = "Language";
        // appendFilterListText(type,languageOperator,languageName)

        if(languageName){
            if(languageOperator){
            var list =  "<li>"
                            +"<span>"+ type + "</span>"
                            +"<span>&nbsp;" + languageOperator + "&nbsp;</span>"
                            +"<span class='bold_name'>"+ languageText +"</span>"
                            +"<button type='button' class='close_name' data-type='"+type+"'><i class='icn_cls_nm'></i></button>"
                            +"<input type='hidden' name='"+type+"_search' value='" + languageName + "'>"
                            +"<input type='hidden' name='"+type+"_operator' value='"+languageOperator+"'>"
                        +"</li>"; 

                $('#fltered-text-list').append(list);
                filterFormSubmit();
            }
        }
        

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
                filterFormSubmit();
            }
        }
    }

    //Remove filtered name from displayed in filter search box.
    $(document).on( "click", ".close_name", function(){       
        var seachType = $(this).attr('data-type').toLowerCase();

        if(seachType == 'sort'){
            $('#'+seachType+'-by').val('Ascending').selectpicker("refresh");
        } else if(seachType == 'language') {
            $('#language-name').val(0).selectpicker("refresh");
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
        blankAllFileld()         
    });

    function blankAllFileld() {
        $(".selectpicker").val(0).selectpicker("refresh");
        $(".sort-by").val('Ascending').selectpicker("refresh");
        $('#name').val('');
        $('#price-name').val('');
        $('#disicipline-name').val('');
        $('#grade-name').val('');
        $('#exercisesets-name').val('');
        $('#classes-name').val('');
        $('#startDate').val('');
        $('#endDate').val('');
        $('#topic-apply').val('');
    }

    // Enter keypree submit filter.
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){     
            jQuery('#name-apply').focus().click();
            jQuery('#language-apply').focus().click();
            jQuery('#price-apply').focus().click();
            jQuery('#created-date-apply').focus().click();
            jQuery('#disicipline-apply').focus().click();
            jQuery('#grade-apply').focus().click();
            jQuery('#exercisesets-apply').focus().click();
            jQuery('#classes-apply').focus().click();
            jQuery('#topic-apply').focus().click();
            return false;
        }
    });

     //Seach By exercisesets.
     $('#exercisesets-apply').click(function(){
        if( $("#fltered-text-list input[name=Exercisesets_search]").length ){
            $("#fltered-text-list input[name=Exercisesets_search]").parent().remove();
        }

        var exercisesetsOperator = $('#exercisesets-operator').val();
        var exercisesetsName = $('#exercisesets-name').val();
        var type = "Exercisesets";
        appendFilterListText(type,exercisesetsOperator,exercisesetsName)
       

    });

    //Seach By classes.
    $('#classes-apply').click(function(){
        if( $("#fltered-text-list input[name=Classes_search]").length ){
            $("#fltered-text-list input[name=Classes_search]").parent().remove();
        }

        var classesOperator = $('#classes-operator').val();
        var classesName = $('#classes-name').val();
        var type = "Classes";
        appendFilterListText(type,classesOperator,classesName)
       

    });

    //Seach By Disicipline.
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

    // On change topic in N/A selecte.
    $('#topic-operator').on('change', function(){
        if($(this).val() == 'na'){
            $('#topic-name').slideUp();
        } else {
            $('#topic-name').slideDown();
        }
    });

