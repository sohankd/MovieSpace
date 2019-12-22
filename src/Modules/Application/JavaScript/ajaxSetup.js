define('ajaxSetup'
,   [   'jquery'    ]
,   function(jquery) 
{
    'use strict';
    jquery.ajaxSetup({
        global: true
    ,   error: function(error){
            console.log(jquery('.notification'));
            jquery('.notification').text(error)
        }
    });
    jquery(document).ajaxError(function( event, jqxhr, settings, error ) {
        jquery('.notification').text(error)
    });
});