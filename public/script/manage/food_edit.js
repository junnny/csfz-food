import $ from '../vendor/jquery';
import '../component/validation';


$('#foodEditForm').validate({
    focusInvalid: false,
    focusCleanup: true,
    onkeyup: false,
    rules: {
        name: {
            required: true
        },
        price: {
            required: true,
            PRICE:true
        }
    },
    messages: {
        name: {
            required: '请输入套餐名称'
        },
        price: {
            required: '请输入套餐价格',
            PRICE:'套餐价格格式错误'
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


