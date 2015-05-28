var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
function getEntry() {
    var entry = {};

    glob.sync('**/*.js', {
        cwd: __dirname + '/public/script/'
    }).forEach(function (file) {
        var module = file.split('/')[0];
        if (module !== 'partials' && module !== 'component' && module !== 'vendor') {
            entry[path.dirname(file) + '/' + path.basename(file, path.extname(file))] = './' + file;
        }
    });

    return entry;
}

module.exports = {
    context: __dirname + "/public/script",
    entry: getEntry(),
    output: {
        path: __dirname + '/public/build',
        filename: '[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
        })
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {compact: false}},
            {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: {compact: false}}
        ]
    }
};