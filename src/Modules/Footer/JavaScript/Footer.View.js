define('Footer.View',
    [
        'Marionette'
    ,   'text!src/Modules/Footer/Template/footer.hbs'
    ]
,   function
    (
        Marionette
    ,   footer_tpl
    )
{
    'use strict';
    
    return Marionette.View.extend({

        template: footer_tpl

    });
});