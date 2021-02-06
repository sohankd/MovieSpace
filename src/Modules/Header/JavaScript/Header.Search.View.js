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

    ,   templateContext: function(){
            return{
                isLoading: this.getOption('isLoading')
            ,   showPopup: this.getOption('showPopup')
            ,   results: _.first(this.collection.toJSON(), 3)
            ,   total_results: this.collection['total_results']
            };
        }
    });
    
});