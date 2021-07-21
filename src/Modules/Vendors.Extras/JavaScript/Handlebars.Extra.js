define('Handlebars.Extra'
,   [
        'Configuration'
    ,   'Handlebars'
    ,   'Utils'
    ]
,   function
    (
        Configuration
    ,   Handlebars
    ,   Utils
    )
{
    'use strict';

    Handlebars.registerHelper('getTmdbImageLink',function(url, size, option){
        var escapedUrl = Handlebars.escapeExpression(url)
        ,   image_size = size && typeof(size) == 'string' ? size : 'w500'
        ,   complete_img_url = image_size + escapedUrl
        ,   url = (Configuration.tmdb && Configuration.tmdb.images && Configuration.tmdb.images.base_url) ? (Configuration.tmdb.images.base_url + complete_img_url) : complete_img_url;
        
        return url; 
    });

    Handlebars.registerHelper('getTmdbImageSecureLink',function(url, size, option){
        var escapedUrl = Handlebars.escapeExpression(url)
        ,   image_size = size || 'w500'
        ,   complete_img_url = image_size + escapedUrl
        ,   url = (Configuration.tmdb && Configuration.tmdb.images && Configuration.tmdb.images.secure_base_url) ? Configuration.tmdb.images.secure_base_url+complete_img_url : complete_img_url;
        
        return url; 
    });
    
    Handlebars.registerHelper('ifEquals',function(variable, param, options){
        return variable == param ? options.fn(this) : options.inverse(this); 
    });
    
    Handlebars.registerHelper('getAbsoluteAssetPath',function(variable){
        console.log(Utils.getAbsoluteAssetPath(variable))
        return Utils.getAbsoluteAssetPath(variable);
    });
});