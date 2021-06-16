define('Global.SortBy.View'
,   [
        'text!src/Modules/GlobalViews/Template/global_sort_by_view.hbs'
    ,   'Marionette'
    ,   'Url'
    ,   'underscore'
    ]
,   function(
        global_sort_by_view_tpl
    ,   Marionette
    ,   UrlParse
    ,   _
    ){
    'use strict';
    
    return Marionette.View.extend({
        template: global_sort_by_view_tpl

    ,   className: 'global-sortBy-options-main-container'

    ,   order: 'desc'
    
    ,   sortOptions: [
            {
                id: 'vote_average'
            ,   label: 'Sort By Avg. Rating'
            ,   isActive: false
            },
            {
                id: 'popularity'
            ,   label: 'Sort By Popularity'
            ,   isActive: true
            }
        ]

    ,   events: {
            'click [data-action="updateSorting"]': 'sortByHandler'
        ,   'change [data-action="changeSortOrder"]': 'sortByHandler'
        }

    ,   initialize: function(){
            var url = new UrlParse(location.href)
            ,   param = url.getParam('sort_by')
            ,   sortById;

            param = (param && param.split('.')) || []
            sortById = param[0];
            this.order = param[1] || 'desc';
            sortById && _.each(this.sortOptions, sortOption => { sortOption['isActive'] = (sortById == sortOption['id']) });
        }

    ,   sortByHandler: _.debounce(function(e){
            var sortById
            ,   url = new UrlParse(location.href)
            ,   shouldRedirect = true;

            if(e.currentTarget.nodeName == "LI"){
                sortById = this.$(e.currentTarget).data('value');
                _.each(this.sortOptions, sortOption => {
                    sortById == sortOption['id'] && (sortOption['isActive'] ? (shouldRedirect = false) : (sortOption['isActive'] = true));
                });
            }
            else if(e.currentTarget.nodeName == "INPUT"){
                this.order = this.$(e.currentTarget).is(':checked') ? 'desc' : 'asc';
                sortById = _.findWhere(this.sortOptions, {isActive: true}).id;
            }
            if(shouldRedirect){
                url.removeParams('page', true);
                url = url.setParam('sort_by', sortById + '.' + this.order);
                Backbone.history.navigate(url.getFragment(), true);
            }
            
        }, 500)

    ,   templateContext: function(){
            return {
                sortByOptions: this.sortOptions
            ,   isDesc: this.order == "desc"
            };
        }
    });
});