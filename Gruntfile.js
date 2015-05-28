'use strict';
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
            entry[path.dirname(file) + '/' + path.basename(file, '.js')] = './' + file;
        }
    });

    return entry;
}

function createAssets(stats) {
    var assetsByChunkName = stats.toJson().assetsByChunkName;
    var assets = {};
    Object.keys(assetsByChunkName).forEach(function (key) {
        var value = assetsByChunkName[key];
        key = key.replace(/\.\[chunkhash\]\.js/ig, '');
        assets['script/' + key] = 'script/' + value;
    });
    require("fs").writeFileSync(
        path.join(__dirname, "assets.json"),
        JSON.stringify(assets));
}

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                src: 'dist'
            },
            build: {
                src: ['.build', '.sass-cache']
            }
        },
        webpack: {
            dist: {
                context: __dirname + "/public/script",
                entry: getEntry(),
                output: {
                    path: __dirname + '/dist/script',
                    filename: '[name].[chunkhash].js'
                },
                plugins: [
                    new webpack.optimize.CommonsChunkPlugin({
                        name: "commons",
                        filename: "commons.[chunkhash].js"
                    }),
                    new webpack.optimize.UglifyJsPlugin({minimize: true}),
                    new webpack.DefinePlugin({
                        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
                        __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
                    }),
                    new webpack.optimize.LimitChunkCountPlugin({
                        chunkOverhead: 10000000
                    }),
                    function () {
                        this.plugin("done", function (stats) {
                            createAssets(stats);
                        });
                    }
                ],
                module: {
                    loaders: [
                        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
                    ]
                }
            },
            development: {
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
                        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {compact: false}}
                    ]
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'public/prototype/sass/pages',
                    cssDir: 'public/css',
                    outputStyle: 'compressed',
                    noLineComments: true
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'public',
                        src: ['image/**', 'fonts/**'],
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        cwd: 'public',
                        src: ['*'],
                        filter: 'isFile',
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        cwd: 'public',
                        src: ['css/**/*.css', '!css/vendor/**/*.css'],
                        filter: 'isFile',
                        dest: '.build'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            files: {
                expand: true,
                cwd: 'public',
                src: ['css/vendor/framework.css'],
                dest: '.build'
            }
        },
        hash: {
            dist: {
                options: {
                    assets: 'assets.json'
                },
                files: [
                    {
                        expand: true,
                        cwd: '.build/css',
                        src: ['**/*.css'],
                        dest: 'dist/css'
                    }
                ]
            }
        },
        watch: {
            webpack: {
                files: ['public/script/**/*.js']
            },
            sass: {
                files: ['public/prototype/**/*.scss'],
                tasks: ['compass']
            }
        }
    });

    grunt.event.on('watch', function (action, filepath, target) {

        var pathnames = filepath.split('\\');

        var entry = {};
        var basename = path.basename(filepath, '.js');
        var key = pathnames[2] + '/' + basename;
        entry[key] = './public/script/' + key;
        webpack({
            entry: entry,
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
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {compact: false}}
                ]
            }
        }, function (err, stats) {
            if (err)throw err;
            console.log(key + ' compiled success!');
        });
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['clean', 'cssmin', 'compass', 'copy', 'webpack:dist', 'hash', 'clean:build']);

};
