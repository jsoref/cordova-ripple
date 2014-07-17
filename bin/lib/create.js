#!/usr/bin/env node

/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
var shell = require('shelljs'),
    child_process = require('child_process'),
    Q     = require('q'),
    path  = require('path'),
    fs    = require('fs'),
    check_reqs = require('./check_reqs'),
    ROOT    = path.join(__dirname, '..', '..');

    console.log('lib/create.js');

// Returns a promise.
function exec(command, opt_cwd) {
    var d = Q.defer();
    console.log('Running: ' + command);
    child_process.exec(command, { cwd: opt_cwd }, function(err, stdout, stderr) {
        stdout && console.log(stdout);
        stderr && console.error(stderr);
        if (err) d.reject(err);
        else d.resolve(stdout);
    });
    return d.promise;
}

function setShellFatal(value, func) {
    var oldVal = shell.config.fatal;
    shell.config.fatal = value;
    func();
    shell.config.fatal = oldVal;
}

/**
 * $ create [options]
 * Creates an android application with the given options.
 * Options:
 *   - `project_path` {String}         Path to the new Cordova android project.
 *   - `package_name` {String}         Package name, following reverse-domain style convention.
 *   - `project_name` {String}         Project name.
 *   - 'project_template_dir' {String} Path to project template (override).
 * Returns a promise.
 */
exports.createProject = function(project_path, package_name, project_name, project_template_dir, use_shared_project, use_cli_template) {
    var VERSION = fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf-8').trim();

    console.log('createProject');

    // Set default values for path, package and name
    project_path = typeof project_path !== 'undefined' ? project_path : "RippleProject";
    project_path = path.relative(process.cwd(), project_path);
    package_name = typeof package_name !== 'undefined' ? package_name : 'my.cordova.ripple.project';
    project_name = typeof project_name !== 'undefined' ? project_name : 'RippleExample';
    project_template_dir = typeof project_template_dir !== 'undefined' ?
                           project_template_dir :
                           path.join(ROOT, 'template');

    // Check if project already exists
    if(fs.existsSync(project_path)) {
        return Q.reject('Project already exists! Delete and recreate');
    }

    return check_reqs.run()
    .then(function() {
        // Log the given values for the project
        console.log('Creating Cordova project for the Ripple platform:');
        console.log('\tPath: ' + project_path);
        console.log('\tPackage: ' + package_name);
        console.log('\tName: ' + project_name);

        console.log('Copying template files...');

        setShellFatal(true, function() {
            // copy project template
            shell.cp('-r', path.join(project_template_dir, 'ripple'), project_path);
            // copy scripts.js
            shell.cp('-r', path.join(project_template_dir, 'cordova'), project_path);
            // copy cordova.js
            shell.cp('-r', path.join(ROOT, 'cordova.js'), project_path);
            // TODO - investigate the right way
            fs.chmodSync(path.join(project_path, 'cordova/run'), '755');
            fs.chmodSync(path.join(project_path, 'cordova/build'), '755');
            fs.chmodSync(path.join(project_path, 'cordova/log'), '755');
            fs.chmodSync(path.join(project_path, 'cordova/clean'), '755');
        });
    }).then(function() {
        console.log('Project successfully created.');
    });
};
