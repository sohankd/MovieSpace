define([
        'text!src/Modules/Home/Template/home.hbs'
    ,   'Marionette'
    ]
,   function
    (
        hometpl
    ,   Marionette
    )
{
    'use strict';
    
    return Marionette.View.extend({
        template: hometpl
    });
});