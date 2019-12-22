define('Header.View',
    [
        'Marionette'
    ,   'Categories.Movies.Model'
    ,   'text!src/Modules/Header/Template/header.hbs'
    ]
,   function
    (
        Marionette
    ,   MovieGenres
    ,   header_tpl
    )
{
    'use strict';
    
    return Marionette.View.extend({

        template: header_tpl
        
    ,   initialize: function()
        {
            this.model = new MovieGenres();
            this.model.fetch();
            this.model.on('change',this.render,this);
        }
    });
});