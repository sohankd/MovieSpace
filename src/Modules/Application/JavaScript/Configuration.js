define('Configuration'
,   [ ]
,   function()
{
    'use strict';
    
    
    var Configuration = {};

    Configuration.tmdb = {};
    Configuration.tmdb['api_key'] = '826d017b9689b5fe09b83551e04086e0';
    Configuration.tmdb['auth_key'] = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjZkMDE3Yjk2ODliNWZlMDliODM1NTFlMDQwODZlMCIsInN1YiI6IjVkYTFmZmQxYWZlMjI0MDAxNWU5ODgzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6DF8Il0JQPxDF26_jNOv2hy4R_svxK_Q0FTX2bix3Os';
    Configuration.tmdb['base_uri'] = 'https://api.themoviedb.org/3/';
    Configuration.tmdb['append_to_response'] = '';

    return Configuration;

});