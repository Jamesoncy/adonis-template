/**
 * Default task.
 * Cleaning dest folder before building
 **/
"use Strict";

var gulp = require("gulp");

var config = require("../config");

gulp.task("default", ["clean", "styles"], function () {

  gulp.start("serve");
});
