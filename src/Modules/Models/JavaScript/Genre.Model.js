define('Genre.Model'
,   [ 'Base.Model' ]
,   function( BaseModel ) {
    
    'use strict';
    
    return BaseModel.extend({
        fragment: 'genre'

    });
});