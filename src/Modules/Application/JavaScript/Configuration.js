define('Configuration'
,   [ ]
,   function()
{
    'use strict';
    
    
    var Configuration = {};

    Configuration.tmdb = {
        "api_key": "826d017b9689b5fe09b83551e04086e0",
        "auth_key": "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjZkMDE3Yjk2ODliNWZlMDliODM1NTFlMDQwODZlMCIsInN1YiI6IjVkYTFmZmQxYWZlMjI0MDAxNWU5ODgzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6DF8Il0JQPxDF26_jNOv2hy4R_svxK_Q0FTX2bix3Os",
        "append_to_response": "",
        "base_uri": "https://api.themoviedb.org/3/",
        "commons": {
            "alttitles": "alternative_titles",
            "changes": "changes",
            "credits": "credits",
            "enddate": "end_date",
            "images": "images",
            "keywords": "keywords",
            "latest": "latest",
            "page": "page",
            "popular": "popular",
            "recommended": "recommendations",
            "releasedates": "release_dates",
            "reviews": "reviews",
            "similar": "similar",
            "startdate": "start_date",
            "toprated": "top_rated",
            "trending": "trending",
            "upcoming": "upcoming",
            "videos": "videos"
        },
        "config_url": "configuration",
        "discover": "discover",
        "find": "find",
        "movie": {
            "url": "movie",
            "keys": {
                "nowplaying": "now_playing"
            }
        },
        "people": {
            "url": "person",
            "keys": {
                "combinecredit": "combined_credits",
                "moviecredits": "movie_credits",
                "taggedimages": "tagged_images",
                "tvcredits": "tv_credits"
            }
        },
        "search": "search",
        "tv": {
            "url": "tv",
            "keys": {
                "airtoday": "airing_today",
                "contentratings": "content_ratings",
                "episode": "episode",
                "episodegroup": "episode_group",
                "episodegroups": "episode_groups",
                "onair": "on_the_air",
                "screenedtheatrically": "screened_theatrically",
                "season": "season"
            }
        }
    };
        
    return Configuration;

});