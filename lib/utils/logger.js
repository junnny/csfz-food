/**
 * @author yuyangyang
 * @time 2015/2/3
 */

var log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'console'
        },
        {
            type: 'file',
            filename: 'logs/default.log',
            maxLogSize: 20971520,
            backups: 10,
            category: 'default'
        },
        {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 20971520,
            backups: 10,
            category: 'access'
        }
    ],
    replaceConsole: true
});

module.exports = log4js;