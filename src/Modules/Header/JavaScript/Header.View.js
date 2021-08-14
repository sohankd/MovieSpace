define('Header.View',
    [
        'Marionette'
    ,   'Header.Search.View'
    ,   'Search.Collection'
    ,   'backbone'
    ,   'header.hbs'
    ,   'jquery'
    ,   'Utils'
    ]
,   function
    (
        Marionette
    ,   HeaderSearchView
    ,   SearchCollection
    ,   Backbone
    ,   header_tpl
    ,   jQuery
    ,   Utils
    )
{
    'use strict';
    
    return Marionette.View.extend({

        template: header_tpl

    ,   tagName: 'nav'
    
    ,   events: {
            'click [data-toggle="push"]': 'togglePushPanel'
        ,   'input [name="search"]': 'searchHandler'
        ,   'submit #website-search-form': 'formHandler'
        ,   'click .input-reset-button': 'resetButtonHandler'
        }
    
    ,   regions: {
            'Search.View': '[data-view="Search.View"]'
        }

    ,   initialize: function(){
            this.collection = new SearchCollection();
            var _this = this;

            jQuery(document).on('mousedown keydown blur',function(e){
                if(jQuery(e.target).closest('.search-result-wrapper.open').length)
                    return;
                if(jQuery(e.target).hasClass('.search-result-wrapper.open'))
                    return;
                _this.destroySearchView();
            });
            // Close the push-panel on view update.
            Backbone.on('pathchange', function(){
                this.togglePushPanel(null, true);
            }, this);
        }

    ,   childViews: {
            'Search.View': function(){
                return new HeaderSearchView({
                    application: this.getOption('application')
                ,   collection: this.collection
                ,   isLoading: this.isLoading
                ,   showPopup: this.showPopup
                ,   query: this.query
                })
            }
        }

    ,   togglePushPanel: function(e, doHide){
            var $el = doHide == true ? this.$('[data-toggle="push"]') : this.$(e.currentTarget)
            ,   $target = this.$($el.data('target'))
            ,   $related_els = this.$('[data-target="'+$el.data('target')+'"]')
            ,   layout = this.getOption('application').getLayout();
            
            if($target.hasClass('open') || doHide == true){
                $el.removeClass('pushed');
                $related_els.removeClass('pushed');
                $target.removeClass('open');
                layout.toggleOverlay(e, true);
            }
            else{
                $el.addClass('pushed');
                $related_els.addClass('pushed');
                $target.addClass('open');
                layout.toggleOverlay(e, false);
            }
        }

    ,   formHandler: function(e){
            e.preventDefault();
            var input = e.target['search']
            ,   query = input.value;
            this.query = query && query.trim();
            if(this.query){
                Backbone.history.navigate(`search?keyword=${encodeURI(this.query)}`, true);
                input.blur();
            }
        }
        
    ,   searchHandler: _.debounce(function(e){
            var $el = this.$(e.target)
            ,   query = $el.val()
            ,   _this = this;

            query ? this.$('.input-reset-button').addClass('show') : this.$('.input-reset-button').removeClass('show');

            if(query && query.length >= 2){
                this.query = query.trim();
                this.collection.reset([]);
                this.isLoading = true;
                this.showPopup = true;
                this.isLoading && this.renderChildView('Search.View');

                this.collection.fetch({
                    data: { query: this.query }
                ,   success: function(){
                        _this.isLoading = false;
                        _this.renderChildView('Search.View');
                    }
                });
            }
        }, 400)

    ,   resetButtonHandler: function(e){
            this.$(e.currentTarget).removeClass('show');
        }

    ,   destroySearchView: function(){
            var view = this.getChildView('Search.View');
            view && view.destroy && view.destroy();
        }

    ,   templateContext: function(){
            return{
                isMobile: Utils.getDeviceType() == "Mobile"
            };
        }
    });
});