import $ from '../vendor/jquery';
import '../component/validation';


$('#loginForm').validate({
    focusInvalid: false,
    focusCleanup: true,
    onkeyup: false,
    rules: {
        username: {
            required: true
        },
        password: {
            required: true
        }
    },
    messages: {
        username: {
            required: '请输入用户名'
        },
        password: {
            required: '请输入密码'
        }
    },
    onfocusout: function (element) {
        $(element).valid();
    },
    highlight: function (element, errorClass, validClass) {
        $(element).closest('div.form-group').addClass('has-error');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).closest('div.form-group').removeClass('has-error');
    }
});