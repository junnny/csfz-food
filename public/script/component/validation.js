import $ from '../vendor/jquery';
import '../vendor/jquery.validate';

$.validator.addMethod("USERNAME", function (value, element, param) {
    return this.optional(element) || /^[0-9a-zA-Z]{6,15}$/.test(value);
});

$.validator.addMethod("PASSWORD", function (value, element, param) {
    return this.optional(element) || /^[0-9a-zA-Z_]{6,15}$/.test(value);
});

$.validator.addMethod("REALNAME", function (value, element, param) {
    return this.optional(element) || /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/.test(value);
});

$.validator.addMethod("MOBILE", function (value, element, param) {
    return this.optional(element) || /^[0-9]{11}$/.test(value);
});

$.validator.addMethod("PRICE", function (value, element, param) {
    return this.optional(element) || /^[0-9]*\.?[0-9]+$/.test(value);
});
