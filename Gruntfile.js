'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        src: 'src',
        dev: '.tmp',
        build: 'build'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            compass: {
                files: ['<%= yeoman.src %>/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.src %>/*.html',
                    '<%= yeoman.dev %>/css/{,*/}*.css',
                    '{<%= yeoman.dev %>, <%= yeoman.src %>}/js/{,/*/}*.js',
                    '<%= yeoman.src %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, yeomanConfig.dev),
                            mountFolder(connect, yeomanConfig.src)
                        ];
                    }
                }
            },
            build: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.build)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            build: ['<%= yeoman.dev %>', '<%= yeoman.build %>'],
            server: '<%= yeoman.dev %>'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '<%= yeoman.src %>/js/{,*/}*.js',
                '!<%= yeoman.src %>/js/vendor/*',   /* ! = exclude */
                '!<%= yeoman.src %>/js/libs/*',
                '!<%= yeoman.src %>/js/plugins/*'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                basePath: '<%= yeoman.src %>',
                cssDir: '../<%= yeoman.dev %>/css',
                sassDir: 'sass',
                imagesDir: 'img',
                javascriptsDir: 'js',
                relativeAssets: false,
                force: true
            },
            build: {
              options: {
                environment: 'production',
                outputStyle: 'compressed',
                noLineComments: true
              }
            },
            server: {
                options: {
                    environment: 'development',
                    outputStyle: 'expanded',
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        requirejs: {
            build: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    mainConfigFile: '<%= yeoman.src %>/js/require.config.js',
                    baseUrl: '<%= yeoman.src %>/js',
                    optimize: 'none', // we will uglify later
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.src %>/index.html',
            options: {
                dest: '<%= yeoman.build %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.build %>/{,*/}*.html'],
            css: ['<%= yeoman.build %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.build %>']
            }
        },
        imagemin: {
            build: {
              options: {
                progressive: true
              },
              files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.build %>/img'
                }]
            }
        },
        cssmin: {
            build: {
                files: {
                    '<%= yeoman.build %>/css/style.css': [ '<%= yeoman.dev %>/css/style.css' ]
                }
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.build %>',
                    src: '*.html',
                    dest: '<%= yeoman.build %>'
                }]
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.build %>',
                    src: [
                        '*.txt',
                        '.htaccess',
                        'img/{,*/}*.{webp,gif,ico}',
                        '*.html'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.src %>/js/main.js'
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        'clean:server',
        'compass:server',
        'livereload-start',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'compass:build',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
