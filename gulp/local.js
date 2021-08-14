let gulp = require('gulp')
,   express = require('express')
,   path = require('path')
,   dotenv = require('dotenv')
,   javascript = require('./javascript')
,   sass = require('./sass')
,   template = require('./template')
,   assets = require('./assets')
,   clean = require('./clean')
,   build = require('./build');

let app = express();
this.app_root;
dotenv.config();

function setAppRoot(app_root) {
    this.app_root = app_root;
}
/**
 * @method server   Starts listening to requests.
 */
function server(){
    let port = process.env.port;

    app.use('/', express.static(this.app_root));
    app.use('/*', express.static(path.join( this.app_root, 'index.html')));
    app.listen( port, function(){
        console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    });
}
/**
 * @method watch    Watches specified globs for any changes.
 * @param {Function} cb
 */
function watch(cb){
    gulp.watch('src/**/*.hbs', gulp.series([template, build]));
    gulp.watch('src/**/*.js', gulp.series([javascript, build]));
    gulp.watch('src/**/*.scss', sass);
    cb();
}

exports.local = gulp.series([clean, gulp.parallel([template, sass, javascript, assets]), build, watch, server])
exports.setAppRoot = setAppRoot;