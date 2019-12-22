require.config({

    baseUrl: "src/"

,   paths:
    {
        jquery: "vendor/jquery/jquery.min"
    ,   underscore: 'vendor/underscore/underscore.min'
    ,   text: 'vendor/text/text'
    ,   Handlebars: 'vendor/handlebars/handlebars.min'
    ,   backbone: 'vendor/backbone/backbone.min'   
    ,   'backbone.radio': 'vendor/backbone.radio/backbone.radio.min'
    ,   Marionette: 'vendor/backbone.marionette/backbone.marionette.min'
    }

,   shim:
    {
        jquery:
        {
            exports: 'jquery'
        }
    ,   underscore:
        {
            exports: '_'
        }
    ,   backbone:
        {
            deps: ['underscore','jquery']
        ,   exports: 'backbone'
        }
    ,   'backbone.radio':
        {
            deps: ['backbone']
        ,   exports: 'backbone.radio'
        }
    ,   Marionette:
        {
            deps: ['backbone','backbone.radio','underscore']
        ,   exports: 'marionette'
        }
    }
});

require(
[
    
    'Modules/Application/JavaScript/Application'
,   'Modules/Marionette.Extras/JavaScript/Marionette.View'
]
,   function
(
    Application
)
{
    var app = new Application();
    app.start();
});