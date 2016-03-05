module.exports = {
    /**
     * @api {post} /api/search/twitter/:byKeywords/:tweetCount
     * @apiVersion 0.0.1
     * @apiName Twitter Stream
     * @apiDescription Show a live stream from Twitter
     * @apiGroup Twitter
     *
     * @apiHeaderExample {json} Header-Example
     * { 
     *   "Connection": keep-alive,
     *   "Content-Length": 12707,
     *   "Content-Type": application/json; charset=utf-8,
     *   "Date": Sat, 05 Mar 2016 16:47:09 GMT,
     *   "ETag": W/"31a3-Mu/XIt21JlHPYa6ez8FJzw",
     *   "X-Powered-By": Express
     * }
     *
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     * {
     *  "created_at": "Sun Feb 28 12:36:11 +0000 2016",
     *  "id": 703921638534942700,
     *  "id_str": "703921638534942720",
     *  "text": "RT @wwwbigbaldhead: 🐲 awesome! Game of thrones ❤️",
     *  "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
     *  "truncated": false,
     *  "in_reply_to_status_id": null,
     *  "in_reply_to_status_id_str": null,
     *  "in_reply_to_user_id": null,
     *  "in_reply_to_user_id_str": null,
     *  "in_reply_to_screen_name": null,
     *  "user": {
     *    "id": 465690696,
     *    "id_str": "465690696",
     *    "name": "Esposa do Hugh",
     *    "screen_name": "ev3ryb0dy_lies",
     *    "location": "São Bernardo do Campo / SP",
     *    "url": "http://instagram.com/pipocadaleitura",
     *    "description": "Só reclamo nesse site.\nE sou fãzoca.",
     *    "protected": false,
     *    "verified": false,
     *    "followers_count": 232,
     *    "friends_count": 672,
     *    "listed_count": 1,
     *    "favourites_count": 1886,
     *    "statuses_count": 18998,
     *    "created_at": "Mon Jan 16 16:48:40 +0000 2012",
     *    "utc_offset": -10800,
     *    "time_zone": "Brasilia",
     *    "geo_enabled": true,
     *    "lang": "pt",
     *    "contributors_enabled": false,
     *    "is_translator": false,
     *    "profile_background_color": "FFDEAD",
     *    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/462210291963424769/O2bB94Ie.jpeg",
     *    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/462210291963424769/O2bB94Ie.jpeg",
     *    "profile_background_tile": false,
     *    "profile_link_color": "FF7F24",
     *    "profile_sidebar_border_color": "FFFFFF",
     *    "profile_sidebar_fill_color": "DDFFCC",
     *    "profile_text_color": "333333",
     *    "profile_use_background_image": false,
     *    "profile_image_url": "http://pbs.twimg.com/profile_images/698829678749081600/DFeBfqxs_normal.jpg",
     *    "profile_image_url_https": "https://pbs.twimg.com/profile_images/698829678749081600/DFeBfqxs_normal.jpg",
     *    "profile_banner_url": "https://pbs.twimg.com/profile_banners/465690696/1450536268",
     *    "default_profile": false,
     *    "default_profile_image": false,
     *    "following": null,
     *    "follow_request_sent": null,
     *    "notifications": null
     *  },
     *  "geo": null,
     *  "coordinates": null,
     *  "place": null,
     *  "contributors": null,
     *  "retweeted_status": {
     *    "created_at": "Mon Jun 08 02:08:58 +0000 2015",
     *    "id": 607731007974965200,
     *    "id_str": "607731007974965248",
     *    "text": "🐲 awesome! Game of thrones ❤️",
     *    "source": "<a href=\"http://tapbots.com/tweetbot\" rel=\"nofollow\">Tweetbot for iΟS</a>",
     *    "truncated": false,
     *    "in_reply_to_status_id": null,
     *    "in_reply_to_status_id_str": null,
     *    "in_reply_to_user_id": null,
     *    "in_reply_to_user_id_str": null,
     *    "in_reply_to_screen_name": null,
     *    "user": {
     *      "id": 25460615,
     *      "id_str": "25460615",
     *      "name": "norman reedus",
     *      "screen_name": "wwwbigbaldhead",
     *      "location": "nyc",
     *      "url": "http://www.bigbaldhead.com",
     *      "description": "http://www.bigbaldhead.com",
     *      "protected": false,
     *      "verified": true,
     *      "followers_count": 2548484,
     *      "friends_count": 10207,
     *      "listed_count": 8612,
     *      "favourites_count": 6,
     *      "statuses_count": 10201,
     *      "created_at": "Fri Mar 20 04:33:46 +0000 2009",
     *      "utc_offset": -18000,
     *      "time_zone": "Eastern Time (US & Canada)",
     *      "geo_enabled": true,
     *      "lang": "en",
     *      "contributors_enabled": false,
     *      "is_translator": false,
     *      "profile_background_color": "1A1B1F",
     *      "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/167393273/IMG_0002.JPG",
     *      "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/167393273/IMG_0002.JPG",
     *      "profile_background_tile": false,
     *      "profile_link_color": "9266CC",
     *      "profile_sidebar_border_color": "181A1E",
     *      "profile_sidebar_fill_color": "252429",
     *      "profile_text_color": "666666",
     *      "profile_use_background_image": true,
     *      "profile_image_url": "http://pbs.twimg.com/profile_images/1818543354/0a7c229f-8669-408b-b0a5-6c8b99f90749_normal.png",
     *      "profile_image_url_https": "https://pbs.twimg.com/profile_images/1818543354/0a7c229f-8669-408b-b0a5-6c8b99f90749_normal.png",
     *      "profile_banner_url": "https://pbs.twimg.com/profile_banners/25460615/1430769557",
     *      "default_profile": false,
     *      "default_profile_image": false,
     *      "following": null,
     *      "follow_request_sent": null,
     *      "notifications": null
     *    },
     *    "geo": null,
     *    "coordinates": null,
     *    "place": null,
     *    "contributors": null,
     *    "is_quote_status": false,
     *    "retweet_count": 2381,
     *    "favorite_count": 5099,
     *    "entities": {
     *      "hashtags": [],
     *      "urls": [],
     *      "user_mentions": [],
     *      "symbols": []
     *    },
     *    "favorited": false,
     *    "retweeted": false,
     *    "filter_level": "low",
     *    "lang": "en"
     *  },
     *  "is_quote_status": false,
     *  "retweet_count": 0,
     *  "favorite_count": 0,
     *  "entities": {
     *    "hashtags": [],
     *    "urls": [],
     *    "user_mentions": [
     *      {
     *        "screen_name": "wwwbigbaldhead",
     *        "name": "norman reedus",
     *        "id": 25460615,
     *        "id_str": "25460615",
     *        "indices": [
     *          3,
     *          18
     *        ]
     *      }
     *    ],
     *    "symbols": []
     *  },
     *  "favorited": false,
     *  "retweeted": false,
     *  "filter_level": "low",
     *  "lang": "en",
     *  "timestamp_ms": "1456662971515"
     * }
     *
     * @apiError (400) Bad request
     * @apiErrorExample {json} Bad Request
     *     HTTP/1.1 400
     *     {
     *          "message": "Error.",
     *          "error": error
     *     }
     *
     */
    searchTwitter: function (req, res) {
        var Twitter = require('twitter');
        var config = require(__base + 'cfg/config.json');
        var keywords = req.params.byKeywords;
        var count = req.params.tweetCount;
        var tweetsArray = new Array();

        var client = new Twitter({
            consumer_key: config.twitter.consumer_key,
            consumer_secret: config.twitter.consumer_secret,
            access_token_key: config.twitter.access_token_key,
            access_token_secret: config.twitter.access_token_secret
        });

        client.stream('statuses/filter', {track: keywords}, function (stream) {
            stream.on('data', function (tweet) {
                console.log(tweet.text);
                tweetsArray.push(tweet);
                if (tweetsArray.length >= count) {
                    stream.destroy();
                    res.status(200).json(tweetsArray);
                };
            });
            stream.on('error', function (error) {
                res.status(400).json({ message: 'Error.', error: error });
            });
        });
    }
};