define([
        'ProductDetails.Router'
    ]
,   function
    (
        ProductDetailsRouter
    )
{
    'use strict';
    
    return function mountToApp(application){
        return new ProductDetailsRouter({application});
    }
});