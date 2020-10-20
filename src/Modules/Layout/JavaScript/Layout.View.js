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
    ,   jquery
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

            if( jQuery(e.target).hasClass('overlay') ){
                this.targetEl.trigger('click');
                return;
            }
            this.targetEl = jquery(e.target);
            
            doHide ? $overlay.removeClass('show') : $overlay.addClass('show');
        }

    });

});