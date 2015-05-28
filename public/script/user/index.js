import $         from '../vendor/jquery';
import ui        from '../component/ui';
import constants from '../component/constants';


$('#tbody').on('click', '.js-add', function () {
    var $this = $(this);
    ui.dialog({
        title: '确认添加管理员权限？',
        onCertain: function () {
            var userId = $this.data('userid');

            $.post('/vo/manage/set', {userId: userId}, function (response) {
                if (response.code === constants.resCode.COMMON) {
                    ui.tip({content: '添加成功'});
                    $this.removeClass('btn-primary js-add').addClass('btn-info js-cancel').text('取消管理员权限');
                } else {
                    ui.tip({content: response.errors});
                }
            });
        }
    });
});

$('#tbody').on('click', '.js-cancel', function () {
    var $this = $(this);
    ui.dialog({
        title: '确认取消管理员权限？',
        onCertain: function () {
            var userId = $this.data('userid');

            $.post('/vo/manage/cancel', {userId: userId}, function (response) {
                if (response.code === constants.resCode.COMMON) {
                    ui.tip({content: '取消成功'});
                    $this.addClass('btn-primary js-add').removeClass('btn-info js-cancel').text('添加管理员权限');
                } else {
                    ui.tip({content: response.errors});
                }
            });
        }
    });
});