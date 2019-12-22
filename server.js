var app_root = __dirname
,   express = require('express')
,   path = require('path');

var app = express();

// console.log(path.join( app_root,'/','src' ))

app.use( express.static( path.join( app_root ) ));

var port = 4711;

app.listen( port, function(){
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
