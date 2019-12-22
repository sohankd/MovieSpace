define('Application',
    [
        'Application.Starter.Entrypoints'
    ,   'Layout.View'
    ,   'backbone'
    ,   'Marionette'
    ]
,   function
    (
        ApplicationStarter
    ,   Layout
    ,   Backbone
    ,   Marionette
    )
{
    'use strict';
    
    return Marionette.Application.extend({

        region: '#root'
        
    ,   layout: null

    ,   initialize()
        {
            
        }

    ,   onBeforeStart(application,options)
        {
            ApplicationStarter(application);
        }

    ,   onStart(application,options)
        {
            Backbone.history.start();
            
            this.layout = this.getLayout();
            this.showView(this.layout);
        }

    ,   getLayout: function(){
            return this.layout ? this.layout : ( this.layout = new Layout({application:this}) );
        }
    })

});