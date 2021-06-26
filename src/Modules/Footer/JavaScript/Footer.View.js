define('Footer.View',
    [
        'text!src/Modules/Footer/Template/footer.hbs'
    ,   'Marionette'
    ]
,   function
    (
        footer_tpl
    ,   Marionette
    )
{
    'use strict';
    
    return Marionette.View.extend({
        template: footer_tpl

    ,   templateContext: function(){
            return {
                currentYear: (new Date()).getFullYear()
            }
        }

    });
});