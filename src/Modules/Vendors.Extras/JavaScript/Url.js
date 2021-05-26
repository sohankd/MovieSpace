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
            return this;
        }

        removeParams(keys, deleteAll){
            keys = !keys && deleteAll ? this.searchParams.keys() : keys;
            _.isArray(keys)
                ? _.each(keys, function(key){ this.searchParams.delete(key); }, this)
                : this.searchParams.delete(keys);
        }

        getQueryString(){
            var decode_query = decodeURIComponent(this.searchParams.toString())
            return decode_query ? '?' + decode_query : '';
        }

        getQueryParams(){
            var params = {};
            this.searchParams.forEach(function(value, key){
                params[key] = value;
            });
            return params;
        }

        getFragment(){
            return this.pathname + this.getQueryString();
        }
    }

    return UrlParse;
});