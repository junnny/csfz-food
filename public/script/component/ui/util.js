import $ from '../../vendor/jquery';

export default{
    calculate: function ($el) {
        var top = ($(window).height() - $el.height()) / 2 + $(window).scrollTop();
        var left = ($(window).width() - $el.width()) / 2 + $(window).scrollLeft();
        $el.css({
            'top': top > 0 ? top : 0,
            'left': left > 0 ? left : 0,
            'z-index': 1111,
            'position': 'absolute'
        });
    }
}
