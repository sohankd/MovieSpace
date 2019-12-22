var gulp = require('gulp')
,   path = require('path')
,   _ = require('underscore')
,   fs = require('fs')
,   distro = require('./distro')
,   requirejsOptimizer = require('gulp-requirejs-optimize')
,   concat = require('gulp-concat')
,   optimize = require('./gulp/javascript')
,   package_manager = require('./gulp/package_manager')
,   through = require('through')
,   {local,setAppRoot} = require('./gulp/local');

// console.log(optimize('JavaScript').paths)

// gulp.task('test',async function () {
//     return gulp.src(_.values(optimize('JavaScript').paths))
//     .pipe(requirejsOptimizer())
//     .pipe(concat('bundle.js'))
//     .pipe(gulp.dest('dist/'));
// })

// gulp.task('test',async () => {
//     return gulp.src(package_manager.localModulesFullPath('javascript','js'))
//     .pipe(package_manager.generateMainConfigFile())
//     .pipe(requirejsOptimizer().on('error',function(err){ console.log(err) }))
//     .pipe(concat('config.js'))
//     .pipe(gulp.dest('dist/'));
// });
setAppRoot(__dirname);

exports.local = local;