'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var webpackk = require('webpack');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var dedupe = new webpackk.optimize.DedupePlugin();

function webpack (watch, callback) {
  var webpackOptions = {
    watch: watch,
    module: {
      preLoaders: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'jshint-loader'
      }],
      loaders: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel',
        query: {
          stage: 0
        }
      }, {
        test: /\.html$/, 
        exclude: /node_modules/, 
        loader: 'html',
      }]
    },
    plugins: [
      dedupe
    ],
    output: { 
      filename: 'app.module.js' 
    }
  };

  if(watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if(err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if(watch) {
      watch = false;
      callback();
    }
  };

  return gulp.src(path.join(conf.paths.src, '/app/app.module.js'))
    .pipe($.webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function () {
  return webpack(false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
  return webpack(true, callback);
});
