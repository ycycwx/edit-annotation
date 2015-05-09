var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass   = require('gulp-ruby-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

gulp.task('js', function () {
    return gulp.src('src/js/editor.js')
    .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('editor.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
    return sass('src/css/editor.scss')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
    gulp.watch('./src/css/editor.scss', ['css']);
    gulp.watch('./src/js/editor.js', ['js']);
    gulp.watch('./src/images/*', ['imagemin']);
});

gulp.task('default', function() {
    // gulp.start('css', 'js', 'imagemin');
    gulp.start('watch');
});
