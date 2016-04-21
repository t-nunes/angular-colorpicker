
    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();

    gulp.task('scss', function(){

        return gulp.src('assets/scss/app.scss')
            .pipe(plugins.sass())
            .pipe(plugins.cleanCss())
            .pipe(gulp.dest('src/css/'));
    });

    gulp.task('watch', ['scss'], function(){
        return gulp.watch('assets/scss/**/*.scss', ['scss']);
    });