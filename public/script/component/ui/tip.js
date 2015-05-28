import $ from '../../vendor/jquery';


var $tip = $('<div class="alert alert-info ui-tip" style="display: none;"></div>');
$tip.appendTo($('body'));

export default function (options) {
    var content = options.content;             //显示的内容
    var callback = options.callback || $.noop; //回调
    var autoClose = options.autoClose || true; //自动隐藏提示
    var time = options.time || 1500;
    $tip.html(seriContent(content));

    $tip.slideDown();
    callback($tip);
    if (autoClose) {
        setTimeout(function () {
            $tip.slideUp();
        }, time);
    }
}

function seriContent(content) {
    if (typeof(content) === 'object') {
        var con = content.map(function (item) {
            return '<p>' + item + '</p>';
        });

        return con;
    }

    return content;
}