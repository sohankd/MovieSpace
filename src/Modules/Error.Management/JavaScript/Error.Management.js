define('Error.Management'
,   ['Navigator','PageNotFound.View','backbone','jquery','underscore']
,   function(navigationBypass,PageNotFoundView,Backbone,jQuery,_) 
{
    'use strict';
    
    return function(application)
    {
        function handleRoutes()
        {
            var handlers = Backbone.history.handlers
            ,   fragment = Backbone.history.fragment
            ,   isValidRoute = _.some(handlers||[], function(handler){
                return handler.route.test(fragment);
            });

            if(!isValidRoute)
            {
                var view = new PageNotFoundView({ application });
                view.showContent();
            }
        }

        jQuery(document).ready(function(){
            handleRoutes();
            navigationBypass();
        });
        
        jQuery(window).on('hashchange',handleRoutes);
    }
});