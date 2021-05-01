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
                ,   collection: (arguments && arguments[0]) || this.collection
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
    
    ,   updateCollection: function(e){
            // Disbale button & display loader
            this.$(e.target).prop("disabled", true).addClass('loading-more');
            
            var _this = this
            ,   collection = this.collection.clone()
            ,   url = new UrlParse(this.collection.url(this.type))
            ,   params;
            this.page = this.page ? (this.page < this.collection['total_pages'] && this.page + 1) : this.collection['page'] + 1;
            params = _.extend(url.getQueryParams(), { page: this.page });

            this.page && collection
                    .fetch({ url: url.getAbsolutePath(), data: params })
                    .done(function(response){
                        var viewConstructor = _this.childViews["ItemCollectionView"]
                        ,   view = viewConstructor.apply(_this, [collection]);
                        _this.$('#item-collection-container').append(view.render().$el)
                        _this.renderChildView('GlobalPagination');
                    });
        }
    });

});