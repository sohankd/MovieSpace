let gulp = require('gulp')
,   handlebars = require('gulp-handlebars')
,   defineModule = require('gulp-define-module')
,   package_manager = require('./package_manager')
,   path = require('path')
,   through = require('through')
,   Vinyl = require('vinyl')
,   concat = require('gulp-concat');

let templateExt = 'hbs'
,   {globs, exportFile} = package_manager.getConfig('template', templateExt)
,   compiledTemplatePath = path.posix.join(package_manager.getDistFolderPath(), '');

/**
 * @method addDefineModuleName  Set 'id' for amd-define module.
 * For example, previously => define([],function(){ // Contents // })
 * After => define('abc', [],function(){ // Contents // }); (where 'abc' is the 'id' of the amd-define module.)
 * @param {String} filePath
 * @returns {String}
 */
function addDefineModuleName(filePath){
    let last_path_index = filePath.lastIndexOf('\\') || filePath.lastIndexOf('/')
    ,   fileName = filePath.substr(last_path_index + 1, filePath.length)
    ,   newFileName = fileName.replace(/(.js)$/, '.'+ templateExt);
    return newFileName;
}

/**
 * @method extractFileOnly  Removes all parent directories and set the path to file name only.
 * For example, D:\\abc\def\ghi.js (Older file path ) => ghi.js (new file path)
 * @returns {<Readable|Writable> Stream}
 */
function extractFileOnly(){
    onFile = function(file){
        let filePath = file.path
        ,   last_parent_dir_index = filePath.lastIndexOf('\\') || filePath.lastIndexOf('/')
        ,   fileName = filePath.substr(last_parent_dir_index + 1, filePath.length)
        ,   newFile;

        newFile = new Vinyl({
            path: fileName
        ,   contents: Buffer.from(file.contents)
        });
        
        this.queue(newFile);
    }
    return through(onFile);
}

/**
 * @method wrap  Simply wrap the contents with provided fragments.
 * This function is specific to this project. Customize as per your need.
 * @param {Object} fragments
 * @returns {<Readable|Writable> Stream}
 */
function wrap({startFrag, endFrag}){
    function onFile(file){
        let contents = file.contents
        ,   startFragBuffer = Buffer.from(startFrag)
        ,   endFragBuffer = Buffer.from(endFrag)
        ,   newFile;

        newFile = new Vinyl({
            path: file.path
        ,   contents: Buffer.from(Buffer.concat([startFragBuffer, contents, endFragBuffer]))
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
    .pipe(extractFileOnly())
    .pipe(concat(exportFile, {newLine: '\n\n'}))
    .pipe(wrap({
            startFrag: '(function(){\n'
        ,   endFrag: '\n}())'
        })
    )
    .pipe(gulp.dest(compiledTemplatePath));
}

module.exports = template;