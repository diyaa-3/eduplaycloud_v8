//Get Parameter name in lable.


var total = 0;
function getParameterName(id,size=null)
{
    var AvailableSize = 500000 - (size * 1000);
    var fileInput = document.getElementById(id);

     // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
     if (fileInput.files.length > 0) {
        // RUN A LOOP TO CHECK EACH SELECTED FILE.
        var total = 0;
        $('#pera_selected').html('you have '+ fileInput.files.length +' files selected.');
        $('#sizeError').html('');

        for (var i = 0; i <= fileInput.files.length - 1; i++) {

            var ext =  fileInput.files[i].name.split('.').pop().toLowerCase();
			//alert(ext);
			switch (ext) {
				case 'csv':
                    $('#errorCSV').slideUp("slow");

                    $('#'+id).next().next('span.filenme').append(fileInput.files[i].name + ' , ');
                    var fsize = fileInput.files.item(i).size;      // THE SIZE OF THE FILE.
                    checkFileSize(fileInput.files[i],'csv',120000) // 120000
                    //total += Math.round((fsize / 1024));
                    $('#import_btn').removeAttr('disabled');

					break;
				default:
                $('#errorCSV').slideDown("slow");
                $('#import_btn').addAttr('disabled');                
			}

        }

        if(total < AvailableSize){
            if($('#json').val() != ''){
                $('#import_btn').removeAttr('disabled');
            }
            $('#perameter_error').html('');
        } else {
            $('#import_btn').addAttr('disabled');
            $('#perameter_error').html(message['max_500mb']);
        }
    }
}

//Get Image name in lable.
function getImageName(id,size=null)
{
    var AvailableSize = 500000 - (size * 1000);
    var fileInput = document.getElementById(id);

    // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
    if (fileInput.files.length > 0) {
        // RUN A LOOP TO CHECK EACH SELECTED FILE.

        $('#img_selected').html('you have  '+ fileInput.files.length +' files selected.');
        $('#sizeError').html('');
        $('#import_btn').removeAttr('disabled');
        for (var i = 0; i <= fileInput.files.length - 1; i++) {

            var ext =  fileInput.files[i].name.split('.').pop().toLowerCase();
			//alert(ext);
			switch (ext) {
				case 'jpg':
				case 'jpeg':
				case 'png':
				case 'gif':
                    $('#errorImg').slideUp("slow");
                    $('#'+id).next().next('span.filenme').append(fileInput.files[i].name + ' , ');
                    var fsize = fileInput.files.item(i).size;      // THE SIZE OF THE FILE.
                    checkFileSize(fileInput.files[i],'image',120000) // 120000
                    $('#import_btn').removeAttr('disabled');
					break;
				default:
                $('#errorImg').slideDown("slow");
                $('#import_btn').addAttr('disabled');
			}
        }
        //console.log(total,AvailableSize);
        if(total < AvailableSize){
            if($('#json').val() != ''){
                $('#import_btn').removeAttr('disabled');
            }
            $('#image_error').html('');
        } else {
            $('#import_btn').addAttr('disabled');
            $('#image_error').html(message['max_500mb']);
        }
    }
}


function checkJsonFormat(id){
    try {
        var c = $.parseJSON($('#'+id).val());
        $('#json_input_error').html('');
        $('#import_btn').removeAttr('disabled');
    }
    catch (err) {
        $('#import_btn').attr('disabled','disabled');
        $('#json_input_error').html('Please enter JSON format value.');
    }

}


//Form Validation
$("#import_form").validate({
    // Specify validation rules
    rules: {

    },
    submitHandler: function(form) {
        checkJsonFormat('json');
        $('.main_loader').show();

      
        form.submit();
    }
});


	// Function for size
	function checkFileSize(file,path,maxSize) {
		if(file.size > maxSize)
		{
            $('#sizeError').append("<span></span>"+file.name+' of '+path+' file size should not more than '+(maxSize / 1000)+'KB'+"</span></br>");
			$('#sizeError').slideDown("slow");
            $('#import_btn').addAttr('disabled');
		}else{
			return total += (file.size/1024);
		}
	}
