define(
    [
        'Marionette'
    ,   'backbone'
    ,   "ImageLoader"
    ,   'Handlebars'
    ,   'underscore'
    ]
,   function
    (
        Marionette
    ,   Backbone
    ,   ImageLoader
    ,   Handlebars
    ,   _
    )
{
    'use strict';
    
    _.extend(Marionette.View.prototype,{
        // @override _renderHtml
        _renderHtml: _.wrap(Marionette.View.prototype._renderHtml, function(fn){
            // Returned template string after compiling template with view's context and data. 
            var tpl_string = fn.apply(this, _.toArray(arguments).slice(1));
            return ImageLoader.getLazyloadTemplate(tpl_string);
        })

    ,   render: _.wrap(Marionette.View.prototype.render,function(fn) {
            _.bind(fn,this)(); //binds current views 'this' object to render function of Marionette.view  
            this.showChildViews();  //shows all child views declared in childViews object of a view.
            ImageLoader.lazyLoad.apply(this); //This will initiate lazyloading for every view.
        })

    ,   showChildViews: function() {
            if(!_.isEmpty(this.childViews)) {
                var cViews = Object.entries(this.childViews);

                _.each(cViews || [], (kvPair) => {
                    let [region_name,viewFunc] = kvPair;

                    if( this.getValidRegion(region_name) ) {
                        var region = this.getValidRegion(region_name)
                        ,   view = _.isFunction(viewFunc) && viewFunc.call(this);
                        
                        if( this.isView(view) ) {
                            this.showChildView(region,view);
                        }
                        else
                            throw new Error('view is not a constructor/function.')
                    }
                    else
                        console.warn(region+' :No such region exists.');
                },this);
            }
        }

    ,   isView: function(view) {
            return (view instanceof Backbone.View || view instanceof Marionette.View || view instanceof Marionette.CollectionView);
        }

    ,   getValidRegion: function(region) {
            if(region && region instanceof Marionette.Region) {
                return region.get('_name');
            }
            else if(region) {
                var _region = this.getRegion(region);
                return _region instanceof Marionette.Region ? _region._name : undefined;
            }
            return ;
        }

    ,   showContent: function() {
            var application = this.options && this.options.application
            ,   layout = application && application.getLayout();

            if( layout ) {
                var mainRegion = application.layout.getRegion('content');
                if( mainRegion) {
                    mainRegion.hasView() ? this.triggerMethod('before:empty') : (void 0);
                    mainRegion.empty();
                    layout.showChildView('content',this);
                }
            }
        }

    ,   showNotification: function() {
            var application = this.options && this.options.application
            ,   layout = application && application.getLayout();

            if( layout ) {
                var mainRegion = application.layout.getRegion('notification');
                if(mainRegion) {
                    mainRegion.hasView() ? this.triggerMethod('before:empty') : (void 0);
                    mainRegion.empty();
                    layout.showChildView('notification',this);
                }
            }
        }

    ,   renderChildView: function(region_name){
            var child_view_constructor = this.childViews[region_name]
            this.getRegion(region_name) && this.getRegion(region_name).empty();
            this.showChildView(region_name,child_view_constructor.call(this))
        }

    ,   renderChildViews: function(){
            var _this = this
            ,   regions = _.keys(this.getRegions || {});
            _.each(regions,function(region){
                _this.renderChildView(region);
            });
        }
    });
    
    _.extend(Marionette.CollectionView.prototype,{
        showContent: Marionette.View.prototype.showContent
    });

});