let gulp = require('gulp')
,   handlebars = require('gulp-handlebars')
,   defineModule = require('gulp-define-module')
,   package_manager = require('./package_manager')
,   path = require('path')
,   through = require('through')
,   Vinyl = require('vinyl')
,   distro = require('../distro.json');

let templateExt = (distro['template']['extname'] || 'html')
,   globs = package_manager.getGlobs('template', templateExt)
,   compiled_files_folder = distro['compiledFilesFolder'] || 'precompiled';

/**
 * @method addDefineModuleName  Set 'id' for amd-define module.
 * For example, previously => define([],function(){ // Contents // })
 * After => define('abc', [],function(){ // Contents // }); (where 'abc' is the 'id' of the amd-define module.)
 * @param {String} filePath
 * @returns {String}
 */
function addDefineModuleName(filePath){
    let fileName = path.basename(filePath)
    ,   newFileName = fileName.replace(/(.js)$/, '.'+ templateExt);
    return newFileName;
}

/**
 * @method storeProcessedTemplates  Store processed template files in the specified folder.
 * @returns {<Readable|Writable> Stream}
 */
function storeProcessedTemplates(){
    onFile = function(file){
        let fileName = path.basename(file.path)
        ,   file_ext = path.extname(file.path)
        ,   patt = new RegExp(file_ext + '$', 'i')
        ,   newFile = new Vinyl({
                path: path.resolve(compiled_files_folder, 'templates', fileName.replace(patt, '.' + templateExt + file_ext))
            ,   contents: Buffer.from(file.contents)
            });
        
        this.queue(newFile);
    }
    return through(onFile);
}

/**
 * @method template
 * @returns {<Readable|Writable> Stream}
 */
function template(){
    return gulp.src(globs)
    .pipe(handlebars())
    .pipe(defineModule('amd',{
            name: addDefineModuleName
        ,   require: {
                "Handlebars": "Handlebars"  //Specific to this project
            }
        })
    )
    .pipe(storeProcessedTemplates())
    .pipe(gulp.dest('.'));
}

module.exports = template;