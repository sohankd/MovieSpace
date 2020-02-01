define('ajaxSetup'
,   [   'jquery'    ]
,   function(jQuery) 
{
    'use strict';
    
    jQuery(document).ajaxError(function( event, jqxhr, settings, error ) {
        if(jqxhr.responseJSON)
        {
            var response = jqxhr.responseJSON
            jQuery('.notification')
            .text(`${jqxhr.status} : ${response.status_message}`)
            .addClass('alert-danger').toggle().fadeOut(6000);
        }
    });
});