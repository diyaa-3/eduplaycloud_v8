function requestjoin(url,id,show_url) {
    //   alert (url);
    $.ajax({
        url: url,
        dataType: "json",
        type: 'get',
        success: function (response) {
            
            if($('#route_name').val() !== 'courseclasses.courseclass.show'){
                
                swal(response.message, {
                    icon: "success",
                    button: {
                        text : message['ok']
                    }
                });
            }

            // Set the requested button
            $('#request-btn-change'+id).html('<a href='+show_url+'><button class="requestjoin btn rqst_btn">'+message['requested']+'</button></a>');

            //setTimeout(window.location.reload(), 10000);
            //window.location.reload();
        },
        error: function(response) {
            
        }
    });
}

var page = 1;
var countpages=$("#sul").data("countpages");

$("body").scroll(function() {

    if (page<=countpages) {
        if ($("body").scrollTop() + $("body").height() >= $(document).height()) {
            
            page = page + 1;
            loadMoreData(page);
        }


    }

});

function loadMoreData(page){
    
    var url1='?page=' + page
    $.ajax(
        {
            url: url1,
            type: "get",
            beforeSend: function()
            {
                $('.ajax-load').show();
            }
        })
        .done(function(data)
        {
            if(data.html == ""){
                $('.ajax-load').hide();
                $('.end-load').show();
                // $('.ajax-load').html("No more Classes found");


                return;
            }
            $('.ajax-load').hide();
            $("#sul").append(data.html);
        })
        .fail(function(jqXHR, ajaxOptions, thrownError)
        {
            
            // console.log(thrownError);
        });
}