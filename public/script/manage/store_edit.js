import $ from '../vendor/jquery';
import '../component/validation';


$('#storeEditForm').validate({
    focusInvalid: false,
    focusCleanup: true,
    onkeyup: false,
    rules: {
        name: {
            required: true
        },
        mainProduct: {
            required: true
        },
        telephone: {
            required: true,
            number: true
        },
        address: {
            required: true
        }
    },
    messages: {
        name: {
            required: '请输入店铺名称'
        },
        mainProduct: {
            required: '请输入主营产品'
        },
        telephone: {
            required: '请输入联系电话',
            number: '联系电话格式错误'
        },
        address: {
            required: '请输入店铺地址'
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

