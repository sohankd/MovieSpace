define('Media.Rating.View'
,   [
        'media_rating.hbs'
    ,   'Marionette'
    ]
,   function
    (
        media_rating_tpl
    ,   Marionette
    )
{
    'use strict';

    return Marionette.View.extend({
        className: 'media-rating-warpper'

    ,   template: media_rating_tpl

    ,   computeGraphParams: function() {
            const MAX_RATING = 100;

            this.max_rating = this.getOption('maxRating') || MAX_RATING;
            this.avg_rating = this.getOption('rating') || 0;
            this.percentage = (this.avg_rating * MAX_RATING/ this.max_rating)
            this.radius = MAX_RATING / (2 * Math.PI);
            this.stroke_offset = 25;
            this.stroke_dash_array = `${this.percentage} ${MAX_RATING - this.percentage}`;
            this.show_text = this.getOption('showText') || true
        }
        
    ,   templateContext: function() {
            this.computeGraphParams();

            return {
                max_rating: this.max_rating
            ,   avg_rating: this.avg_rating
            ,   radius: this.radius
            ,   offset: this.stroke_offset
            ,   segment: this.stroke_dash_array
            ,   show_text: this.show_text
            }
        }
    });    
});