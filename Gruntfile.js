module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      release: {
        src: ['release/*.js', 'release/*.css']
      }
    },

    ngtemplates:  {
      'pchiwan.directives': {
        src: 'src/**.html',
        dest: 'src/templates.js'
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
          'src/templates.js',
          'src/filter-panel-directive.js',
          'src/filter-directive.js'
        ],
        dest: 'release/angular-filter-panel.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('build', [
    'clean',
    'ngtemplates',
    'concat',
    'less'
  ]);

  grunt.registerTask('default', ['build']);

};