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
    /*  -------------1ST APPROACH------------
        If we use the following way to serve our static files, it will search for every file
        with requested route. For example, if we search for localhost:4711,by default it will 
        serve the index.html/js. But if we search for other routes like localhost:4711/error (or)
        localhost:4711/docs/file, it will search for 'error' or 'docs/file' in the provided root
        path respectively. So to overcome this problem, we will follow second approach.
    */
    // app.use( express.static( path.join( this.app_root ) ));  // First Approach
    
    /* --------------2ND APPROACH-------------
        In this approach, whenever a user hits a url from browser, the 1st line will be executed
        which will search for requested content and will be served by static(),if the route matches 
        ny of the route present in the array of routes otherwise it will pass the request to next
        router-handler/middleware (here 2nd line is the next router-handler) by invoking next().
        The 2nd router will serve the index.html from the assigned directory regardless of requested
        route/content.
        For example,if user search for localhost:4711/,it will serve the default static file i.e
        index.html/js,present in the assigned directory. But when user search for localhost:4711/error
        or localhost:4711/user/doc, it will search and serve them,if found,otherwise it will serve the
        index.html file.
    */
    app.use( ['/','/src','/LocalDist'],express.static( path.join( this.app_root ) ));
    app.use( '/*',express.static( path.join( this.app_root,'index.html' ) ));
    
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
