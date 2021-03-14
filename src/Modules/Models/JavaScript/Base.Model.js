define('Base.Model'
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
    
    return Backbone.Model.extend({
        includeKey: true

    ,   url: function(path) {
            var fragment = this.fragment + (path ? '/'+ path : '')
            ,   url = new UrlParse(fragment, Configuration.tmdb['base_uri']);
            return url.toString();
        }

    ,   preinitialize: function(){
            var options = _.toArray(arguments)[1];
            if(options && options.path)
                this.url = _.bind(this.url, this, options.path);
        }
    
    });
});