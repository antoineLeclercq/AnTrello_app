module.exports = function (grunt) {
  grunt.initConfig({
    bower_concat: {
      all: {
        dest: 'public/javascripts/vendor/all.js',
        dependencies: {
          'underscore': 'jquery',
          'backbone': 'underscore',
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/javascripts/vendor/all.js': ['public/javascripts/vendor/all.js'],
        }
      }
    },
    handlebars: {
      all: {
        files: {
          'public/javascripts/handlebars_templates.js': ['handlebars_templates/*.hbs']
        },
        options: {
          processContent: function(content) {
            content = content.replace(/^[\x20\t]+/mg, '').replace(/[\x20\t]+$/mg, '');
            content = content.replace(/^[\r\n]+/, '').replace(/[\r\n]*$/, '\n');
            return content;
          },
          processName: function (filePath) {
            return filePath.match(/\/(.+).hbs$/).pop();
          },
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['bower_concat', 'uglify', 'handlebars']);
};