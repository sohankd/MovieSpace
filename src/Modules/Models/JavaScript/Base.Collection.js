define('Base.Collection'
,   [
        'Configuration'
    ,   'backbone'
    ,   'Url'
    ,   'underscore'
    ]
,   function
    (
        Configuration
    ,   Backbone
    ,   UrlParse
    ,   _
    )
{
    'use strict';
    
    return Backbone.Collection.extend({
        includeKey: true

    ,   url: function(path) {
            var fragment = this.fragment + (path ? '/'+ path : '')
            ,   url = new UrlParse(fragment, Configuration.tmdb['base_uri']);
            return url.toString();
        }

    ,   setUrl: function(path){
            this.url = _.bind(this.url, this, path);
        }
    
    });
});