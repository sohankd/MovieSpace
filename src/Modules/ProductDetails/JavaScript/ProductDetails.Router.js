define([
        'ProductDetails.View'
    ,   'backbone'
    ]
    ,   function
    (
        ProductDetailsView
    ,   Backbone
    )
    {
    'use strict';

    return Backbone.Router.extend({
        
        routes:{
            'details': 'showProductDetailsPage'
        }

    ,   initialize: function(options)
        {
            this.application = options && options.application;
        }

    ,   showProductDetailsPage: function()
        {
            var view = new ProductDetailsView({application:this.application});
            view.showContent();
        }
    });
});