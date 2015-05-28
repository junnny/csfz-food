/**
 * @author yuyangyang
 * @time 2015/2/3
 */
var fs = require('fs'),
    logger = require('../../lib/utils//logger').getLogger('default');

module.exports = {
    mapping: '/_debug',
    get: {
        '/': function (req, res) {
            res.render('_debug/index');
        },
        '/:filename': function (req, res) {
            var filename = req.params.filename;
            fs.readFile(process.cwd() + '/logs/' + filename, function (err, data) {
                if (err) {
                    logger.error(err);
                }

                res.end(data);
            });

        }
    }
}