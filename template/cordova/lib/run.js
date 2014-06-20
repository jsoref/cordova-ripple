#!/usr/bin/env node

var path  = require('path'),
    emulator = require('../../ripple/lib/server/emulate');

/*
 * Runs the application in ripple emulator.
 * Returns a promise.
 */
 module.exports.run = function(args) {
    var projectRoot = path.join(path.dirname(args[1]), '..');
    var wwwRoot = path.join(projectRoot, 'www');
    console.log('Starting Ripple emulator at ' + wwwRoot);
    var app = emulator.start({path: [wwwRoot]});
    var uri = "http://localhost:" + app._port + "?enableripple=cordova-3.0.0";
    require('open')(uri);
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
