define('MediaCollections.Item.View'
,   [
        'text!src/Modules/MediaCollections/Template/media_collections_item.hbs'
    ,   'Media.Rating.View'
    ,   'Marionette'
    ]
,   function
    (
        media_collections_item_tpl
    ,   MediaRatingView
    ,   Marionette
    )
{
    'use strict';
    
    return Marionette.View.extend({
        className: 'media-collection-media-container'
        
    ,   template: media_collections_item_tpl

    ,   regions: {
            'Media.Rating': '[data-view="Media.Rating"]'
        }

    ,   childViews: {
            'Media.Rating': function() {
                return new MediaRatingView({
                    application: this.getOption('application')
                ,   maxRating: 10
                ,   rating: this.model.get('vote_average')
                })
            }
        }

    ,   templateContext: function() {
            var popularity = this.model.get('popularity')
            ,   popularity_formatted = popularity >= 100000 ? parseFloat(popularity/1000000).toFixed(2)+'M' : parseFloat(popularity/1000).toFixed(2)+'K';
            return {
                media_type: this.getOption('media_type')
            ,   popularity_formatted: popularity_formatted
            ,   media_type: this.getOption('media_type')
            }
        }

    });
});