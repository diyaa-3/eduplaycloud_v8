//This is for more hint count use.
var hint;
var hintCount = 1;

$(document).ready(function(){

    if ($('#totalQuestion').val() == 1) {
        $('#next_button').addClass('finsh-btn orgng_btn');
        $('#next_button').text('Finish');
    } 
    $('body li #exploreMenu').addClass('active');
    getNextQuestion(0);

    // call next question index find method.
    $(document).on('click','.next-btn',function(){
        spenTimeCountDown();       
        
    });

    $(document).on('click','.finsh-btn',function(){

        if ($('#totalQuestion').val() > 1) {
            spenTimeCountDown();
        }
        
        if ($("input[name='ans_rdo']:checked").length > 0){
            
                setTimeout(function(){ 
                    finishPractice()
                }, 2000);
            
        }
    });
})

// Get next question index.
function setQuestionIndex(){

    if ($("input[name='ans_rdo']:checked").length > 0){

        $('.next-btn').attr('disabled','disabled');
       
        // Answere store with ajax by this method use.
        answereStoreWithAjax($("input[name='ans_rdo']:checked").attr('id'))
        hintCount = 1;
      
        setTimeout(function(){ 

            var index = $('#question_index').val();
            var total_questions = $('#totalQuestion').val() - 1; 
            ++index;
            $('#question_index').val(index);
            
            // console.log(index);
            // console.log(total_questions);

            if( index !== total_questions){
                $('#back_button').show();
                // $('#finish_button').hide();
            } else {
                setTimeout(function(){ 
                    $('#next_button').hide();
                    //$('#finish_button').show();
                }, 500);
            }
            //Call fetch question by index.
            getNextQuestion($('#question_index').val())
            $('.next-btn').removeAttr('disabled');

        }, 2000);
    } else {
        
        var msg =   '<div class="alert alert-warning alert-dismissible fade show" role="alert">'
                    +'<strong>'+message['warning']+'!</strong>'+message['please_select_atleast_one_answer']+' '
                    +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                    +'<span aria-hidden="true">&times;</span>'
                    +'</button>'
                    +'</div>';
                    
        $('#flash_msg').html(msg);
    }

    

};

//Answere checked with ajax call.
function answereStoreWithAjax(answere){

    
    var question_id = $('#' + answere).attr('data-question-id');
    var answere_id = $('#' + answere).val();
    var exercise_id = $('#exercise_id').val();
    var topic_id = $('#topic_id').val();

    // console.log(answere);

    $.ajax({
        type: "GET",
        url:  site_url + '/practice/answere/store',
        data: {
            "question_id" : question_id,
            "answere_id" : answere_id,
            "exercise_id" : exercise_id,
            "topic_id" : topic_id,
        },
        success: function (answere_response) {

            $('#ans_' + answere_response.correct_ans).addClass('is_crct_ans');

            if(answere_response.iscorrect == true){

                $('#ans_' + answere_response.answere_id).addClass('is_crct_ans');

                
                //Set right answare count.
                var right_answare = Number($('#right_ans_count').text()) + 1;
                $('#right_ans_count').text(right_answare)
                
                //Set Consecutive answare
                var consecutive_ans_count = Number($('#consecutive_ans_count').text()) + 1;
                $('#consecutive_ans_count').text(consecutive_ans_count)

            } else {
                $('#consecutive_ans_count').text(0)
                $('#ans_' + answere_response.answere_id).addClass('is_incrct_ans');

                $('html, body').animate({
                    scrollTop: ($('.is_crct_ans').offset().top-90)
                },500);
            }

            
            
        }
    });

}


//Next Question's get.
function getNextQuestion(question_index){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var url = site_url + '/practice/next/' + question_index;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function (response) {
            if (response.error == false) {

                setTimeout(function(){ 
                    $('#next_button').hide();
                    $('#finish_button').show();
                }, 100);
            } else {

                
                var currentQuestionId = response[0].Questions[0].question_id;
                $('#hidden_que_id').val(currentQuestionId);

                pRun(response);

                //Set more hint hide;
                setTimeout(function(){
                    hideAllMorehint();
                },500);
            }
            
        }
    });

    
}

//Set the total timer
var input = {
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
};

var timestamp = new Date(input.year, input.month, input.day,
input.hours, input.minutes, input.seconds);

var interval = 1;
var finalSec = 0;
var finalMin = 0;
setInterval(function () {
    timestamp = new Date(timestamp.getTime() + interval * 1000);
    
    if (timestamp.getMinutes() == 0 ) {
        finalMin = '0' + timestamp.getMinutes();
    } else if (timestamp.getMinutes() > 9 ) {
        var min = timestamp.getMinutes();
        var len = min.length;
        if (len > 2) {
            finalMin = sec.slice(2);
        } else {
            finalMin = timestamp.getMinutes();
        }
    } else {
        finalMin = '0' + timestamp.getMinutes();
    }

    if (timestamp.getSeconds() > 9) {
        var sec = timestamp.getSeconds();
        var len = sec.length;
        if (len > 2) {
            finalSec = sec.slice(2);
        } else {
            finalSec = timestamp.getSeconds();
        }
    } else {
         finalSec = '0' + timestamp.getSeconds();
    }
    
    if (document.getElementById('countdown') != undefined) {
        document.getElementById('countdown').innerHTML =   finalMin + ':' + finalSec;
    }
    
}, Math.abs(interval) * 1000);


//Spen time count down.
function spenTimeCountDown(){
    var spen_time = Number($('#timer').html());
    var max_time = Number($('#clock_time').html());

    var total_time =  max_time - spen_time;
    $('#spen_time').val(total_time);
    //Call question index function.
    setQuestionIndex();
}



// Back button functionality.
function questionBack(){
    var previous = $('#question_index').val();   
    --previous;

    $('#question_index').val(previous);

    if( previous !== 0){
        $('#next_button').show();
    } else {
        $('#back_button').hide();
    }

    //Call fetch question by index.
    getNextQuestion($('#question_index').val())
}