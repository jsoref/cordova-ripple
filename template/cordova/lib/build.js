#!/usr/bin/env node

var shell = require('shelljs'),
    path = require('path');

module.exports = function(projectRoot) {
    ["cordova.js", "config.xml"].forEach(function (file) {
        console.log('Copying ' + file + ' to www dir...');
        shell.cp("-f", path.join(projectRoot, file), path.join(projectRoot, 'www'));
    });
};

module.exports.help = function(args) {
    console.log('Usage: ' + path.relative(process.cwd(), args[1]) + ' [options]');
    console.log('Build options :');
    console.log('    --debug : Builds project in debug mode');
    console.log('    --release : Builds project in release mode');
    console.log('    --nobuild : Runs the currently built project without recompiling');
    console.log('Deploy options :');
    console.log('    --device : Will deploy the built project to a device');
    console.log('    --emulator : Will deploy the built project to an emulator if one exists');
    console.log('    --target=<target_id> : Installs to the target with the specified id.');
    process.exit(0);
};
