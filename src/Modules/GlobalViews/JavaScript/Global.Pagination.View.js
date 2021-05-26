define('Global.Pagination.View'
,   [
        'text!src/Modules/GlobalViews/Template/global_pagination.hbs'
    ,   'Url'
    ,   'Marionette'
    ]
,   function
    (
        global_pagination_tpl
    ,   UrlParse
    ,   Marionette
    )
{
    'use strict';

    return Marionette.View.extend({
        className: 'global-pagination-container'

    ,   template: global_pagination_tpl
        
    ,   templateContext: function() {
            var url = new UrlParse(location.href)
            ,   current_page = this.getOption('currentPage') || parseInt(url.getParam('page')) || 1
            ,   total_pages = this.getOption('totalPages') || 0
            ,   total_results = this.getOption('totalResults') || 0
            ,   use_load_btn = this.getOption('useLoadButton') || false
            ,   showEndPageLinks = this.getOption('showEndPageLinks') || true
            ,   pages = []
            ,   steps = current_page == 1 || current_page == total_pages ? 2 : 1;

            if(!use_load_btn) {
                var page_start_index = current_page > steps ? current_page - steps : 1
                ,   pages_remain = total_pages - current_page
                ,   page_last_index = pages_remain > steps ? current_page + steps : total_pages;

                for(var i = 1; i <= total_pages; i++){
                    pages.push({
                        page: i
                    ,   text:i
                    ,   isActive: current_page == i
                    ,   href: url.setParam('page', i).getFragment()
                    ,   isFirstPage: showEndPageLinks && (i == 1 && page_start_index != 1)
                    ,   isLastPage: showEndPageLinks && (i == total_pages && page_last_index != total_pages)
                    });
                    if(page_last_index !== total_pages && i == page_last_index)
                        i = total_pages - 1;
                    else if(i == 1 && i != page_start_index)
                        i = page_start_index - 1;
                    else if(i == total_pages)
                        url.removeParams('page', true);
                }
            }
            
            return {
                current_page: current_page
            ,   total_pages: total_pages
            ,   total_results: total_results
            ,   use_load_btn: use_load_btn
            ,   pages: pages
            ,   showLoadMoreButton: current_page != total_pages
            ,   showPagination: total_pages > 1
            }
        }
    });
});