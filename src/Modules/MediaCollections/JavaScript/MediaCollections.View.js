define('MediaCollections.View'
,   [
        'text!src/Modules/MediaCollections/Template/media_collections.hbs'
    ,   'MediaCollections.Item.View'
    ,   'Global.Pagination.View'
    ,   'Url'
    ,   'Marionette'
    ,   'underscore'
    ]
,   function
    (
        media_collections_tpl
    ,   MediaCollectionsItemView
    ,   GlobalPaginationView
    ,   UrlParse
    ,   Marionette
    ,   _
    )
{
    'use strict';
    
    return Marionette.View.extend({
        template: media_collections_tpl

    ,   events: {
            'click [data-action="change-page"]': 'updateCollection'
        }

    ,   initialize: function() {
            this.genres = this.getOption('genres');
            this.type = this.getOption('type');
        }

    ,   regions: {
            'FilterView': '[data-view="Filter.View"]'
        ,   'ItemCollectionView': '[data-view="Items.Collection.View"]'
        ,   'GlobalPagination': '[data-view="Pagination.View"]'
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
        ,   "GlobalPagination": function() {
                return new GlobalPaginationView({
                    application: this.getOption('application')
                ,   currentPage: this.collection['page'] 
                ,   totalResults: this.collection['total_results']
                ,   totalPages: this.collection['total_pages']
                ,   useLoadButton: false
                });
            }
        }
    
    ,   updateCollection: function(){
            var _this = this
            ,   collection = this.collection.clone()
            ,   page = (this.collection['page'] < this.collection['total_pages'] && this.collection['page'] + 1)
            ,   url = new UrlParse(this.collection.url(this.type))
            ,   params = _.extend(url.getQueryParams(), { page: page });

            page && collection
                    .fetch({ url: url.getAbsolutePath(), data: params })
                    .done(function(response){
                        _this.collection.add(response.results);
                        _this.collection['page'] = response.page;
                        _this.renderChildView('ItemCollectionView');
                        _this.renderChildView('GlobalPagination');
                    })
        }
    });

});