define('Search.Model'
,   [ 'Base.Model' ]
,   function( BaseModel ) {
    
    'use strict';

    return BaseModel.extend({
        fragment: 'search/multi?language=en-US'

    });
});