/*global module:false*/

var fs = require('fs');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['clean', 'typescript', 'copy', 'http-server']
      }
    },
    typescript: {
      engine: {
        src: ['src/engine/**/*.ts'],
        dest: 'dist',
        options: {
          references: ['typings/index.d.ts'],
          module: "commonjs",
          target: "es5",
          noImplicitAny: false,
          noResolve: false
        }
      }
    },
    typescript_project: {
      engine: {
        files: {
          'dist/engine.js': ['src/engine/**/*.ts']
        },
        options: {
          tsconfig: true
        }
      }
    },
    clean: ['dist'],
    copy: {
      static: {
        expand: true,
        src: ['**'],
        cwd: 'static',
        dest: 'dist'
      }
    },
    'http-server': {
      root: 'dist',
      port: 8080
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-typescript-project');

  // Default task.
  grunt.registerTask('default', ['clean', 'typescript_project', 'copy']);

};
