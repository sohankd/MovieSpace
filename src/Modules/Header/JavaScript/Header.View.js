define('Header.View',
    [
        'Marionette'
    ,   'Header.Search.View'
    ,   'Search.Model'
    ,   'text!src/Modules/Header/Template/header.hbs'
    ,   'jquery'
    ]
,   function
    (
        Marionette
    ,   HeaderSearchView
    ,   SearchModel
    ,   header_tpl
    ,   jQuery
    )
{
    'use strict';
    
    return Marionette.View.extend({

        template: header_tpl

    ,   tagName: 'nav'
    
    ,   events: {
            'click [data-toggle="collapse"]': 'collapseSubmenus'
        ,   'click [data-toggle="push"]': 'togglePushPanel'
        ,   'input [name="search-bar"]': 'searchHandler'
        ,   'click .input-reset-button': 'resetButtonHandler'
        }
    
    ,   regions: {
            'Search.View': '[data-view="Search.View"]'
        }

    ,   initialize: function(){
            this.model = new SearchModel();
            var _this = this;

            jQuery(document).on('mousedown keydown blur',function(e){
                if(jQuery(e.target).closest('.search-result-wrapper.open').length)
                    return;
                if(jQuery(e.target).hasClass('.search-result-wrapper.open'))
                    return;
                _this.destroySearchView();
            });
        }

    ,   childViews: {
            'Search.View': function(){
                return new HeaderSearchView({
                    application: this.getOption('application')
                ,   model: this.model
                ,   isLoading: this.isLoading
                ,   showPopup: this.showPopup
                })
            }
        }

    ,   togglePushPanel: function(e){
            var $el = this.$(e.currentTarget)
            ,   $target = this.$($el.data('target'))
            ,   $related_els = this.$('[data-target="'+$el.data('target')+'"]')
            ,   layout = this.getOption('application').getLayout();
            
            if($target.hasClass('open')){
                $el.removeClass('pushed');
                $related_els.removeClass('pushed');
                $target.removeClass('open');
                layout.toggleOverlay(e,true);
            }
            else{
                $el.addClass('pushed');
                $related_els.addClass('pushed');
                $target.addClass('open');
                layout.toggleOverlay(e,false);
            }
        }
        
    ,   searchHandler: function(e){
            var $el = this.$(e.target)
            ,   query = $el.val()
            ,   _this = this;

            query ? this.$('.input-reset-button').addClass('show') : this.$('.input-reset-button').removeClass('show');

            if(query && query.length >= 2){
                this.model.clear();
                this.isLoading = true;
                this.showPopup = true;
                this.isLoading ? this.renderChildView('Search.View') : (void 0);
                
                if(this.prev_request){
                    this.prev_request.abort();
                }
                this.prev_request = this.model.fetch({
                    data: { query: query }
                ,   success: function(){
                        _this.isLoading = false;
                        _this.renderChildView('Search.View');
                    }
                });
            }
        }

    ,   resetButtonHandler: function(e){
            this.$(e.currentTarget).removeClass('show');
        }

    ,   destroySearchView: function(){
            var view = this.getChildView('Search.View');
            view && view.destroy && view.destroy();
        }
    });
});