/**
 * Created by yuyangyang on 2014/8/13.
 */
module.exports = function (grunt) {


    var path = require('path');
    var crc32 = require('buffer-crc32');
    var chalk = require('chalk');

    grunt.registerMultiTask('hash', 'hash files.', function () {

        var options = this.options({});
        var assetsJson = grunt.file.readJSON(options.assets);

        this.files.forEach(function (file) {
            var src = file.src.toString(),
                extname = path.extname(src),
                dirnamme = path.dirname(src),
                basename = path.basename(src, extname),
                module = path.relative(file.orig.cwd, dirnamme),
                content = grunt.file.read(src),
                signature = crc32.unsigned(content).toString(16);
            var key = path.join('css', module, basename);
            var value = path.join('css', module, basename + '.' + signature + extname);

            assetsJson[key] = value;
            grunt.log.writeln(chalk.cyan(key) + ': ' + chalk.cyan(value));
            grunt.file.write(path.join(file.orig.dest, module, basename + '.' + signature + extname), content);

        });

        grunt.file.write(options.assets, JSON.stringify(assetsJson).replace(/\\\\|\\/g, '/'));
    });


};