// Finish practice
function finishPractice() 
{
    var url = site_url + "/practice/finish";
    $('#totalMinutes').val($('#countdown').text()); 
    $('#rightanscount').val($('#right_ans_count').text());
    $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
   
    $.ajax({
        type : "POST",
        url : url,
        data : $("#finishForm").serialize(),
        success: function (response) {
            $('#hideAll').html(response);
        }
    });
}