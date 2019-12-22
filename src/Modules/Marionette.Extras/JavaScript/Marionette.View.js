define(
    [
        'Marionette'
    ,   'Handlebars'
    ,   'underscore'
    ,   'backbone'
    ]
,   function
    (
        Marionette
    ,   Handlebars
    ,   _
    ,   backbone
    )
{
    'use strict';
    
    _.extend(Marionette.View.prototype,{
        
        childViewInstances: []

    ,   getTemplate: function()
        {
            var compiled_template = this.template;

            if(this.template && !_.isFunction(this.template))
            {
                compiled_template = Handlebars.compile(this.template);
            }
            else if( !this.template.length )
            {
                console.warn('Template doesn\'t have any content');
            }
            return compiled_template;
        }

    ,   render: _.wrap(Marionette.View.prototype.render,function(fn){
            
            _.bind(fn,this)(); //binds current views 'this' object to render function of Marionette.view  
            this.showChildViews();  //shows all child views declared in childViews object of a view.
        })

    ,   showChildViews: function()
        {
            if(!_.isEmpty(this.childViews))
            {
                var cViews = Object.entries(this.childViews);
                
                _.each(cViews || [], (kvPair) => {
                    
                    let [region_name,viewFunc] = kvPair;

                    if( this.getValidRegion(region_name) )
                    {
                        var region = this.getValidRegion(region_name)
                        ,   view = _.isFunction(viewFunc) && this.isView( viewFunc.call(this) ) ? viewFunc.call(this) : undefined;
                        
                        if( view )
                        {
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

    ,   isView: function(view)
        {
            return (view instanceof Backbone.View || view instanceof Marionette.View || view instanceof Marionette.CollectionView);
        }

    ,   getValidRegion: function(region)
        {
            if(region && region instanceof Marionette.Region) 
            {
                return region.get('_name');
            }
            else if(region)
            {
                var _region = this.getRegion(region);
                return _region instanceof Marionette.Region ? _region._name : undefined;
            }
            return ;
        }

    ,   showContent: function()
        {
            var application = this.options && this.options.application
            ,   layout = application && application.getLayout();

            if( layout )
            {
                var mainRegion = application.layout.getRegion('content');
                if( mainRegion)
                {
                    mainRegion.hasView() ? this.triggerMethod('before:empty') : (void 0);
                    mainRegion.empty();
                    layout.triggerMethod('empty');
                    layout.triggerMethod('before:attach');
                    layout.showChildView('content',this);
                    layout.triggerMethod('attach');
                }
            }
        }

    ,   showNotification: function()
        {
            var application = this.options && this.options.application
            ,   layout = application && application.getLayout();

            if( layout )
            {
                var mainRegion = application.layout.getRegion('notification');
                if( mainRegion)
                {
                    mainRegion.hasView() ? this.triggerMethod('before:empty') : (void 0);
                    mainRegion.empty();
                    layout.triggerMethod('empty');
                    layout.triggerMethod('before:attach');
                    layout.showChildView('notification',this);
                    layout.triggerMethod('attach');
                }
            }
        }
    });
    
    _.extend(Marionette.CollectionView.prototype,{
        showContent: Marionette.View.prototype.showContent
    });

});




//  Previous Implementations
/*

,   showChildViews: function()
        {
            if(!_.isEmpty(this.childViews))
            {
                var self = this
                ,   cv_attrs = _.map(this.childViews || [], (cv_attr_fn,key) => _.isFunction(cv_attr_fn) ? cv_attr_fn.call(self) : console.error(new Error(key+' is not a function.')));
                
                _.each(cv_attrs || [], (cv_attr) => {

                    if(cv_attr)
                    {
                        var region = this.getValidRegion(cv_attr.region)
                        ,   options = _.isEmpty(cv_attr.options) ? {} : cv_attr.options
                        ,   view = cv_attr.view && cv_attr.view instanceof Marionette.View ? cv_attr.view : (cv_attr.view ? new cv_attr.view(options) : undefined);
                        
                        region && view ? self.showChildView(region,view,options) : (void 0);
                    }
                });
            }
        }

    ,   getValidRegion: function(region)
        {
            if(region && region instanceof Marionette.Region) 
            {
                return region.get('_name');
            }
            else if(region)
            {
                var _region = this.getRegion(region);
                return _region instanceof Marionette.Region ? _region._name : undefined;
            }
            else{
                console.warn('No region specified for this view.');
            }
            return ;
        }

*/