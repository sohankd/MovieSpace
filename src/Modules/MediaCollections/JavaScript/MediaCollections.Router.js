define('MediaCollections.Router'
,   [
        'Genre.Model'
    ,   'Media.Collection'
    ,   'MediaCollections.View'
    ,   'backbone'
    ,   'jquery'
    ]
,   function(
        GenreModel
    ,   MediaCollection
    ,   MediaCollectionsView
    ,   Backbone
    ,   jQuery
    ) {
        
    'use strict';
    
    return Backbone.Router.extend({
        routes: {
            'movie': 'showMovieList'
        ,   'tv': 'showTvList'
        ,   'movie?*query': 'showMovieList'
        ,   'tv?*query': 'showTvList'
        }

    ,   initialize: function(options) {
            this.application = options && options.application;
        }

    ,   showListPage: function(collection, type) {
            var genres = new GenreModel(null, {path: type ? type+'/list' : '' })
            ,   view = new MediaCollectionsView({
                    application: this.application
                ,   genres: genres
                ,   collection: collection
                ,   type: type
            });

            jQuery.when(
                genres.fetch(),
                collection.fetch()
            )
            .done(function(){
                view.showContent();
            });
        }

    ,   showMovieList: function(query) {
            var collection = new MediaCollection();
            collection.setUrl(`movie${query ? '?' + query : ''}`);
            this.showListPage(collection, 'movie')
        }
    
    ,   showTvList: function(query) {
            var collection = new MediaCollection();
            collection.setUrl(`tv${query ? '?' + query : ''}`);
            this.showListPage(collection, 'tv')
        }
    })
});