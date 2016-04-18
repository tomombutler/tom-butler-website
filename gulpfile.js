var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

/**
 * Compiles Saas to CSS
 */
gulp.task('css', function() {

    //  App CSS
    gulp.src(['assets/sass/**/*.scss', '!assets/sass/admin.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/css/'));

    //  Admin CSS
    gulp.src('assets/sass/admin.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('admin.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./assets/css/'));
});

/**
 * Compiles all the JS
 */
gulp.task('js', function() {

    gulp.src([
            'assets/bower_components/jquery/dist/jquery.min.js',
            'assets/bower_components/typed.js/dist/typed.min.js',
            'assets/bower_components/simple-text-rotator/jquery.simple-text-rotator.min.js',
            'assets/js/app.js',
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.', {includeContent: false}))
        .pipe(gulp.dest('./assets/js/'));
});

/**
 * Watches for changes in JS or Sass files and executes other tasks
 */
gulp.task('default', function() {
    gulp.watch('assets/sass/**/*.scss',['css']);
    gulp.watch('assets/js/**/*.js',['js']);
});

/**
 * Builds both CSS and JS
 */
gulp.task('build', function() {
    runSequence(['css', 'js']);
});
