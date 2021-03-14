define('Url'
,   ['underscore']
,   function(_) {
    
    'use strict';
    
    class UrlParse extends URL{

        getAbsolutePath(){
            return `${this.origin + '/' + this.pathname}`;
        }

        getParam(key, wantAll){
            return wantAll ? this.searchParams.getAll(key) : this.searchParams.get(key);
        }

        setParam(key, value){
            this.searchParams.set(key, value);
        }

        removeParams(keys, deleteAll){
            keys = !keys && deleteAll ? this.searchParams.keys() : keys;
            _.isArray(keys)
                ? _.each(keys, function(key){ this.searchParams.delete(key); }, this)
                : this.searchParams.delete(keys);
        }

        getQueryString(){
            return this.searchParams.toString() ? '?' + this.searchParams.toString() : '';
        }

        getQueryParams(){
            var params = {};
            this.searchParams.forEach(function(value, key){
                params[key] = value;
            });
            return params;
        }
    }

    return UrlParse;
});