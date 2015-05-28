/**
 * @author yuyangyang
 * @time 2015/3/11
 */
var mongoose = require('mongoose');
var logger = require('../utils/logger').getLogger('default');
mongoose.connect('mongodb://localhost/test7');

var db = mongoose.connection;
db.on('error', function (err) {
    logger.error('Mongodb '+err);
});
db.once('open', function () {
    logger.info('Mongodb has connected');
});

module.exports = mongoose;