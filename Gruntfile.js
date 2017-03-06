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
        files: ['src/**/*.ts'],
        tasks: ['default', 'connect'],
        options: {
          interrupt: true,
          atBegin: true,
          spawn: true
        }
      }
    },
    typescript_project: {
      engine: {
        files: {
          'dist/engine.js': ['src/engine/**/*.ts'],
          'dist/platform-browser.js': ['src/platforms/browser/**/*.ts']
        },
        options: Object.assign(JSON.parse(fs.readFileSync("tsconfig.json")), {
          include: ["typings/**/*.d.ts"]
        })
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
      static: {
        root: './dist/',
        port: 8080,
        host: '0.0.0.0'
      }
    },
    connect: {
      static: {
        options: {
          port: 8080,
          base: 'dist'
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
