define([
        './Modules/Home/JavaScript/Home'
    ,   './Modules/ProductDetails/JavaScript/ProductDetails'
    ]
,   function
    (
        Home
    ,   ProductDetails
    )
{
    'use strict';
    
    var _modules = Array.prototype.slice.call(arguments);

    return function loadModules(application)
    {
        _modules && _modules.forEach( router => { router.call(this,application) },this);

    }
});