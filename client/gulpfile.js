// Gulp.js configuration
'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var bytediff = require('gulp-bytediff');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync').create();
var beautify = require('gulp-jsbeautify');
var htmlbeautify = require('gulp-html-beautify');
var Server = require('karma').Server;
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');

var routes = {
    '/node_modules': 'node_modules'
};

// References to all the vendor and 3rd party JavaScript files are taken from here for injection.
var libs = [
  'node_modules/angular/angular.min.js',
  'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
  'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
  'node_modules/angular-ui-router/release/angular-ui-router.min.js',
  'node_modules/ramda/dist/ramda.min.js',
  'node_modules/q/q.js'
];

// References to all the vendor and 3rd party CSS files are taken from here for injection.
var cssLibs = [
  "node_modules/bootstrap/dist/css/bootstrap.css",
  "node_modules/bootstrap/dist/css/bootstrap-theme.min.css"
];

// Beautification options.
var options = {
  "brace_style": "collapse",
  "break_chained_methods": false,
  "e4x": false,
  "eval_code": false,
  "end-with-newline": true,
  "indent_char": " ",
  "indent_level": 0,
  "indent_size": 2,
  "indent_with_tabs": false,
  "jslint_happy": true,
  "keep_array_indentation": false,
  "keep_function_indentation": false,
  "max_preserve_newlines": 3,
  "preserve_newlines": true,
  "space_before_conditional": true,
  "space_in_paren": false,
  "unescape_strings": false,
  "wrap_line_length": 120,
  "wrap-attributes-indent-size": 2,
  "wrap-attributes": "force",
  "preserve-newlines": false
};

var jsFilters;
var libFilter;
var libCssFilter;
var appCssFilter;

gulp.task('dev-set-up', function() {
  jsFilters = ['./src/app/**/*.js', '!./src/app/**/*.test.js'];
  libFilter = gulp.src(libs, {read: false});
  libCssFilter = gulp.src(cssLibs, {read: false});
  appCssFilter = ['./src/assets/css/*.css', './src/app/**/*.css'];
});

gulp.task('pro-set-up', function() {
  jsFilters = ['./src/build/app.min.js'];
  libFilter = gulp.src('./src/build/lib.min.js', {read: false});
  libCssFilter = gulp.src('./src/build/lib.min.css', {read: false});
  appCssFilter = ['./src/build/app.min.css'];
});

gulp.task('start-server', function() {
    browserSync.init({
        startPath: '/',
        server: {
            baseDir: "",
            routes: routes,
        }
    });
});

/**
 * It injects all js files into index.html at the palce were the below commented line is placed
 *  <!-- inject:js --> <!-- endinject -->
 */
gulp.task('inject-js', function () {
  var target = gulp.src('./index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(jsFilters, {read: false});
  return target.pipe(inject(sources, {relative: true}))
    .pipe(inject(libFilter, {starttag: '<!-- inject:head:{{ext}} -->'}))
    .pipe(inject(libCssFilter))
    .pipe(inject(gulp.src(appCssFilter, {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    .pipe(gulp.dest('./'));
});

gulp.task('prod', function() {
  return gulp.src(['./src/app/**/*.js', '!./src/app/**/*.test.js'])
    .pipe(plumber())
    .pipe(ngAnnotate({add: true}))
    .pipe(concat('app.js', {newLine: ';'}))
    .pipe(bytediff.start())
    .pipe(uglify({mangle: true}))
    .pipe(bytediff.stop())
    .pipe(rename('app.min.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('src/build'));
});

gulp.task('format-lib', ['copyfonts', 'format-lib-css', 'format-app-css'], function() {
  return gulp.src(libs)
    .pipe(plumber())
    .pipe(concat('lib.js', {newLine: '\n'}))
    .pipe(rename('lib.min.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('src/build'));
});

gulp.task('format-lib-css', function() {
  return gulp.src(cssLibs, {base: './src/assets/fonts/'})
    .pipe(plumber())
    .pipe(concatCss('lib.css'))
    .pipe(bytediff.start())
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(bytediff.stop())
    .pipe(rename('lib.min.css'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('src/build'));
});

gulp.task('format-app-css', function() {
  return gulp.src(['./src/assets/css/*.css', './src/app/**/*.css'], {base: './src/assets/fonts/'})
    .pipe(plumber())
    .pipe(concatCss('app.css'))
    .pipe(bytediff.start())
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(bytediff.stop())
    .pipe(rename('app.min.css'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('src/build'));
});

gulp.task('copyfonts', function() {
   gulp.src('./src/assets/fonts/*.{ttf,woff,eof,svg,woff2}')
   .pipe(gulp.dest('src/build'));
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

/**
 * Beautify HTML
 */
gulp.task('htmlbeautify', function() {
  gulp.src('./src/app/**/*.html', {base: './'})
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./'))
});

/**
 * Beautify JS
 */
gulp.task('beautify', function() {
  gulp.src('./src/app/**/*.js', {base: './'})
    .pipe(beautify(options))
    .pipe(gulp.dest('./'))
});


/**
 * Gulp build task for production deployment with minified code and starting gulp developmenet server
 */
gulp.task('serve-prod', function(callback) {
  runSequence('format-lib', 'pro-set-up', 'prod', 'inject-js', 'start-server', callback);
});


/**
 * Gulp build task for local deployment and starting gulp developmenet server
 */
gulp.task('serve', ['dev-set-up', 'inject-js', 'start-server']);

/**
 * Gulp build task for production with minified code
 */
gulp.task('build-prod', function(callback) {
  runSequence('format-lib', 'pro-set-up', 'prod', 'inject-js', callback);
});

/**
 * Gulp build task for local deployment
 */
gulp.task('build-local', ['dev-set-up', 'inject-js']);
