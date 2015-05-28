import $ from '../vendor/jquery';
import ui from '../component/ui';

$('.js-order').on('click', function () {
    var foodId = $(this).data('foodid');
    var storeId = $(this).data('storeid');
    var count = $(this).next().val();
    $.post('/order/new', {food: foodId, store: storeId, count: count}, function (data) {
        if (data) {
            ui.tip({content: '订餐成功'});
        }
    });
});