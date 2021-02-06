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
        jQuery(document).on('click','a',function(e){
            e.preventDefault();
            var url = jQuery(e.currentTarget).attr('href');
            url && url.trim() && Backbone.history.navigate(url, {trigger: true});
        });
    }
});