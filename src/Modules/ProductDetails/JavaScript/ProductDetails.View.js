define([
        'text!src/Modules/ProductDetails/Template/productdetails.hbs'
    ,   'Marionette'
    ]
,   function
    (
        productdetailstpl
    ,   Marionette
    )
{
    'use strict';
    
    return Marionette.View.extend({
        template: productdetailstpl
    });
});