module.exports = function (grunt) {
    // set the config once before calling load-grunt-config
    // and once durring so that we have access to it via
    // grunt.config.get() within the config files
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    root: __dirname,
    static: __dirname + '/public', // source directoty for static file
    app: __dirname + '/public/app', // source directory for the app
    configFile: __dirname + '/config/config',
    bowerComponentsDir: __dirname + '/public/bower_components',

    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.company %>;' +
      ' Licensed <%= pkg.license %> */\n'
    },
    hintFiles: [
      'Gruntfile.js',
      '<%= root %>/bin/www',
      '<%= root %>/app.js',
      '<%= root %>/routes/**/*.js',
      '<%= app %>/**/*.js'
    ],
    lessFiles: [
      '<%= static %>/less/**/*.less'
    ],
    serverFiles: [
      '<%= root %>/bin/www',
      '<%= root %>/app.js',
      '<%= root %>/routes/**/*.js'
    ],
    appFiles: [
      '<%= app %>/app.config.js',
      '<%= app %>/app.js',
      '<%= app %>/**/module.js',
      '<%= app %>/**/!(module)*.js'
    ],
    vendorFiles: [
      '<%= static %>/bower_components/jquery/dist/jquery.min.js',
      '<%= static %>/bower_components/bootstrap/dist/js/bootstrap.min.js',
      '<%= static %>/bower_components/angular/angular.min.js',
      '<%= static %>/bower_components/angular-cookies/angular-cookies.min.js',
      '<%= static %>/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      '<%= static %>/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      '<%= static %>/bower_components/metisMenu/dist/metisMenu.min.js',
    ],
    less: {
      dev: {
        files: {
          '<%= static %>/styles/style.css': '<%= static %>/styles/less/style.less'
        }
      }
    },
    jshint: {
      source: {
        files: {
          src: '<%= hintFiles %>'
        }
      },
      options: {
        jshintrc: true
      }
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },

      // just lint the source dir
      source: {
        src: '<%= hintFiles %>'
      },

      // fix any linting errors that can be fixed
      fixup: {
        src: '<%= hintFiles %>',
        options: {
          fix: true
        }
      }
    },
    concat: {
      options: {
        separator: '\n;\n',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      app: {
        src: '<%= appFiles %>',
        dest: '<%= static %>/build/app.js'
      },
      vendor: {
        src: '<%= vendorFiles %>',
        dest: '<%= static %>/build/vendor.js'
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      app: {
        files: {
          '<%= static %>/build/app.annotate.js': ['<%= static %>/build/app.js']
        }
      }
    },
    ngtemplates: {
      app: {
        options: {
          prefix: '/',
          append: true
        },
        cwd: 'public',
        src: 'app/**/*.html',
        dest: 'public/build/app.annotate.js'
      }
    },
    uglify: {
      app: {
        files: {
          '<%= static %>/build/app.min.js': ['<%= static %>/build/app.annotate.js']
        }
      },
      vendor: {
        files: {
          '<%= static %>/build/vendor.min.js': ['<%= static %>/build/vendor.js']
        }
      }
    },
    watch: {
      staticSide: {
        files: [
          '<%= root %>/.rebooted',
          '<%= root %>/views/*',
          '<%= static %>/**/*'
        ],
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'bin/www',
        options: {
          args: ['dev'],
          nodeArgs: ['--debug'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function () {
                require('open')('http://localhost:3000', 'chrome');
              }, 1000);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              // Delay before server listens on port
              setTimeout(function () {
                require('fs').writeFileSync('./.rebooted', 'rebooted at ' + require('moment')().format('YYYY-MM-DD, HH:mm:ss'));
              }, 1000);
            });
          },
          env: {
            PORT: '3000'
          },
          cwd: '<%= root %>',
          watch: '<%= serverFiles %>',
          //ignore: ['data/*'],
          ext: 'js, yml, json',
          delay: 1000,
          legacyWatch: true
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
    });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-ng-annotate');


  grunt.registerTask('hint', ['jshint:source', 'jscs:source']);
  grunt.registerTask('dev', ['concurrent', 'watch']);
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('build', ['less', 'concat', 'ngAnnotate:app', 'ngtemplates', 'uglify:app']);
};
