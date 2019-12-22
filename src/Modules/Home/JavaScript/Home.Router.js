define([
        'Home.View'
    ,   'backbone'
    ]
,   function
    (
        HomeView
    ,   Backbone
    )
{
    'use strict';

    return Backbone.Router.extend({
        
        routes:{
            '': 'showHomePage'
        }
    
    ,   initialize: function(options)
        {
            this.application = options && options.application;
        }

    ,   showHomePage: function()
        {
            var view = new HomeView({application: this.application});
            view.showContent();
        }
    });
});