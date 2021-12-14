var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
};

function watchSass(){
  gulp.watch('./scss/**/*.scss',buildStyles);
}

function copy() {
  return gulp.src('./node_modules/bootstrap/dist/js/*')
    .pipe(gulp.dest('./dist/js'));
};

exports.compilaSass = buildStyles;
exports.watchSass = watchSass;