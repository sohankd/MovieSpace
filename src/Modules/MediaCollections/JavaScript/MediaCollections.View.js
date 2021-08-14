define('MediaCollections.View'
,   [
        'media_collections.hbs'
    ,   'MediaCollections.Item.View'
    ,   'Global.SortBy.View'
    ,   'Global.Pagination.View'
    ,   'Url'
    ,   'Marionette'
    ,   'backbone'
    ,   'underscore'
    ]
,   function
    (
        media_collections_tpl
    ,   MediaCollectionsItemView
    ,   GlobalSortByView
    ,   GlobalPaginationView
    ,   UrlParse
    ,   Marionette
    ,   Backbone
    ,   _
    )
{
    'use strict';
    
    return Marionette.View.extend({
        template: media_collections_tpl

    ,   events: {
            'click [data-action="change-page"]': 'updateCollection'
        ,   'click [data-action="apply"]': 'applyFilters'
        ,   'click [data-action="reset"]': 'resetFilters'
        }

    ,   initialize: function() {
            this.genreModel = this.getOption('genres');
            this.type = this.getOption('type');
            this.getFiltersFromUrl();
        }

    ,   regions: {
            'SortByView': '[data-view="SortBy.View"]'
        ,   'ItemCollectionView': '[data-view="Items.Collection.View"]'
        ,   'GlobalPagination': '[data-view="Pagination.View"]'
        }

    ,   childViews: {
            "SortByView": function(){
                return new GlobalSortByView({
                    application: this.getOption('application')
                })
            }

        ,   "ItemCollectionView": function() {
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

    ,   getFiltersFromUrl: function(){
            var url = new UrlParse(location.href);
            this.filters = url.getQueryParams();
        }

    ,   applyFilters: function(){
            var selected_genres = this.$('[data-type="genre"]:checked').map(function(){ return this.id; }).get().join(',')
            ,   filter_fragment = this.$('[data-filter-fragment]').data('filter-fragment')
            ,   url = this.type + (selected_genres ? `?${filter_fragment}=${selected_genres}` : '');

            this.$el.find('#genre-filter-list').collapse('hide');
            Backbone.history.navigate(url, true);
        }

    ,   resetFilters: function(){
            this.$el.find('[data-type="genre"]').prop("checked", false);
            this.applyFilters();
        }

    ,   getGenreFilter: function(){
            var genres = _.clone(this.genreModel.get('genres')) || []
            ,   selected_genres = this.filters['with_genres'] && this.filters['with_genres'].split(',');
            
            selected_genres = _.map(selected_genres, Number);
            _.each(genres, genre => { genre['isActive'] = selected_genres.indexOf(genre.id) >= 0; });

            return {
                id: 'genre'
            ,   label: 'Genres'
            ,   show: genres && genres.length
            ,   href: "with_genres"
            ,   count: selected_genres.length
            ,   values: genres
            }
        }

    ,   templateContext: function(){
            return{
                genreFilter: this.getGenreFilter()
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