define('MediaCollections.View'
,   [
        'text!src/Modules/MediaCollections/Template/media_collections.hbs'
    ,   'MediaCollections.Item.View'
    ,   'Marionette'
    ,   'underscore'
    ]
,   function
    (
        media_collections_tpl
    ,   MediaCollectionsItemView
    ,   Marionette
    ,   _
    )
{
    'use strict';
    
    return Marionette.View.extend({
        template: media_collections_tpl

    ,   initialize: function() {
            this.genres = this.getOption('genres');
            this.type = this.getOption('type');
        }

    ,   regions: {
            'FilterView': '[data-view="Filter.View"]'
        ,   'ItemCollectionView': '[data-view="Items.Collection.View"]'
        }

    ,   childViews: {
            "ItemCollectionView": function() {
                return new Marionette.CollectionView({
                    className: 'media-collection-view-container'
                ,   application: this.getOption('application')
                ,   collection: this.collection
                ,   childView: MediaCollectionsItemView
                ,   childViewOptions: {
                        application: this.getOption('application')
                    ,   media_type: this.type
                    }
                });
            }
        }
    });

});