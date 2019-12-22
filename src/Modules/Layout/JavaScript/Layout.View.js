define(
    [

        'text!src/Modules/Layout/Template/layout.hbs'

    ,   'Header.View'
    ,   'Footer.View'

    ,   'Marionette'
    ,   'jquery'
    ]
    ,
    function
    (
        
        layout
    ,   HeaderView
    ,   FooterView
    ,   Marionette
    ,   jquery
    )
{
    'use strict';
    
    return Marionette.View.extend({

        template: layout

    ,   regions: 
        {
            'header': '#header'
        ,   'notification': '#notification'
        ,   'content': '#content'
        ,   'footer': '#footer'
        }

    ,   initialize: function()
        {
            
        }

    ,   childViews:{
            'header': function(){
                return new HeaderView();
            }
        ,   'footer': function(){
                return new FooterView();
            }
    }

    ,   templateContext()
        {
            return{
                name: 'sohan'
            }
        }

    });

});