var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function() {
    gulp.src('index.js')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(gulp.dest('release'));

    return gulp.src('components/*.js')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(gulp.dest('release/components'));
});