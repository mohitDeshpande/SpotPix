/**
 * Created by mohit on 2017-02-23.
 */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

// grab our sources and destinations
var jsSources = ['src/scripts/*.js'],
    sassSources = ['src/styles/*.scss'],
    htmlSources = ['src/*.html'],
    outputDir = 'dist';



// task to copy all html content from src to dest
gulp.task('html', function() {
    gutil.log('Copying html ...');
    gulp.src(htmlSources)
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

// task to compile all Sass
gulp.task('sass', function() {
    gutil.log('Compiling Sass ...');
    gulp.src(sassSources)
        .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

// task to combine and minify all javascript
gulp.task('js', function() {
    gutil.log('Concating and minifying all javascript');
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});


// task to run the server
gulp.task('connect', function() {
    gutil.log('Connecting to server');
    connect.server({
        root: 'dist/index.html',
        livereload: true
    })
});

// task to watch for any changes in the source files
gulp.task('watch', function() {
    gutil.log('Monitoring Changes ...');;;;
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSources, ['html']);
});

// task to do all the processing, create a server and keep a watch
gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);
