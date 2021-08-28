/* $('#start_date,#end_date').datetimepicker({
    format: 'DD/MM/YYYY',
    useCurrent: false,
    minDate: moment()
});
$('#start_date').datetimepicker().on('dp.change', function (e) {
    var incrementDay = moment(new Date(e.date));
    incrementDay.add(1, 'days');
    $('#end_date').data('DateTimePicker').minDate(incrementDay);
    $(this).data("DateTimePicker").hide();
});
$('#end_date').datetimepicker().on('dp.change', function (e) {
    var decrementDay = moment(new Date(e.date));
    decrementDay.subtract(1, 'days');
    $('#start_date').data('DateTimePicker').maxDate(decrementDay);
    $(this).data("DateTimePicker").hide();
}); */

$('#start_date').datetimepicker({
    minDate:new Date().setHours(0,0,0,0),
    format: 'DD/MM/YYYY',
    /*maxDate: 'now'*/
});
$('#end_date').datetimepicker({
    minDate:new Date().setHours(0,0,0,0),
    format: 'DD/MM/YYYY',
    useCurrent: false
});
$("#start_date").on("dp.change", function (e) {
    $('#end_date').data("DateTimePicker").minDate(e.date);
});
$("#end_date").on("dp.change", function (e) {
    $('#start_date').data("DateTimePicker").maxDate(e.date);
});

$("#language_id").on("change",function() {
    $("label[for='language_id']").text('');
});


/* dynamic grades - Client code  */
$('#discipline_id').on('change', function(){
    var id=$(this).val();
    var url=site_url+'/exercisesets/getClassgrades/'+$(this).val();
    $.get(url,
    function(data) {
        var grades = $('#grade_id');
        grades.empty();
        grades.append("<option value=''>" + "Select grade" + "</option>");
        $.each(data, function(index, element) {
            console.log(element.id);
            grades.append("<option value='"+ element.id +"'>" + element.grade_name + "</option>");
        });

        $('.selectpicker').selectpicker('refresh');
    });
});

/* Validation */

$("#createClassForm").validate({
    rules: {
        class_name: {
            required: true,
            maxlength: 30
        },
        class_description: {
            required: true,
        },
        language_id: {
            required: true,
        },
        start_date: {
            required: true,
        },
        end_date: {
            required: true,
        },
        // discipline_id: {
        //     required: true,
        // },
        // grade_id: {
        //     required: true,
        // },
        // user_image: {
        //     extension: "jpg|jpeg|png"
        // },
    },
    messages: {

    }
});

// Image trigger
$("#output").click(function(){
    $("#image").trigger("click");
});