module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      release: {
        src: ['release/*.js', 'release/*.css']
      }
    },

    less: {
      release: {
        files: {
          'release/angular-filter-panel.css': 'src/filter-directive.less'
        }
      }
    },

    concat: {
      release: {
        src: [
          'AUTHOR', 
          'src/js.extensions.js',
          'src/module.js',
          'src/filter-panel-directive.js',
          'src/filter-directive.js'
        ],
        dest: 'release/angular-filter-panel.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('build', [
    'clean',
    'concat',
    'less'
  ]);

  grunt.registerTask('default', ['build']);

};