define([
        './Home.Router'
    ]
,   function
    (
        HomeRouter
    )
{
    'use strict';
    
    return function mountToApp(application){
        return new HomeRouter({application});
    }
});