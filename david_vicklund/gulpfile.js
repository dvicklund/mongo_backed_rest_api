var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var fileList = ['lib/*.js', 'public/*.js', 'app/*.js'];

gulp.task('mocha:test', function() {
  return gulp.src('test/test.js')
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('jshint:test', function() {
  return gulp.src(['./*.js', './package.json', 'app/**/*.js'])
  .pipe(jshint({
    node: true,
    globals: {
      describe: true,
      it: true,
      before: true,
      after: true
    }
  }))
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/client/test_entry.js')
    .pipe(webpack({
      output: { 
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/client/'));
});

// CSS tasks
gulp.task('minify:scss', function() {
  gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css/'));
  return gulp.src('app/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concatCss('styles.min.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('jshint:app', function() {
  return gulp.src(fileList)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

// Move static files to build
gulp.task('static:app', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

// Move meat and bones to build
gulp.task('webpack:app', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

// Who watches the watch-tasks?
gulp.task('watch:scss', function() {
  gulp.watch('app/scss/**/*.scss', ['minify:scss']);
});

gulp.task('watch:css', function() {
  return gulp.src('app/css/**/*.css')
    .pipe(watch('app/css/**/*.css'))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch:html', function() {
  return gulp.src(['app/*.html', 'app/html/*.html'])
    .pipe(watch(['app/*.html', 'app/html/*.html']))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch:js', function() {
  return gulp.src(['app/js/**/*.js'])
    .pipe(watch('app/js/**/*.js'))
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch:all', ['watch:scss', 'watch:html', 'watch:js']);
gulp.task('test:dev', ['jshint:test', 'jshint:app', 'mocha:test']);
gulp.task('build:app', ['webpack:app', 'static:app', 'minify:scss']);
gulp.task('default', ['test:dev', 'build:app']);

gulp.doneCallback = function(err) {
  process.exit(err ? 1 : 0);
};