define('Search.Collection'
,   [ 'Base.Collection' ]
,   function( BaseCollection ) {
    
    'use strict';

    return BaseCollection.extend({
        fragment: 'search/multi?language=en-US'

    ,   parse: function(response) {
            for(var prop in response)
                this[prop] = response[prop];

            delete this['results'];
            return response.results;
        }
    });
});