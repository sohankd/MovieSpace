define('Application',
    [
        'Application.Starter.Entrypoints'
    ,   'Layout.View'
    ,   'Configuration'
    ,   'backbone'
    ,   'Marionette'
    ,   'underscore'
    ]
,   function
    (
        ApplicationStarter
    ,   Layout
    ,   Configuration
    ,   Backbone
    ,   Marionette
    ,   _
    )
{
    'use strict';
    
    return Marionette.Application.extend({

        region: '#root'
        
    ,   layout: null

    ,   onBeforeStart(application,options)
        {
            ApplicationStarter(application);
            window.Application = application;
            this.fetchConfig();
        }

    ,   onStart(application,options)
        {
            Backbone.history.start({
                pushState: ('history' in window && 'pushState' in history ? true : false)
            });
            
            this.layout = this.getLayout();
            this.showView(this.layout);
        }

    ,   getLayout: function(){
            return this.layout ? this.layout : ( this.layout = new Layout({application:this}) );
        }

    ,   fetchConfig: function(){
            var url = Configuration.tmdb['base_uri'] + 'configuration';
            Backbone.ajax({
                url: url,
                headers: {
                    'Authorization': `Bearer ${Configuration.tmdb['auth_key']}`
                },
                success: function(data){
                    _.extend(Configuration.tmdb,data);
                }
            });
        }
    })

});