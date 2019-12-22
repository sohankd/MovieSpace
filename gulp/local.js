var gulp = require('gulp')
,   express = require('express')
,   path = require('path')
,   gulp_config = require('./gulp-config')
,   {javascript} = require('./javascript')
,   {sass} = require('./sass')
,   {template} = require('./template');

var app = express();
this.app_root;

function setAppRoot(app_root)
{
    this.app_root = app_root;
}

function local(){
    
    app.use( express.static( path.join( this.app_root ) ));
    
    var port = gulp_config.port;

    app.listen( port, function(){
        console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    });
}

function watch(cb){

    gulp.watch('src/**/*.hbs',template);
    gulp.watch('src/**/*.js',javascript);
    gulp.watch('src/**/*.scss',sass);
    cb();
}

exports.local = gulp.series([gulp.parallel([template,sass,javascript]),watch,local])
exports.setAppRoot = setAppRoot;
