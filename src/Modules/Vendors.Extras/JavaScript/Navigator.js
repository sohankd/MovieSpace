define('Navigator'
,   [
        'backbone'
    ,   'jquery'
    ]
,   function
    (
        Backbone
    ,   jQuery
    )
{
    'use strict';
    
    return function navigationBypass()
    {
        jQuery('body').on('click','a',function(e){

            e.preventDefault();
            var url = jQuery(e.target).attr('href');
            Backbone.history.navigate(url,{trigger: true});
        });
    }
});