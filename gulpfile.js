/*jshint camelcase: false */
'use strict';

//=============================================
//               DEPENDENCIES
//=============================================

/**
 * Load required dependencies.
 */
var gulp            = require('gulp');
var jshint          = require('gulp-jshint');
var htmlhint        = require('gulp-htmlhint');
var browserSync     = require('browser-sync');
var httpProxy       = require('http-proxy');
var modRewrite      = require('connect-modrewrite');

//=============================================
//            UTILS FUNCTIONS
//=============================================

var proxyTarget = 'http://localhost:8000/';
var proxyApiPrefix = 'api';
var proxy = httpProxy.createProxyServer({
    target: proxyTarget
});

var proxyMiddleware = function(req, res, next) {
    if (req.url.indexOf(proxyApiPrefix) !== -1) {
        proxy.web(req, res);
    } else {
        next();
    }
};

function startBrowserSync(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    files = files === undefined ? 'default' : files;

    browserSync({
        files: files,
        port: 8000,
        notify: false,
        server: {
            baseDir: baseDir,
            middleware: [
                proxyMiddleware,
                modRewrite(['!\\.\\w+$ /index.html [L]']) // require for HTML5 mode
            ]
        },
        browser: browser
    });
}

//=============================================
//            DECLARE PATHS
//=============================================

var paths = {
    /**
     * The 'gulpfile' file is where our run tasks are hold.
     */
    gulpfile:   'gulpfile.js',
    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks.
     *
     * - 'styles'       contains all project css styles
     * - 'images'       contains all project images
     * - 'fonts'        contains all project fonts
     * - 'scripts'      contains all project javascript except config-env.js and unit test files
     * - 'html'         contains main html files
     * - 'templates'    contains all project html templates
     * - 'config'       contains Angular app config files
     */
    app: {
        basePath:       'src/',
        fonts:          ['src/fonts/**/*.{eot,svg,ttf,woff}', 'jspm_packages/**/*.{eot,svg,ttf,woff}'],
        styles:         'src/styles/**/*.scss',
        images:         'src/images/**/*.{png,gif,jpg,jpeg}',
        config: {
            dev:        'src/app/core/config/core.config.dev.js',
            test:       'src/app/core/config/core.config.test.js',
            prod:       'src/app/core/config/core.config.prod.js'
        },
        scripts:        ['src/app/**/*.js',
            '!src/app/**/*.spec.js'
        ],
        html:           'src/index.html',
        templates:      'src/app/**/*.html'
    },
    /**
     * This is a collection of file patterns that refer to our app unit and e2e tests code.
     *
     * 'config'       contains karma and protractor config files
     * 'testReports'  contains unit and e2e test reports
     * 'unit'         contains all project unit test code
     * 'e2e'          contains all project e2e test code
     */
    test: {
        basePath:       'test/',
        config: {
            karma:      'test/config/karma.conf.js',
            protractor: 'test/config/protractor.conf.js'
        },
        testReports: {
            coverage:   'test/test-reports/coverage/'
        },
        platoReports:   'test/plato',
        mock:           'src/app/**/*.mock.js',
        unit:           'src/app/**/*.spec.js',
        e2e:            'test/e2e/**/*.e2e.js'
    },
    /**
     * The 'tmp' folder is where our html templates are compiled to JavaScript during
     * the build process and then they are concatenating with all other js files and
     * copy to 'dist' folder.
     */
    tmp: {
        basePath:       '.tmp/',
        styles:         '.tmp/styles/',
        scripts:        '.tmp/scripts/'
    },
    /**
     * The 'build' folder is where our app resides once it's
     * completely built.
     *
     * - 'dist'         application distribution source code
     * - 'docs'         application documentation
     */
    build: {
        basePath:       'build/',
        dist: {
            basePath:   'build/dist/',
            fonts:      'build/dist/fonts/',
            images:     'build/dist/images/',
            styles:     'build/dist/styles/',
            scripts:    'build/dist/scripts/'
        },
        docs:           'build/docs/'
    }
};

//=============================================
//               SUB TASKS
//=============================================

/**
 * The 'jshint' task defines the rules of our hinter as well as which files
 * we should check. It helps to detect errors and potential problems in our
 * JavaScript code.
 */
gulp.task('jshint', function() {
    return gulp.src(paths.app.scripts.concat(paths.gulpfile))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

/**
 * The 'htmlhint' task defines the rules of our hinter as well as which files we
 * should check. It helps to detect errors and potential problems in our
 * HTML code.
 */
gulp.task('htmlhint', function () {
    return gulp.src([paths.app.html, paths.app.templates])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failReporter());
});

/**
 * The 'watch' task set up the checks to see if any of the files listed below
 * change, and then to execute the listed tasks when they do.
 */
gulp.task('watch', function () {
    // Watch js files
    gulp.watch([paths.app.scripts, paths.gulpfile], ['jshint', browserSync.reload]);

    // Watch html files
    gulp.watch([paths.app.html, paths.app.templates], ['htmlhint', browserSync.reload]);
});

//=============================================
//                MAIN TASKS
//=============================================

//---------------------------------------------
//              DEVELOPMENT TASKS
//---------------------------------------------

/**
 * The 'serve' task serve the dev environment.
 */
gulp.task('serve', ['watch'], function() {
    startBrowserSync(['.tmp', 'src', 'jspm_packages', './' ]);
});

gulp.task('default', ['serve']);

