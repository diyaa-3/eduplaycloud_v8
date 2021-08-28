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
        password: {
            required: true,
            minlength: 6
        },
        conform_password: {
            required: true,
            minlength: 6,
            equalTo: "#password"
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

});
