var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var path = require('path');

// App CSS
gulp.task('css:app', function() {

    gulp
        .src(['assets/sass/main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/build/css/'))
        .on('error', function (err) {
            console.log('Error compiling CSS: ', err);
        })
        .pipe(notify({
            title: 'Successfully compiled CSS',
            message: 'All .scss files were successfully compiled into CSS',
            sound: false,
            icon: false,
            onLast: true
        }));
});

//  Admin CSS
gulp.task('css:admin', function() {

    gulp
        .src(['assets/sass/admin.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('admin.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/build/css/'))
        .on('error', function (err) {
            console.log('Error compiling CSS: ', err);
        })
        .pipe(notify({
          title: 'Successfully compiled CSS',
          message: 'All .scss files were successfully compiled into CSS',
          sound: false,
          icon: false,
          onLast: true
        }));
});

// --------------------------------------------------------------------------

//  App JS
gulp.task('js:app', function() {
    gulp
        .src([
            'assets/bower_components/jquery/dist/jquery.min.js',
            'assets/bower_components/sticky-kit/jquery.sticky-kit.min.js',
            'assets/js/app.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.', {includeContent: false}))
        .pipe(gulp.dest('./assets/build/js/'))
        .on('error', notify.onError({
            message: 'Error compiling JS',
            title: '<%= error.message %>',
            sound: 'Funk',
            contentImage: path.join(__dirname, 'vendor/nailsapp/module-asset/assets/img/nails/icon/icon@2x.png'),
            icon: false,
            onLast: true
        }))
        .on('error', function (err) {
            console.log('Error compiling JS: ', err);
        })
        .pipe(notify({
            title: 'Successfully compiled JS',
            message: 'All .js files were successfully minified and sourcemaps generated',
            sound: false,
            contentImage: path.join(__dirname, 'vendor/nailsapp/module-asset/assets/img/nails/icon/icon@2x.png'),
            icon: false,
            onLast: true
        }));
});

//  Admin JS
gulp.task('js:admin', function() {

    gulp
        .src(['assets/js/admin.*.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.', {includeContent: false}))
        .pipe(gulp.dest('./assets/build/js/'))
        .on('error', notify.onError({
            message: 'Error compiling JS',
            title: '<%= error.message %>',
            sound: 'Funk',
            contentImage: path.join(__dirname, 'vendor/nailsapp/module-asset/assets/img/nails/icon/icon@2x.png'),
            icon: false,
            onLast: true
        }))
        .on('error', function (err) {
            console.log('Error compiling JS: ', err);
        })
        .pipe(notify({
            title: 'Successfully compiled JS',
            message: 'All .js files were successfully minified and sourcemaps generated',
            sound: false,
            contentImage: path.join(__dirname, 'vendor/nailsapp/module-asset/assets/img/nails/icon/icon@2x.png'),
            icon: false,
            onLast: true
        }));
});

// --------------------------------------------------------------------------

//  Watches for changes in JS or scss files and executes other tasks
gulp.task('default', function() {
    gulp.watch('assets/sass/**/*.scss',['css:app', 'css:admin']);
    gulp.watch(['assets/js/*.js'],['js:app', 'js:admin']);
});

//  Builds both CSS and JS
gulp.task('build', function() {
    runSequence(['css:app', 'css:admin', 'js:app', 'js:admin']);
});
