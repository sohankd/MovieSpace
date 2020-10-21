define('Backbone.Collection'
,   [
        'Configuration'
    ,   'backbone'
    ,   'underscore'
    ]
,   function
    (
        Configuration
    ,   Backbone
    ,   _
    )
{
    'use strict';
    
    return _.extend(Backbone.Collection.prototype,{

        sync: _.wrap(Backbone.Collection.prototype.sync,function(fn, method, collection, options) {

            if(collection['includeKey']) {
                options.headers = _.extend(options.headers || {}, {
                    'Authorization': `Bearer ${Configuration.tmdb['auth_key']}`
                });
            }
            return fn(method, collection, options);
        })
    });
});