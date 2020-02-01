define('PageNotFound.View'
,   [
        'text!src/Modules/Error.Management/Template/page_not_found.hbs'
    ,   'Marionette'
    ]
,   function
    (
        page_not_found_hbs
    ,   Marionette
    )
{
    'use strict';
    
    return Marionette.View.extend({
        template: page_not_found_hbs
    });

});