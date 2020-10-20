define('Header.Search.View'
,   [
        'text!src/Modules/Header/Template/header_search.hbs'
    ,   'Marionette'
    ]
,   function
    (
        header_search
    ,   Marionette
    )
{
    'use strict';

    return Marionette.View.extend({

        template: header_search

    ,   initialize: function(){
            this.model = this.getOption('model');
        }

    ,   templateContext: function(){
            return{
                isLoading: this.getOption('isLoading')
            ,   showPopup: this.getOption('showPopup')
            ,   results: _.first(this.model.get('results'),3)
            ,   total_results: this.model.get('total_results')
            };
        }
    });
    
});