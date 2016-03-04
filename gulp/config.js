/**
 * Gulp tasks config
 */

"use strict";

var src = "./src";
var dest = "./dist";
var tmp = "./.tmp";

var dest_public = './public'
var dest_css = dest_public + '/css';


var STATIC = "/public";

module.exports = {
  src: src,
  styles: {
    "src": "./app/Assets/Less/**/*" + ".less",
    "dest": dest_css,
    "autoprefixer": {
      "browsers": ['last 2 versions'],
      "cascade": false
    }
  },
  fonts: {
    "src": src + STATIC + "/fonts/**/*",
    "dest": dest + "/views/fonts",
    "tmp": tmp + "/fonts"
  },
  clean: {
    "dest": dest,
    "tmp": tmp
  },
  wiredep: {
    "styles": {
      "src": src + "/app/assets/styles" + ".less",
      "dest": src + "/styles",
      "wiredepStream": {
        "exclude": ["bootstrap/dist"],
        "ignorePath": /^(\.\.\/)+/
      }
    },
    "html": {
      "src": src + "/*.html",
      "dest": src,
      "wiredepStream": {
        "exclude": ['bootstrap.js'],
        "ignorePath": /^(\.\.\/)*\.\./
      }
    }
  },
  lint: {
    "reload": {
      "stream": true,
      "once": true
    },
    "src": src + "/scripts/**/*.js",
    "test": {
      "src": "test/spec/**/*.js",
      "options": {
        "env": {
          "node": true,
          "mocha": true
        }
      }
    }
  },
  build: {
    "src": src + "/app/**/*",
    "dest": dest
  },
  serve: {
    "src": src
  }
};
