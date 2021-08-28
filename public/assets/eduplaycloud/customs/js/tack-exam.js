
//Declare Global variable.
  var last_remind_page;
  var result;
  var clickedPage = [];


  var questionPaginationArray = [];

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

//Timer start
function clocktimerOn(){
    var clocktimer = $('#clock_time').attr('data-max_time');
    $('#max_time_append').val(clocktimer);
    var finalTime = parseInt(clocktimer) * 1000;
    beginTimer(finalTime); // Restart timer from beginning
}

//When document ready call exam question.
$(document).ready(function(){
    
    $('body li #exploreMenu').addClass('active');
    getNextQuestion(0);
    
    last_remind_page = 0;   
    
    setTimeout(function(){ 
        var questionCount = $('#totalQuestion').val();
        for (i = 1; i <= questionCount ; i++) {
            questionPaginationArray[i] = false;
        }
        clocktimerOn();
    }, 500);
    

    // call next question index find method.
    $(document).on('click','.next-btn',function(){
        jQuery('.arrow__next').focus().click();
        $('#back_button').show();
    });

    //Call Skipped question with this method.
    $(document).on('click','#skip_button',function(){
        jQuery('.arrow__next').focus().click();

        // if(last_remind_page == 0){
            // getNextQuestion(last_remind_page);
        // } else {
            // getNextQuestion(last_remind_page - 1);
            // last_remind_page
        // }
    });

    $(document).on('click','.finsh-btn',function(){
        setSpantime();
        setQuestionIndex();


        // href="{{route('takeexam.score' ,[])}}";
        var spen_time = $('#countdown').text();

        var finishurl = $(this).attr('data-url') + '?spen_total_time=' + spen_time; 

        setTimeout(function(){
            window.location.href = finishurl; 
        }, 500);
    });

})

  //Navigation script
  $('.pagination').pajinatify({
      onChange: function (currentPage) {

          setSpantime();
          //Call Question.
          if(currentPage <= $('#totalQuestion').val() && currentPage !== 1) {
              $('#back_button').show();
          } else {
              $('#back_button').hide();
          }

            if(currentPage == $('#totalQuestion').val()){
              $('#next_button').hide();
            } else {
              $('#next_button').show();
            }
            
            checkAnswerSelectedOrNot();
            getNextQuestion(currentPage)
            $('#question_index').val(currentPage);
            last_remind_page = currentPage;
            clocktimerOn();
      },
      debug: 0
  });


//Display skip question number.
function displaySkipedNumberOnDashboard(){
    $('#skip_result').empty();
    for (var key in questionPaginationArray) {
        if(questionPaginationArray[key]  == false){
            $('#skip_result').append('<div class="skip-number" data-question="'+key +'">'+key +'</div>');
        } else {
            $('div[data-question="'+key+'"]').remove();
        }
    }
}

 //Check Option selected or not.
 function checkAnswerSelectedOrNot(){ 
    if ($("input[name='ans_rdo']:checked").length > 0){
        questionPaginationArray[last_remind_page] = true;
        // Answere store with ajax by this method use.
        answereStoreWithAjax($("input[name='ans_rdo']:checked").attr('id'))
    }

    displaySkipedNumberOnDashboard();
}

//Find Skip range.
function range(start, end) {
    var skip_pages = [];
    var count_start = Number(start) + 1;
    for (i = count_start; i < end; i++) {
        skip_pages.push(i);
    }

    return skip_pages;
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
    jQuery('.arrow__prev').focus().click();
}

$(document).on('click','.skip-number',function(){
    var find = Number($(this).attr('data-question'));
    //Call Question.
        getNextQuestion(find)
        $("span[data-page='"+find+"']").click();
        $('.pajinatify__button').removeClass('pajinatify__current');
        $("span[data-page='"+find+"']").addClass('pajinatify__current');

        last_remind_page = find;
        
});

//Next Question's get.
function getNextQuestion(question_index){
    var question = question_index - 1; 
    if(question == -1){
        question = 0;
    }
    // console.log(question);
    var url = site_url + '/takeexam/n/n/next/' + question;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function (response) {
            if (response.error != false) {
            
                var currentQuestionId = response.question[0].question_id;
                $('#hidden_que_id').val(currentQuestionId);
                pRunTackExam(response.question);
                
                alreadyAnswerd = response.dontskipquestion;
            } else {
            }
            
        }
    });
}
//Exam question render with plug in.
function pRunTackExam(json_details_exam) {
    var data = json_details_exam;
    var previewFrame = document.getElementById('examQuestionpreview');
    var static_parserOutputObjExamDetail = data;
    var static_plugin_parserOutputObj = renderPluginsinObj(static_parserOutputObjExamDetail);
    var finalObj = static_plugin_parserOutputObj;
    previewFrame.innerHTML = renderToHtml_E(finalObj);
    reInitiate();
  }


//set span time in question.
function setSpantime(){
    var spen_time = Number($('#timer').html());
    var max_time = Number($('#max_time_append').val());

    var total_time =  max_time - spen_time;
    $('#spen_time').val(total_time);
}

//Answere checked with ajax call.
function answereStoreWithAjax(answere){
    var classexam = $('#' + answere).attr('data-classexam-id');  
    var answere_id = $('#' + answere).val();

    $.ajax({
        type:'GET',
        url: site_url + '/takeexam/n/n/answer/' + answere_id + '/' + classexam,
        data: {
            "timespent": $('#spen_time').val()
        },
        success: function (answere_response) {

        }
        
    });
}


// Get next question index by finish.
function setQuestionIndex(){

    if ($("input[name='ans_rdo']:checked").length > 0){
       
        // Answere store with ajax by this method use.
        answereStoreWithAjax($("input[name='ans_rdo']:checked").attr('id'))

        setTimeout(function(){ 

            var index = $('#question_index').val();
            var total_questions = $('#totalQuestion').val() - 1; 
            ++index;
            $('#question_index').val(index);
            
            if( index !== total_questions){
                $('#back_button').show();
                // $('#finish_button').hide();
            } else {    
                $('#next_button').hide();
                // $('#finish_button').show();
            }
            //Call fetch question by index.
            getNextQuestion($('#question_index').val())

            $('div[data-question="'+last_remind_page+'"]').remove();

        }, 1000);
    } else {
        
        // var msg =   '<div class="alert alert-warning alert-dismissible fade show" role="alert">'
        //             +'<strong>'+message['warning']+'!</strong>'+message['please_select_atleast_one_answer']+' '
        //             +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
        //             +'<span aria-hidden="true">&times;</span>'
        //             +'</button>' 
        //             +'</div>';
                    
        // $('#flash_msg').html(msg);
    }

};
