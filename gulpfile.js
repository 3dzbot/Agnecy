const gulp = require('gulp');
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var babel = require("gulp-babel");


var path = {
    src:{
        style: "./src/scss/style.scss",
        script: "./src/script/**/*.js",
        html: "./src/**/*.html",
    },
    dist:{
        style: "./build",
        script: "./build",
        html: "./",
    }
};
sass.compiler = require('node-sass');

gulp.task('sass', function(){
    return gulp.src(path.src.style)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dist.style))
});

function html() {
    return gulp.src(path.src.html)
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.dist.html));
};

function scripts() {
    return gulp.src(path.src.script)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(path.dist.script))
};

gulp.task('scripts', scripts);
gulp.task('html', html);
gulp.task('server', server);

function server() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./src/scss/*.scss", gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch("./src/script/**/*.js", gulp.series('scripts')).on('change', browserSync.reload);
    gulp.watch("./src/*.html", gulp.series('html')).on('change', browserSync.reload);
};

gulp.task('default', gulp.parallel('sass', scripts, html, server));