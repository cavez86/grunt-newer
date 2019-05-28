/**
 * @param {Object} grunt Grunt.
 */
module.exports = function (grunt) {

  var gruntfileSrc = 'gruntfile.js';
  var tasksSrc = ['tasks/**/*.js', 'lib/**/*.js'];
  var testSrc = 'test/**/*.spec.js';
  var fixturesJs = 'test/integration/fixtures/**/*.js';
  var fixturesAll = 'test/integration/fixtures/**/*';

  grunt.initConfig({

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      all: {
        src: testSrc
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: gruntfileSrc
      },
      tasks: {
        src: tasksSrc
      },
      tests: {
        src: testSrc
      },
      fixturesJs: {
        src: fixturesJs
      }
    },

    watch: {
      tasks: {
        files: tasksSrc,
        tasks: ['mochaTest']
      },
      tests: {
        files: testSrc,
        tasks: ['newer:mochaTest']
      },
      fixturesAll: {
        files: fixturesAll,
        tasks: ['mochaTest']
      },
      allJs: {
        files: [gruntfileSrc, tasksSrc, testSrc, fixturesJs],
        tasks: ['newer:jshint']
      }
    }

  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['newer:jshint', 'mochaTest']);

  grunt.registerTask('default', 'test');

};
