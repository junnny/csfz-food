import $ from '../../vendor/jquery';
import util from './util';


var $dialog = $('<div class="dialog">' +
'               <div class="modal-dialog" style="width:300px;">' +
'                   <div class="modal-content">      ' +
'                       <div class="modal-header">          ' +
'                           <button type="button" class="close js-close"><span>&times;</span></button>   ' +
'                           <h4 class="modal-title js-title"></h4>   ' +
'                       </div>      ' +
'                       <div class="modal-footer">   ' +
'                           <button type="button" class="btn btn-default js-close">取消</button>   ' +
'                           <button type="button" class="btn btn-primary js-certain">确定</button>      ' +
'                       </div>   ' +
'                   </div>' +
'               </div>' +
'             </div>');

var $alpha = $('<div id="dialogMask" class="alpha"></div>');

$alpha.appendTo('body');
$dialog.appendTo($('body'));

export default function (options) {
    var title = options.title;
    var onCertain = options.onCertain || $.noop;
    var onClose = options.onClose || $.noop;

    $dialog.find('.js-title').text(title);

    $dialog.find('.js-close').click(function () {
        hideDialog();
        onClose();
    });

    $dialog.find('.js-certain').click(function () {
        hideDialog();
        onCertain();
    });


    showDialog();
    function showDialog() {
        util.calculate($dialog);
        $alpha.show();
        $dialog.show();
    }

    function hideDialog() {
        $alpha.hide();
        $dialog.hide();
    }
}