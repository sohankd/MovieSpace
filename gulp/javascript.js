let gulp = require('gulp')
,   package_manager = require('./package_manager')
,   distro = require('../distro.json')
,   path = require('path')
,   through = require('through')
,   Vinyl = require('vinyl');

let globs = package_manager.getGlobs('javascript', 'js')
,   compiled_files_folder = distro['compiledFilesFolder'] || 'precompiled';

/**
 * @method javscript    looks into all specified globs & generates 2 files.
 * 1. require_config.js => Contains all the necessary configurations to load modules by require.js
 * 2. javascript.js => A file that contains contents of all necessary files in optimized manner.
 * @returns {<Readable|Writable> Stream}
 */
function javascript() {
    return gulp.src(globs)
    .pipe(through(function(file){
        let filename = path.basename(file.path)
        ,   newFile = new Vinyl({
                path: path.resolve(compiled_files_folder, filename)
            ,   contents: Buffer.from(file.contents)
            }
        );
        this.queue(newFile);
    }))
    .pipe(gulp.dest('.'));
}

module.exports = javascript;