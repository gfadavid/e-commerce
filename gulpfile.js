const { src, dest, watch, series } = require ('gulp');

const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const broswersync = require('browser-sync').create();

// Tarea SASS
function scssTask() {
    return src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'));
}  

// Tarea Javascript
function jsTask() {
    return src('src/js/index.js')
        .pipe(terser())
        .pipe(dest('dist/js'))
}

// Tarea BrowserSync
function broswersyncServe(cb) {
    broswersync.init({
        server: {
            baseDir: 'dist/'
        }
    });
    cb();
}

function broswersyncReload(cb) {
    broswersync.reload();
    cb();
}

// Tarea Watch
function watchTask() {
    watch('dist/*.html', broswersyncReload);
    watch(['src/scss/**/*.scss', 'src/js/**/*.js'], series(scssTask, jsTask, broswersyncReload));
}

// Tarea Default
exports.default = series(
    scssTask,
    jsTask,
    broswersyncServe,
    watchTask
);