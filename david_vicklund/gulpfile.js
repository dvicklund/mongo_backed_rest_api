var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var fileList = ['lib/*.js', 'public/*.js', 'app/*.js'];

gulp.task('mocha:test', function() {
  return gulp.src('test/**/*.js')
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

gulp.task('jshint:app', function() {
  return gulp.src(fileList)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

// Move static files to build
gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

// Move meat and bones to build
gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('test:dev', ['jshint:test', 'jshint:app', 'mocha:test']);
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['test:dev', 'build:dev']);

gulp.doneCallback = function(err) {
  process.exit(err ? 1 : 0);
};