var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack');
var path = require('path');
var bunyan = require('bunyan');
var postcss = require('gulp-postcss');
var cssvariables = require('postcss-css-variables');
var autoprefixer = require('autoprefixer');
var watch = require('gulp-watch');
var lost = require('lost');
var log = bunyan.createLogger({
  name: 'twitterAndStrava',
  streams: [
    {
      level: 'info',
      // stream: process.stdout,
      path: './myAppInfo.log'            // log INFO and above to stdout
    },
    {
      level: 'error',
      path: './myAppErrors.log'  // log ERROR and above to a file
    }
  ]
});
var webpackBabelConfig = {
  entry: path.join(process.cwd(), 'client-render.js'),
  output: {
    path: './public/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};

gulp.task('webpack', function() {
  return webpack(webpackBabelConfig).run(function(err, stats){
        if (err) {
            console.log(err);
            log.info(err);
        }
        else {
            console.log(stats.toString());
            // log.info(stats.toString());
        }

    });
});
gulp.task('postcss', function(){
    var processers = [
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssvariables,
    lost
    ];
    return gulp.src('styles/*.css')
           .pipe(postcss(processers))
           .pipe( gulp.dest('public/') );
});
gulp.task('copyImages', function(){
    gulp.src('./images/**')
    .pipe(gulp.dest('public/images'));

});
gulp.task('copyStyles', function(){
    gulp.src('./font/**')
    .pipe(gulp.dest('public/font'))
})
gulp.task('default', ['webpack', 'postcss', 'copyImages', 'copyStyles']);