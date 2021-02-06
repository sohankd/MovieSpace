define('Error.Management'
,   ['Navigator','PageNotFound.View','backbone','jquery','underscore']
,   function(Navigator,PageNotFoundView,Backbone,jQuery,_) {
    
    'use strict';
    
    return function(application) {
        // Event listener added to 'pathchange' event which will display 'Page Not Found' for non-existing routes.
        Backbone.on('pathchange', function(){
            if(!Navigator.isValidRoute){
                var view = new PageNotFoundView({ application });
                view.showContent();
            }
        });
    }
});