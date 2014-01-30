var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    //imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

//$ gulp styles
gulp.task('styles', function() {
  return gulp.src('src/css/main.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Styles task complete' }));
});

//$ gulp scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Scripts task complete' }));
});

//$ gulp lint
gulp.task('lint', function(){
    return gulp.src('src/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// gulp.task('images', function() {
//   return gulp.src('src/images/**/*')
//     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
//     .pipe(gulp.dest('dist/assets/img'))
//     .pipe(livereload(server))
//     .pipe(notify({ message: 'Images task complete' }));
// });

//$ gulp clean
gulp.task('clean', function() {
  return gulp.src(['dist/css/*', 'dist/js/*', 'dist/img/*', 'dist/doc/*'], {read: false})
    .pipe(clean());
});

//$ gulp
gulp.task('default', ['clean'], function() {
    //gulp.start('styles', 'scripts', 'images');
    gulp.start('styles', 'scripts');
});


// Watch
gulp.task('watch', function() {

  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/images/**/*', ['images']);

  });

});
