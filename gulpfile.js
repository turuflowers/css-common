// generated on 2017-04-03 using generator-webapp 2.4.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const rename = require("gulp-rename");
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();

dev = true;

gulp.task('styles', () => {
    return gulp.src('src/*.scss')
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.sass.sync({
            outputStyle: 'collapsed',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.if(dev, $.sourcemaps.write()))
        .pipe(gulp.dest('src'))
});

gulp.task('compress', () => {
    return gulp.src('src/*.css')
        .pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'build', gzip: true}));
});

gulp.task('serve', () => {
    runSequence(['styles'], () => {
    gulp.watch('src/*.scss', ['styles']);
});
});

gulp.task('build', () => {
    runSequence(['compress'], () => {
});
});