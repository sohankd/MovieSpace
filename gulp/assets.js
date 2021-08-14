let gulp = require('gulp')
,   package_manager = require('./package_manager')
,   merge = require('merge2')
,   distro = require('../distro.json')
,   Vinyl = require('vinyl')
,   through = require('through')
,   _ = require('underscore');

let dist_folder = package_manager.getDistFolderPath()
,   js_tpl_export_file = distro.buildFile
,   css_export_file = distro.scss.exportFile;

/**
 * @method htmlReplace  Inject provided template in html file.
 * It works similar to 'gulp-html-replace', but 'gulp-html-replace' doesn't add custom attributes like data-*, async/defer etc.
 * @param {Object} config 
 * @returns {<Readable|Writable> Stream}
 */

/**
 * Example
 * 
 * File: index.html
 * ================
 * <html>
 *      <head>
 *          <!-- build:css><-- endbuild -->
 *      </head>
 *      <body>
 *          <!-- build:js><-- endbuild -->
 *          <!-- build:tpl><-- endbuild -->
 *      </body>
 * </html>
 * 
 * htmlReplace Code
 * ==================
 *      htmlReplace({
 *          css: `<link rel="stylesheet" data-href="style.css" />`
 *      ,   js: `<script data-src="www/javascript.js" async defer></script>`
 *      ,   tpl: `<script src="build/template.min.js"></script>`
 *      })
 * 
 * File: index.html (After htmlReplace() execution)
 * ==================================================
 * <html>
 *      <head>
 *          <link rel="stylesheet" data-href="style.css" />
 *      </head>
 *      <body>
 *          <script data-src="www/javascript.js" async defer></script>
 *          <script src="build/template.min.js"></script>
 *      </body>
 * </html>
 * 
 */
function htmlReplace(config){
    let entries = _.pairs(config) || [];

    function onFile(file){
        let contents = file.contents.toString()
        ,   file_path = file.path;
        
        entries.forEach(function(entry){
            let build_name = entry[0]
            ,   build_value = entry[1]
            ,   patt = new RegExp('\\t?<!--\\s?build:' + build_name + '\\s?-->\\t?<!--\\s?endbuild\\s?-->', 'i')
            contents = contents && contents.replace(patt, build_value);
        });

        this.queue(new Vinyl({
            path: file_path
        ,   contents: Buffer.from(contents)
        }));
    }
    return through(onFile);
}

function copyAssets(cb){
    return merge(
        gulp.src('src/img/*', {base: 'src'})
    ,   gulp.src('src/fontawesome/webfonts/*', {base: 'src/fontawesome'})
    ,   gulp.src('index.html', {base: '.'})
        .pipe(htmlReplace({
                css: `<link rel="stylesheet" href="${process.env.baseUrl + css_export_file}" />`
            ,   js: `<script src="${process.env.baseUrl + js_tpl_export_file}" async defer></script>`
            })
        )
    )
    .pipe(gulp.dest(dist_folder));
}

module.exports = copyAssets;