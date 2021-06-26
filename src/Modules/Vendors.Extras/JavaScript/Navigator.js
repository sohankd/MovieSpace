define('Navigator'
,   [ 'backbone', 'jquery', 'Utils' ]
,   function( Backbone, jQuery, Utils ) {
    
    'use strict';

    jQuery(document).on('click','a',function(e){
        e.preventDefault();
        var url = jQuery(e.currentTarget).attr('href') && jQuery(e.currentTarget).attr('href').trim()
        ,   is_abs_url = Utils.isAbsoluteUrl(url)
        ,   is_target_blank = jQuery(e.currentTarget).attr('target') == "_blank";

        is_abs_url ? window.open(url, is_target_blank ? "_blank" : "") : Backbone.history.navigate(url, {trigger: true});
        
        return e;
    });
    // Overwriting pushState() and replaceState() of history object to trigger an custom event.
    // which will help us to add event listeners which will be executed on url change.
    history.pushState = _.wrap(history.pushState, function(fn){
        fn.apply(history, _.toArray(arguments).slice(1));
        Backbone.trigger('pathchange');
    });

    history.replaceState = _.wrap(history.replaceState, function(fn){
        fn.apply(history, _.toArray(arguments).slice(1));
        Backbone.trigger('pathchange');
    });

    var isValidRoute = function(){
        var handlers = Backbone.history.handlers
        ,   fragment = Backbone.history.fragment
        ,   isValidRoute = _.some(handlers || [], function(handler){
            return handler.route.test(fragment);
        });

        return isValidRoute;
    }
    
    return {
        isValidRoute: isValidRoute
    };
});