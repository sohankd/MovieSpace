define('Utils',
    [ 'underscore' ],
    function( _ ) {

    'use strict';
    
    return {
      
        setUrlParams: function(url,params){
            if(url){
                var baseUrl = url.indexOf('?') != -1 ? url.substring(0,url.indexOf('?')) : url
                ,   parameters = url.indexOf('?') != -1 ? url.substring(url.indexOf('?'),url.length) : '';
                
                if(params && !_.isEmpty(params)){
                    var entries = _.pairs(params);
                    var href_params = _.map(entries, ([key,val]) => key+'='+val );
                    
                    return (href_params.length > 1) ? (baseUrl+ '?' + href_params.join('&')) : (baseUrl+ '?' + href_params);
                }
                return baseUrl;
            }
        }
    ,   appendToUrl: function(url,paths,keepParams){
            if(url && typeof url == 'string'){
                var baseUrl = url.indexOf('?') != -1 ? url.substring(0,url.indexOf('?')) : url
                ,   parameters = url.indexOf('?') != -1 ? url.substring(url.indexOf('?'),url.length) : '';
                
                if(paths && _.isArray(paths)){
                    var joined_path = paths.length > 1 ? paths.join('/') : paths;
                    baseUrl += (baseUrl.search(/[\/]$/g) == -1 ? ('/' + joined_path) : joined_path);
                    return keepParams == true ? baseUrl + parameters : baseUrl;
                }
                else if(paths && typeof paths == 'string'){
                    baseUrl += (baseUrl.search(/[\/]$/g) == -1 ? ('/' + paths) : paths);
                    return keepParams == true ? baseUrl + parameters : baseUrl;
                }
                return baseUrl;
            }
        }
    };
});