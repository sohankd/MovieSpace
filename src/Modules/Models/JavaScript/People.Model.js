define('People.Model'
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

        url: function()
        {
            return Configuration.tmdb['base_uri'] + 'person/';
        }

    ,   ajaxOptions:{
            includeKey: true
        }
    
    });
});