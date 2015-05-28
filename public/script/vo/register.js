import $ from '../vendor/jquery';
import '../component/validation';


$('#registerForm').validate({
    focusInvalid: false,
    focusCleanup: true,
    onkeyup: false,
    rules: {
        password: {
            required: true,
            PASSWORD: true
        },
        confirmPassword: {
            required: true,
            equalTo: '#inputPassword'
        },
        realname: {
            required: true,
            REALNAME: true
        },
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        password: {
            required: '请输入密码',
            PASSWORD: '6~15数字、字母和下划线组合，区分大小写'
        },
        confirmPassword: {
            required: '请输入确认密码',
            equalTo: '两次密码输入不一致'
        },
        realname: {
            required: '请输入真实姓名',
            REALNAME: '格式错误，请输入中文'
        },
        email: {
            required: '请输入邮箱',
            email: '邮箱格式错误'
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