define(
    [
        'Marionette'
    ,   "ImageLoader"
    ,   'Handlebars'
    ,   'underscore'
    ]
,   function
    (
        Marionette
    ,   ImageLoader
    ,   Handlebars
    ,   _
    )
{
    'use strict';
    
    _.extend(Marionette.View.prototype,{
        
        childViewInstances: []

    ,   getTemplate: function() {
            var compiled_template = this.template;

            if(this.template && !_.isFunction(this.template)){
                var template = ImageLoader.getLazyloadTemplate(this.template,this);
                compiled_template = Handlebars.compile(template);
            }
            else if( this.template && this.template.length > 0 )
                console.warn('Template doesn\'t have any content');
            else
                throw new Error('View Doesn\'t have a template.');

            return compiled_template;
        }

    ,   render: _.wrap(Marionette.View.prototype.render,function(fn) {
            _.bind(fn,this)(); //binds current views 'this' object to render function of Marionette.view  
            this.showChildViews();  //shows all child views declared in childViews object of a view.
            ImageLoader.lazyLoad(); //This will initiate lazyloading for every view.
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
                            this.childViewInstances.push(view);
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
    });
    
    _.extend(Marionette.CollectionView.prototype,{
        showContent: Marionette.View.prototype.showContent
    });

});