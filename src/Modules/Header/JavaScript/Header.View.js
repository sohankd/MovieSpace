define('Header.View',
    [
        'Marionette'
    ,   'Categories.Movies.Model'
    ,   'text!src/Modules/Header/Template/header.hbs'
    ,   'jquery'
    ]
,   function
    (
        Marionette
    ,   MovieGenres
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
        }
        
    ,   initialize: function()
        {
            this.model = new MovieGenres();
            this.model.fetch();
            this.model.on('change',this.render,this);
        }

    ,   collapseSubmenus: function(e){
            e.preventDefault();
            var $el = jQuery(e.currentTarget)
            ,   $target_el = $el && $el.length > 0 ? jQuery($el.data('target')) : null;

            if( $target_el ){
                var child_collapsible_els = $target_el.find('.collapse.show');
                if(child_collapsible_els && child_collapsible_els.length > 0)
                    child_collapsible_els.collapse('hide');
            }
        }
    });
});