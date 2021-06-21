define('MediaCollections.Item.View'
,   [
        'text!src/Modules/MediaCollections/Template/media_collections_item.hbs'
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
            return {
                media_type: this.getOption('media_type')
            ,   poster_size: Utils.getDeviceType() == "Mobile" ? 'w185' : 'w300'
            };
        }

    });
});