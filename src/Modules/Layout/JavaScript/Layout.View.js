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

    ,   childViews:{
            'header': function(){
                return new HeaderView({
                    application: this.options && this.options.application
                });
            }
        ,   'footer': function(){
                return new FooterView({
                    application: this.options && this.options.application
                });
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