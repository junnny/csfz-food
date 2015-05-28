import $ from '../vendor/jquery';
import ui from '../component/ui';

var $container=$('#container');


$('.js-delete').click(function () {
    var orderId = $(this).data('orderid');
    var $this = $(this);

    $.post('/order/delete', {_id: orderId}, function (data) {
        if (data) {
            ui.tip({content: '取消成功'});
            $this.closest('tr').remove();

            if ($('#orderList').find('tr').length === 0) {
                $container.find('table').remove();
                $container.html('<h4>暂无订单，马上<a href="/store/">点餐</a></h4>');
            }
        }
    });
});