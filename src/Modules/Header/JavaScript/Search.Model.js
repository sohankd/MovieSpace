define('Search.Model'
,   [
        'backbone'
    ,   'Configuration'
    ]
,   function
    (
        Backbone
    ,   Configuration
    )
{
    'use strict';

    return Backbone.Model.extend({
        url: function(){
            return Configuration.tmdb['base_uri'] + 'search/multi?language=en-US'
        }

    ,   includeKey: true
    });
});