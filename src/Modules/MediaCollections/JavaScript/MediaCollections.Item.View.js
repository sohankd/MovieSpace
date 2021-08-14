define('MediaCollections.Item.View'
,   [
        'media_collections_item.hbs'
    ,   'Marionette'
    ,   'Utils'
    ]
,   function
    (
        media_collections_item_tpl
    ,   Marionette
    ,   Utils
    )
{
    'use strict';
    
    return Marionette.View.extend({
        className: 'media-collection-media-container'
        
    ,   template: media_collections_item_tpl

    ,   templateContext: function() {
            var releaseDate = this.model.get('release_date') || this.model.get('first_air_date')
            ,   has_released = ( Date.now() - (new Date(releaseDate)).getTime() ) >= 0
            return {
                media_type: this.getOption('media_type')
            ,   poster_size: Utils.getDeviceType() == "Mobile" ? 'w185' : 'w300'
            ,   rating_avg: has_released ? this.model.get('vote_average') || 'NR' : 'NR'
            };
        }

    });
});