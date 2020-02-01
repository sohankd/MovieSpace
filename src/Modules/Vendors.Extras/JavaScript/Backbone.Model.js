define('Backbone.Model'
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
    
    return _.extend(Backbone.Model.prototype,{

        sync: _.wrap(Backbone.Model.prototype.sync,function(fn,method,model,options){

            if(model['includeKey'])
            {
                options.headers = _.extend(options.headers || {}, {
                    'Authorization': `Bearer ${Configuration.tmdb['auth_key']}`
                });
            }
            return fn(method,model,options);
        })
    });
});