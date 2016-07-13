var gulp    = require('gulp');
var scss    = require('gulp-sass');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');

gulp.task('build', function() {
 
  // copy images to build directory
  gulp.src('src/images/*')
    .pipe(gulp.dest('build/images'));

  // minify js
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
 
  // minify scss -> css and concat
  gulp.src('src/scss/**/*.scss') 
    .pipe(scss())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));

  // minify html
  gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true }))
    .pipe(gulp.dest('build'));

  return;
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });
});

gulp.task('serve', ['browserSync', 'scss'], function() {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
