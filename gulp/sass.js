var gulp = require('gulp')
,   gulp_sass = require('gulp-sass')
,   sourcemaps = require('gulp-sourcemaps')
,   package_manager = require('./package_manager')
,   concat = require('gulp-concat')
,   prefixer = require('gulp-autoprefixer')
,   distro = require('../distro')
,   path = require('path');

var {globs,exportFile} = package_manager.getConfig('scss','scss')
,   mainFilePath = path.join( distro['modulePath'].Modules, '/**/', distro['scss'] && distro['scss'].mainFile)
,   globs = mainFilePath || (globs);

function sass(){
    return gulp.src(globs)
    .pipe(sourcemaps.init())
    .pipe(gulp_sass({outputStyle: 'compressed'}).on('error',gulp_sass.logError))
    .pipe(prefixer())
    .pipe(concat(exportFile))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(package_manager.getDistFolderPath('local')))
}

exports.sass = sass