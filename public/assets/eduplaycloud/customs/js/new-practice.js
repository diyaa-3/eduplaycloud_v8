var questionid = $('#Question').data('questionid');

$('.defaultdivanswer').click(function() {
    // countdown.stop();
    var divid = $(this).attr('id');
    var answerid=$('#' + divid).data('answerid');

    var buttonid='checkanswerbtn'+questionid;
    var ischecked = $('#'+buttonid).data('ischecked');

    if(ischecked==1) {
        alert ('You already checked the answer , you can not answer any more')
    }
    else {
        $('#useranswer').val(answerid);
        $('#userhasanswer').val('1');
        $('.useranswerdiv').removeClass("useranswerdiv");

        $('#' + divid).addClass("useranswerdiv");
        sessionStorage.setItem("divid", "answer");
        $.ajax({
            type: "GET",
            dataType: "html",
            url: $('#' + divid).data('url'),

            data: {
                "_token": "{{ csrf_token() }}",
            },
            success: function (response) {
                //     $('#'+divid).html(response);
            }
        })
    }
});

function checkanswer(buttonid) {

    var userhasanswer = $('#userhasanswer').val();
    var useranswer = $('#useranswer').val();


    var nextbtn = 'nextbtn' +questionid;
    var nextquestionid = $('#' + buttonid).data('nextquestionid');

   
    if(userhasanswer==0) {
       alert ('Please answer first');
       return false;
    }
    else {
    var url = $('#' + buttonid).data('checkurl')
    $.ajax({
        type: "GET",
        dataType: "text",
        url: url,

        data: {
            "_token": "{{ csrf_token() }}",
        },
        success: function (response) {
            console.log(response);
            var correctanswer=response;
            var divcorrectanswer = 'answerid' + correctanswer;

            if(useranswer==correctanswer) {
                
                $('#' + divcorrectanswer).addClass("correctanswer");
                var countcorrect=$('#correctanswer').data('correctanswer');
                countcorrect=parseInt(countcorrect)+1;
                $('#correctanswer').data('correctanswer' ,countcorrect);
                $('#correctanswer').html(countcorrect);

               

            }
            else
            {
                var useranswediv='answerid'+useranswer;
                $('#' + useranswediv).addClass("badanswer");
                $('#' + divcorrectanswer).addClass("correctanswer");
                var countbadanswer=$('#badanswer').data('badanswer');
                countbadanswer=parseInt(countbadanswer)+1;
                $('#badanswer').data('badanswer' ,countbadanswer);
                $('#badanswer').html(countbadanswer);

            }
            $('#' + divcorrectanswer).addClass("correctanswer");
            //$('#' + buttonid).html("Checked");
            $('#' + buttonid).data('ischecked', 1);
            if (nextquestionid!=0 ) {
            $('#' + nextbtn).css("visibility", "visible");

            }
        }
    })
    return true;
    }


}


function nextquestion( buttonid) {

    // Check if answer is given or not
    if (checkanswer(buttonid) == true) {
        var url=$('#'+buttonid).data('nextquestionurl');

    var nextquestionid = $('#' + buttonid).data('nextquestionid');

    if(nextquestionid !=0) {
        $.ajax({
            type: "GET",
            dataType: "html",
            url: url,

            data: {
                "_token": "{{ csrf_token() }}",
                "correctanswer":$('#correctanswer').text(),
                "badanswer":$('#badanswer').text(),
            },
            success: function (response) {
                //     console.log(response);
                $('#hideAll').empty();
                $('#hideAll').html(response);

                if($('#passageid').val() == ''  || $('#passageid').val() == 0) {
                    $('#passagebtn').hide();
                    $('#mainboxdiv').removeClass('mainbox');
                    $('#mainboxdiv').addClass('mainbox1');
                }
                else {
                    $('#mainboxdiv').removeClass('mainbox1');
                    $('#mainboxdiv').addClass('mainbox');
                    $('#passagebtn').show();
                }
            }
        })

    }
    else {
        $('#passagebtn').hide();
        $('#' + buttonid).html("end  Question");

        var urlresult=$('#' + buttonid).data('result');


        $.ajax({
            type: "GET",
            dataType: "html",
            url: urlresult,

            data: {
                "_token": "{{ csrf_token() }}",
            },
            success: function (response) {
                $('#hideAll').empty();
                $('#hideAll').html(response);
                //     $('#'+divid).html(response);
            }
        })


    }
    }
    
    

}

//show passage page
$('#passagebtn').on('click', function () {


    var link=$('#passageid').data('link');


    $('html, body').animate({
        scrollTop: 0
    }, 100);


    $.ajax({
        type: "GET",
        dataType: "html",
        url: $('#passageid').data('link'),
        data: {
            "_token": "{{ csrf_token() }}",

        } ,
        success:function(response) {
            $('#passageinfo').html(response);
            console.log('passageloaded');

        }
    })
});