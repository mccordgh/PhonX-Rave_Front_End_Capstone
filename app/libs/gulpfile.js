var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require(‘gulp-watch');
var sass = require(‘gulp-sass’);

gulp.task('default', ['lint', 'watch', 'styles']);

gulp.task('watch', function() {
  gulp.watch('./javascripts/**/*.js', ['lint']);
});

gulp.task('styles', function() {
  gulp.src(‘sass/**/*.scss’)
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css/'));
});

gulp.task('lint', function() {
  return gulp.src('./javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
