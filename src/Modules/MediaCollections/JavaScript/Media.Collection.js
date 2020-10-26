define('Media.Collection'
,   [ 'Base.Collection' ]
,   function( BaseCollection ) {
    
    'use strict';
    
    return BaseCollection.extend({
        fragment: 'discover'

    ,   parse: function(response) {
            for(var prop in response) {
                this[prop] = response[prop];
            }
            delete this['results'];
            return response.results;
        }
    
    });
});