define('Base.Model'
,   [
        'Configuration'
    ,   'backbone'
    ,   'Utils'
    ,   'underscore'
    ]
,   function
    (
        Configuration
    ,   Backbone
    ,   Utils
    ,   _
    )
{
    'use strict';
    
    return Backbone.Model.extend({
        includeKey: true

    ,   url: function(path) {
            return Utils.appendToUrl(Configuration.tmdb['base_uri'], [this.fragment, path], true);
        }

    ,   preinitialize: function(){
            var options = _.toArray(arguments)[1];
            if(options && options.path)
                this.url = _.bind(this.url, this, options.path);
        }
    
    });
});