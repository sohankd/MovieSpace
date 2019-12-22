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
            
            if(model && model.ajaxOptions)
            {
                for( let [key,value] in model.ajaxOptions )
                {
                    options[key] = _.extend(options[key] || {}, value);
                }
                if(model.ajaxOptions['includeKey'])
                {
                    options.headers = _.extend(options.headers || {}, {
                        'Authorization': `Bearer ${Configuration.tmdb['auth_key']}`
                    });
                }
            }
            return fn(method,model,options);
        })
    });
});