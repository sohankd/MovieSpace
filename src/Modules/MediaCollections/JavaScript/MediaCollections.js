define('MediaCollections'
,   [ 'MediaCollections.Router' ]
,   function( MediaCollectionsRouter ) {
    
    'use strict';
    
    return function(application) {
        return new MediaCollectionsRouter({ application });
    };
});