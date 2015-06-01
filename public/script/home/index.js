import $         from '../vendor/jquery';
import ui        from '../component/ui';
import Swiper    from '../vendor/swiper';
import constants from '../component/constants';

var $endOrder = $('#endOrder');

$endOrder.click(function () {
    ui.dialog({
        title: '确认结束本次点餐？',
        onCertain: function () {
            $.post('/order/end', function (response) {
                if (response.code === constants.resCode.COMMON) {
                    location.reload();
                } else {
                    ui.tip({content: '没有操作权限'});
                }

            });
        }
    });

});


/**
 * banner slides
 */
new Swiper('.swiper-container', {
    autoplay: 3000,
    loop: true,
    pagination: '.swiper-pagination'
});

$('.js-toggle').click(function(){
    $(this).toggleClass('glyphicon-plus glyphicon-minus');
    $(this).closest('div.well').find('.js-content').toggle();
});

