import $         from '../vendor/jquery';
import ui        from '../component/ui';
import constants from '../component/constants';

$('.js-delete').click(function () {
    var $this = $(this);
    ui.dialog({
        title: '确认删除？',
        onCertain: function () {
            var foodId = $this.data('foodid');

            $.post('/vo/manage/food/delete', {foodId: foodId}, function (response) {
                if (response.code === constants.resCode.COMMON) {
                    ui.tip({content: '删除成功'});
                    $this.closest('tr').remove();
                } else {
                    ui.tip({content: response.errors});
                }
            });
        }
    });
});
