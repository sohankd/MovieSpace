define('Movie.Model'
,   [ 'Base.Model' ]
,   function( BaseModel ) {
    
    'use strict';
    
    return BaseModel.extend({
        fragment: 'movie'

    });
});