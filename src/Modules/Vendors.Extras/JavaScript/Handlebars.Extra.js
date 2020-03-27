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

    Handlebars.registerHelper('getTmdbImageLink',function(url,size,option){
        var escapedUrl = Handlebars.escapeExpression(url)
        ,   image_size = size || 'w500'
        ,   complete_img_url = image_size + escapedUrl
        ,   url = (Configuration.tmdb && Configuration.tmdb.images && Configuration.tmdb.images.base_url) ? (Configuration.tmdb.images.base_url + complete_img_url) : complete_img_url;
        
        return url; 
    });

    Handlebars.registerHelper('getTmdbImageSecureLink',function(url,size,option){
        var escapedUrl = Handlebars.escapeExpression(url)
        ,   image_size = size || 'w500'
        ,   complete_img_url = image_size + escapedUrl
        ,   url = (Configuration.tmdb && Configuration.tmdb.images && Configuration.tmdb.images.secure_base_url) ? Configuration.tmdb.images.secure_base_url+complete_img_url : complete_img_url;
        
        return url; 
    });
    
});