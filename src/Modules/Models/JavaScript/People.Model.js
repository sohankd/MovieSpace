define('People.Model'
,   [ 'Base.Model' ]
,   function( BaseModel ) {
    
    'use strict';
    
    return BaseModel.extend({
        fragment: 'person'

    });
});