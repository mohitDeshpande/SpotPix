/**
 * Created by mohit on 2017-02-23.
 */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin');

// grab our sources and destinations
var jsSources = ['src/scripts/*.js'],
    jsVendorSources = ['src/scripts/vendor/*.js'],
    sassSources = ['src/styles/header.scss','src/styles/footer.scss','src/styles/body.scss'],
    htmlSources = ['src/*.html'],
    imageSources = ['src/images/*'],
    dataSources = ['src/data/*'],
    outputDir = 'dist';



// task to copy all html content from src to dest
gulp.task('html', function() {
    gutil.log('Copying html ...');
    gulp.src(htmlSources)
        .pipe(htmlmin({collapseWhitespace: true}))
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
        .pipe(cssnano())
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

// task to combine and minify all javascript
gulp.task('js', function() {
    gutil.log('Concatenating and minifying all javascript');
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload());
    gulp.src(jsVendorSources)
        .pipe(uglify().on('error', function (e) {
            console.error(e);
        }))
        .pipe(gulp.dest(outputDir+"/vendor/"))
        .pipe(connect.reload());
});

// task to minify and optimize all the images in the project
gulp.task('images', function () {
    gutil.log('Optimizing images');
    gulp.src(imageSources)
        .pipe(imagemin())
        .pipe(gulp.dest(outputDir + "/images/"))
        .pipe(connect.reload())
});

//TODO minify xml and json
// task to move data sources
gulp.task('assets', function() {
    gutil.log('Optimizing data and assets');
    gulp.src(dataSources)
        .pipe(gulp.dest(outputDir+"/data/"))
        .pipe(connect.reload())
});


// task to run the server
gulp.task('connect', function() {
    gutil.log('Connecting to server');
    connect.server({
        root: 'dist/',
        port: process.env.PORT || 5000, // localhost:5000
        livereload: true
    })
});

// task to watch for any changes in the source files
gulp.task('watch', function() {
    gutil.log('Monitoring Changes ...');
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(imageSources, ['images']);
    gulp.watch(dataSources, ['assets']);
});

// task to do all the processing, create a server and keep a watch
gulp.task('default', ['html', 'js', 'sass','images', 'assets','connect', 'watch']);
