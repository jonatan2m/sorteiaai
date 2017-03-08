module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['node_modules/angular/angular.min.js',
              'node_modules/angular-route/angular-route.min.js',              
              'js/vendor/*.js',
              'js/plugins/*.js',
              'js/main.js',              
              'js/app.js',              
              'js/angular-local-storage.min.js',
              'js/authService.js',
              'js/services/*.js',
              'js/controllers/*.js'
              ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    concat_css:{
      options: {
        // Task-specific options go here.
      },
      all: {
        src: [        
        "css/bootstrap.min.css",
        "css/font-awesome.min.css",
        //"css/owl.carousel.css",
        "css/animate.css",
        "css/main.css",
        "css/social-buttons.css",
        "css/responsive.css",
        "css/custom.css"
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
    jasmine : {
      // Your project's source files
      src : ['node_modules/angular/angular.min.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/angular-mocks/angular-mocks.js',          
      'js/app.js',
      'js/angular-local-storage.min.js',     
      'js/authService.js',   
      'js/services/*.js',
      'js/controllers/*.js'
      ],
      // Your Jasmine spec files
      options: {
        specs : 'specs/*.js'        
      }
    },

    jshint: {
      files: [
      'Gruntfile.js',
      'js/app.js',
      'js/services/*.js',
      'js/controllers/*.js',
      'specs/*.js'        
      ],      
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        reporterOutput: ""
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
      files: ['<%= jshint.files %>', 'js/app.js', 'js/services/*.js', 'js/controllers/*.js', 'specs/*.js'],
      tasks: ['jshint', 'jasmine']
    }
  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.loadNpmTasks('grunt-contrib-jasmine');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-concat-css');
grunt.loadNpmTasks('grunt-contrib-cssmin');
  // This plugin provides the "connect" task.
  //grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('test', ['jshint', 'jasmine']);

  grunt.registerTask('default', ['jshint', 'concat', 'concat_css', 'cssmin', 'uglify']);

};