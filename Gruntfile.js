/*
 * grunt-stylenguard
 * https://github.com/avrelian/Stylenguard
 *
 * Copyright (c) 2013 Sergey Radchenko
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'specs/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      specs: ['specs/tmp']
    },

    // Configuration to be run (and then tested).
    stylenguard: {
      process: {
        options: {
          // selector for the root element of a block
          rootSelector: '.block'
        },
        files: [{
          expand: true,
          cwd: 'specs/fixtures/',
          src: ['**/*.css'],
          dest: 'specs/tmp/',
          ext: '.css'
        }]
      }
    },

    // Unit tests.
    jasmine_node: {
      sdfdsf: {
        specNameMatcher: "./spec", // load only specs containing specNameMatcher
        projectRoot: ".",
        requirejs: true,
        forceExit: true,
        jUnit: {
          report: false,
          savePath : "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'stylenguard', 'jasmine_node']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
