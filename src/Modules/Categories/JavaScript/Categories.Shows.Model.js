define('Categories.Shows.Model'
,   [
        'Configuration'
    ,   'backbone'
    ]
,   function
    (
        Configuration
    ,   Backbone
    )
{
    'use strict';
    
    return Backbone.Model.extend({

        urlRoot: function()
        {
            return Configuration.tmdb['base_uri'] + 'genre/tv/list';
        }
        
    ,   includeKey: true

    });
});