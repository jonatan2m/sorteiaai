module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/app.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    concat_css:{
      options: {
        // Task-specific options go here.
      },
      all: {
        src: [
          "node_modules/bootstrap/dist/css/bootstrap.min.css",                                        
          "css/style.css",
          ],
        dest: "dist/styles.css"
      },
    },
    cssmin: {
      target: {
          files: {          
          'dist/styles.min.css' : ['dist/styles.css']          
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls:[
          'test/index.html'
          ]
        }
      }
    },
    /* connect: {
        server: {
            options: {                
                base: '.'
            }
        }
    },*/
    jshint: {
      files: [
        'Gruntfile.js',
        'js/app.js'        
        ],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
     notify_hooks: {
      options: {
      enabled: true,
      max_js_hint_notifications: 5,
      title: 'Cookiejar'
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'test/**/*.html'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // This plugin provides the "connect" task.
  //grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'concat_css', 'cssmin', 'uglify']);

};