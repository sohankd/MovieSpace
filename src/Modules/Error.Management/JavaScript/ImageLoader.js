define('ImageLoader'
,   [ 'jquery','underscore' ]
,   function ( jQuery,_ ) {

    'use strict';

    var isElementInViewport = function(el){
        var rect = el instanceof jQuery ? el[0].getBoundingClientRect() : el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
    }
    
,   getLazyloadTemplate = function(tmpl_string){
        if( tmpl_string && tmpl_string != '' ){
            var patt = /<img([^>]*)src="([^"]+)"([^>]*)>/gi
            ,   new_tmpl_string = tmpl_string.replace(patt,function(matched_str,textBefore,url,textAfter){
                
                textBefore = textBefore || '';
                textAfter = textAfter || '';

                return '<img'+textBefore+' data-src="'+url+'" data-image-status="pending"'+textAfter+'>';
            });
            return new_tmpl_string;
        }
    }

,   lazyLoad = function(){
        var lazyImages = [].slice.call(document.querySelectorAll("img[data-image-status='pending']"));

        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.setAttribute('src',lazyImage.dataset.src || '');
                        lazyImage.setAttribute('srcset',lazyImage.dataset.srcset || '');
                        lazyImage.setAttribute('data-image-status','done');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
                lazyImage.onerror = function(){
                    this.setAttribute('src','src/img/no_image.png')
                }
            });
        }
        else {
            _.throttle(function(){
                lazyImages.forEach(function(lazyImage) {
                    if ( isElementInViewport(lazyImage) && getComputedStyle(lazyImage).display !== "none" ) {
                        lazyImage.setAttribute('src',lazyImage.dataset.src || '');
                        lazyImage.setAttribute('srcset',lazyImage.dataset.srcset || '');
                        lazyImage.setAttribute('data-image-status','done');
            
                        lazyImages = lazyImages.filter(function(image) {
                            return image !== lazyImage;
                        });

                        lazyImage.onerror = function(){
                            this.setAttribute('src','src/img/no_image.png')
                        }
                    }
                });
            },200)();
        }
    }

    if (!"IntersectionObserver" in window){
        jQuery(window).on('resize scroll',lazyLoad);
    }

    return {
        isElementInViewport: isElementInViewport
    ,   getLazyloadTemplate: getLazyloadTemplate
    ,   lazyLoad: lazyLoad
    }
    
});