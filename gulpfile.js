const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const imagemin = require ('gulp-imagemin');
const { series } = require('gulp');

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
    .pipe(gulp.dest('./js'));
};

function minifyCss(){
  return gulp.src('css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/css'));
}

function minifyHtml(){
  return gulp.src('/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
}

function minifyJs(){
  return gulp.src('js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
}

function minifyImg(){
  return gulp.src('img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
}

exports.build = series(buildStyles, copy, minifyCss, minifyHtml, minifyJs, minifyImg);

exports.compilaSass = buildStyles;
exports.watchSass = watchSass;
exports.copyJs = copy;