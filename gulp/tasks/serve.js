'use strict'

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var open = require('open');
var config = require("../config").serve;

gulp.task('serve', function () {

  //gulp.watch(config.src + '/app/views/**/*.html', ['html']);
  gulp.watch('./app/Assets/Less/**/*', ['styles']);
  gulp.watch('./resources/**/*.html', ['reload']);

  livereload.listen();

  open('http://localhost:3333');

  nodemon({
    script: 'server.js',
    ignore: ['node_modules/**'],
    ext: 'js',
    stdout: false,
    nodeArgs: ['--harmony_proxies'],
    delay: 1000
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('reload', function() {
  livereload.changed(__dirname);
});
