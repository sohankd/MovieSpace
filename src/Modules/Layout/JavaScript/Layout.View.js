define('Layout.View'
,   [
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
    ,   jQuery
    )
{
    'use strict';
    
    return Marionette.View.extend({

        template: layout

    ,   events: {
            'click .overlay': 'toggleOverlay'
        }

    ,   regions: {
            'header': '#header'
        ,   'notification': '#notification'
        ,   'content': '#content'
        ,   'footer': '#footer'
        }

    ,   childViews: {
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

    ,   toggleOverlay: function(e,doHide) {
            var $overlay = this.$('.overlay');

            if( e && jQuery(e.target).hasClass('overlay') )
                return this.getChildView('header').togglePushPanel(null, true);
            
            this.targetEl = e && jQuery(e.target);
            
            doHide ? $overlay.removeClass('show') : $overlay.addClass('show');
        }

    });

});