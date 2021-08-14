define('Header.Search.View'
,   [
        'header_search.hbs'
    ,   'Marionette'
    ,   'Utils'
    ]
,   function
    (
        header_search
    ,   Marionette
    ,   Utils
    )
{
    'use strict';

    return Marionette.View.extend({

        template: header_search

    ,   templateContext: function(){
            return{
                isLoading: this.getOption('isLoading')
            ,   showPopup: this.getOption('showPopup')
            ,   results: _.first(this.collection.toJSON(), Utils.getDeviceType() == "Mobile" ? 3 : 4)
            ,   total_results: this.collection['total_results']
            ,   query: encodeURI(this.getOption('query'))
            };
        }
    });
    
});