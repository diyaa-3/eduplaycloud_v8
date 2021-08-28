$('#registeredOn').datetimepicker({
    format: 'DD/MM/YYYY'
});

jQuery(document).ready(function ($) {
    $.extend(jQuery.validator.messages, {
        remote: message['validator_remote'],
        email: message['validator_email'],
        url: message['validator_url'],
        date: message['validator_date'],
        number: message['validator_number'],
        digits: message['validator_digits'],
        equalTo: message['validator_equalTo'],
        maxlength: jQuery.validator.format(message['validator_maxlength']),
        minlength: jQuery.validator.format(message['validator_minlength']),
        rangelength: jQuery.validator.format(message['validator_rangelength']),
        range: jQuery.validator.format(message['validator_range']),
        max: jQuery.validator.format(message['validator_max']),
        min: jQuery.validator.format(message['validator_min'])
    });

    jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, message['regx_phone']);

    $(".cdev").circlos();
});

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please enter your linkedin url."
);

$('INPUT[type="file"]').change(function (e) {
        var ext =  e.target.files[0].name.split('.').pop().toLowerCase();
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                $('#profileBtn').attr('disabled', false);
                $('#profileError').slideUp("slow");
                break;
            default:
            $('#profileError').slideDown("slow");
            $('#profileBtn').attr('disabled', true);
                this.value = '';
        }
    });

$("#profile").validate({
    rules: {
        registeredOn: {
            // required: true,
        },
        name: {
            required: true,
            maxlength: 30
        },
        email: {
            required: true,
            email: true
        },
        username: {
            required: true,
        },
        mobile: {
            // required: true,
            minlength: 8,
            maxlength: 13,
            number: true,
            // phoneUS: true
        },
        grade_id: {
            // required: true,
        },
        user_image: {
            accept: "image/jpg,image/jpeg,image/png,image/gif"
        },
        uilanguage_id: {
            // required: true,
        },
        native_language: {
            // required: true,
        },
        gender: {
            // required: true,
        },
        dob: {
            // required: true,
        },
        state: {
            // required: true,
        },
        city: {
            // required: true,
        },
        country_id: {
            // required: true,
        },
        linkedin_url: {
            // url: true
            regex: "^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$" 
        },
        aboutme: {
            // required: false,
        },
    },
    messages: {

    }
});

$("#frmChangePassword").validate({
    rules: {
        old_password: {
            required: true,
            remote: {
                url: site_url + "/users/validate/password",
                type: "POST",
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                data: {
                    value: function () {
                        return $("#old_password").val();
                    }
                }
            }
        },
        profile_password: {
            required: true,
            minlength: 6
        },
        conform_password: {
            required: true,
            minlength: 6,
            equalTo: "#profile_password"
        }
    },
    messages: {
        old_password: {
            remote: $.validator.format(message['remote_old_password'])
        },
        conform_password: {
            equalTo: message['confirm_password']
        }
    },
    ignore: [],
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
    submitHandler: function (form) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: site_url + "/users/change/password",
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content'),
                "password": $("#conform_password").val()
            },
            beforeSend: function () {
                $('#rechange_pswrd').block({ css: { border: 'none', backgroundColor: 'none' }, message: '<img src="' + site_url + '/assets/eduplaycloud/image/loader.gif" alt="Loading" width="100" />' });
            },
            success: function (response) {
                $('#frmChangePassword')[0].reset();
                $('#rechange_pswrd').modal('hide');
                $('#rechange_pswrd').unblock();

                swal(response.message, {
                    closeOnClickOutside: false,
                    icon: (response.icon),
                    button: {
                        text: message['ok'],
                    },
                }).then(function () {

                });
            },
            error: function (err) {
                $('#rechange_pswrd').unblock();
            }
        });

        return false;
    }
});

function addrole(url) {
    $.ajax({
        type: "POST",
        dataType: "text",
        url: url,
        data: {
            "_token": $('meta[name="csrf-token"]').attr('content'),
        },
        success: function (response) {
            swal(message['role_added_successfully'], {
                closeOnClickOutside: false,
                icon: 'success',
                button: {
                    text: message['ok'],
                  },
            }).then(function () {
                location.reload();
            });
        },
        error: function (err) {
            // console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
        }
    })
}

function removerole(url) {
    $.ajax({
        type: "POST",
        dataType: "text",
        url: url,
        data: {
            "_token": $('meta[name="csrf-token"]').attr('content'),
        },
        success: function (response) {
            if ($(".teacher-action .custom-control-input:checkbox:checked").length != '1') {
                swal(message['role_removed_successfully'], {
                    closeOnClickOutside: false,
                    icon: 'success',
                    button: {
                        text: message['ok'],
                      },
                }).then(function () {
                    location.reload();
                });
            } else {
                location.reload();
            }
        },
        error: function (err) {
            // console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
        }
    })
}