/**
 * @author yuyangyang
 * @time 2015/2/3
 * @description app Module
 */
var express = require('express'),
    handlebars = require('./lib/utils/hbs-extend'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    rewriter = require('./lib/utils/rewriter'),
    log4js = require('./lib/utils/logger'),
    errors = require('./lib/utils/errors'),
    conf = require('./config.json'),
    router = require('express-mapping'),
    app = express(),
    authority = require('./lib/utils/authority'),
    filter = require('./lib/utils/filter');
path = require('path');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(log4js.connectLogger(log4js.getLogger('access'), {
    level: log4js.levels.INFO,
    format: ':remote-addr :method :url HTTP/:http-version :status ":user-agent" :response-timems',
    nolog: /\/(script|_debug|css)/
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, (conf.devMode ? '/public' : '/dist'))));
app.use(errors.domain);
app.use(rewriter.inbound());
app.use(filter.filter);
app.use(authority.filter);
app.use(router('lib/controller'));
app.use(errors.notFound);

module.exports = app;
