let gulp = require('gulp')
,   express = require('express')
,   path = require('path')
,   gulp_config = require('./gulp-config')
,   javascript = require('./javascript')
,   sass = require('./sass')
,   template = require('./template')
,   assets = require('./assets')
,   clean = require('./clean');

let app = express();
this.app_root;

function setAppRoot(app_root) {
    this.app_root = app_root;
}
/**
 * @method server   Starts listening to requests.
 */
function server(){
    let port = gulp_config.port;

    app.use( '/', express.static(path.join( this.app_root, 'index.html')));
    app.listen( port, function(){
        console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    });
}
/**
 * @method watch    Watches specified globs for any changes.
 * @param {Function} cb
 */
function watch(cb){
    gulp.watch('src/**/*.hbs', template);
    gulp.watch('src/**/*.js', javascript);
    gulp.watch('src/**/*.scss', sass);
    cb();
}

exports.local = gulp.series([clean, gulp.parallel([template, sass, javascript, assets]), watch, server])
exports.setAppRoot = setAppRoot;