define('Handlebars.Extra'
,   [
        'Configuration'
    ,   'Handlebars'
    ]
,   function
    (
        Configuration
    ,   Handlebars
    )
{
    'use strict';

    Handlebars.registerHelper('getTmdbImageLink',function(url,option){
        var escapedUrl = Handlebars.escapeExpression(url);
        var url = (Configuration.tmdb && Configuration.tmdb.images && Configuration.tmdb.images.base_url) ? Configuration.tmdb.images.base_url+escapedUrl : escapedUrl;
        console.log(Configuration.tmdb && Configuration.tmdb.images && Configuration.tmdb.images.base_url)
        return url; 
    });

    Handlebars.registerHelper('getTmdbImageSecureLink',function(url,option){
        var escapedUrl = Handlebars.escapeExpression(url);
        var url = (Configuration.tmdb && Configuration.tmdb.images && Configuration.tmdb.images.secure_base_url) ? Configuration.tmdb.images.secure_base_url+escapedUrl : escapedUrl;
        return url; 
    });
    
});