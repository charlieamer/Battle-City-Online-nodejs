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
    watch: {
      typescript: {
        files: ['src/**/*.ts', 'tsconfig.json', 'static/**'],
        tasks: ['default'],
        options: {
          interrupt: true,
          atBegin: true,
          spawn: true
        }
      }
    },
    typescript_project: {
      browser: {
        files: {
          'dist': ['src/platforms/browser/**/*.ts', 'src/engine/**/*.ts', 'src/game/**/*.ts']
        },
        options: {
          tsconfig: true
        }
      }
    },
    clean: ['dist/**'],
    copy: {
      static: {
        expand: true,
        src: ['**'],
        cwd: 'static',
        dest: 'dist'
      },
      modules: {
        expand: true,
        src: ['redux/dist/redux.js', 'clone/clone.js', 'mathjs/dist/math.js'],
        cwd: 'node_modules',
        dest: 'dist',
        flatten: true
      },
      sources: {
        expand: true,
        src: ['src/**'],
        dest: 'dist'
      }
    },
    connect: {
      static: {
        options: {
          port: 8080,
          base: 'dist',
          keepalive: true,
          debug: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-typescript-project');

  // Default task.
  grunt.registerTask('default', ['clean', 'typescript_project', 'copy']);
  grunt.registerTask('serve', ['default', 'watch:engine']);
  
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};
