define('Home.View'
,   [
        'text!src/Modules/Home/Template/home.hbs'
    ,   'Movie.Model'
    ,   'Marionette'
    ]
,   function
    (
        hometpl
    ,   MovieModel
    ,   Marionette
    )
{
    'use strict';
    
    return Marionette.View.extend({
        template: hometpl

    ,   initialize: function()
        {
            // this.model = new MovieModel();
            // this.model.fetch();
            // this.model.on('change',this.render,this);
        }
    });
});