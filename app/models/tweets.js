var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TwitterSchema = new Schema({
    created_at: String,                                                            //"Fri Feb 26 21:38:17 +0000 2016",
    id: {type: Number},                                                            //703333285708087296,
    id_str: String,                                                                //"703333285708087296",
    text: String,                                                                  //"Jon Snow Begs George to \u2018Kill Someone Else\u2019 in Funny Game of Thrones Tribute Music Video  https:\/\/t.co\/f2NHcADaKp https:\/\/t.co\/GOl3RGwPd7",
    source: String,                                                                //"\u003ca href=\"http:\/\/epicstream.com\/\" rel=\"nofollow\"\u003eEpicstream\u003c\/a\u003e",
    truncated: Boolean,                                                            //false,
    in_reply_to_status_id: {type: Number},                                         //null,
    in_reply_to_status_id_str: String,                                             //null,
    in_reply_to_user_id: {type: Number},                                           //null,
    in_reply_to_user_id_str: String,                                               //null,
    in_reply_to_screen_name: String,                                               //null,
    user: {
        id: {type: Number},                                                        //3028465366,
        id_str: String,                                                            //"3028465366",
        name: String,                                                              //"Epicstream",
        screen_name: String,                                                       //"FantasyandScifi",
        location: String,                                                          //null,
        url: String,                                                               //"http:\/\/www.epicstream.com",
        description: String,                                                       //"http:\/\/Epicstream.com is an independent Fantasy and Science Fiction news & entertainment website.",
        protected: Boolean,                                                        //false,
        verified: Boolean,                                                         //false,
        followers_count: {type: Number},                                           //2471,
        friends_count: {type: Number},                                             //2222,
        listed_count: {type: Number},                                              //62,
        favourites_count: {type: Number},                                          //13,
        statuses_count: {type: Number},                                            //3057,
        created_at: String,                                                        //"Tue Feb 10 17:21:55 +0000 2015",
        utc_offset: {type: Number},                                                //null,
        time_zone: {type: Number},                                                 //null,
        geo_enabled: Boolean,                                                      //false,
        lang: String,                                                              //"en",
        contributors_enabled: Boolean,                                             //false,
        is_translator: Boolean,                                                    //false,
        profile_background_color: String,                                          //"000000",
        profile_background_image_url: String,                                      //"http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
        profile_background_image_url_https: String,                                //"https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
        profile_background_tile: Boolean,                                          //false,
        profile_link_color: String,                                                //"6BCAEB",
        profile_sidebar_border_color: String,                                      //"000000",
        profile_sidebar_fill_color: String,                                        //"000000",
        profile_text_color: String,                                                //"000000",
        profile_use_background_image: Boolean,                                     //false,
        profile_image_url: String,                                                 //"http:\/\/pbs.twimg.com\/profile_images\/609150758030716928\/yu0fRJtN_normal.png",
        profile_image_url_https: String,                                           //"https:\/\/pbs.twimg.com\/profile_images\/609150758030716928\/yu0fRJtN_normal.png",
        profile_banner_url: String,                                                //"https:\/\/pbs.twimg.com\/profile_banners\/3028465366\/1433994549",
        default_profile: Boolean,                                                  //false,
        default_profile_image: Boolean,                                            //false,
        following: null,                                                           //null,
        follow_request_sent: null,                                                 //null,
        notifications: null                                                        //null
    },
    geo: null,                                                                     //null,
    coordinates: null,                                                             //null,
    place: null,                                                                   //null,
    contributors: null,                                                            //null,
    is_quote_status: Boolean,                                                      //false,
    retweet_count: {type: Number},                                                 //0,
    favorite_count: {type: Number},                                                //0,
    entities: { 
        hashtags: [],
        urls: [
            {
                url: String,                                                       //"https:\/\/t.co\/f2NHcADaKp",
                expanded_url: String,                                              //"http:\/\/epicstream.com\/videos\/Jon-Snow-Begs-George-to-Kill-Someone-Else-in-Funny-Game-of-Thrones-Tribute-Music-Video",
                display_url: String,                                               //"epicstream.com\/videos\/Jon-Sno\u2026",
                indices: [Number]
            }
        ],
        user_mentions: [],
        symbols: [],
        media: [
            {
                id: {type: Number},                                                 //703333285569683456,
                id_str: String,                                                       //"703333285569683456",
                indices: [Number],
                media_url: String,                                                    //"http:\/\/pbs.twimg.com\/media\/CcK95ZUW4AAp2au.jpg",
                media_url_https: String,                                              //"https:\/\/pbs.twimg.com\/media\/CcK95ZUW4AAp2au.jpg",
                url: String,                                                          //"https:\/\/t.co\/GOl3RGwPd7",
                display_url: String,                                                   //"pic.twitter.com\/GOl3RGwPd7",
                expanded_url: String,                                                 //"http:\/\/twitter.com\/FantasyandScifi\/status\/703333285708087296\/photo\/1",
                type: String,                                                         //"photo",
                sizes: {
                    large: {
                        w: {type: Number},                                            //1024,
                        h: {type: Number},                                            //512,
                        resize: String                                                  //"fit"
                    },
                    thumb: {
                        w: {type: Number},                                            //150,
                        h: {type: Number},                                            //150,
                        resize: String                                                  //"crop"
                    },
                    medium: {
                        w: {type: Number},                                            //600,
                        h: {type: Number},                                            //300,
                        resize: String                                                  //"fit"
                    },
                    small: {
                        w: {type: Number},                                            //340,
                        h: {type: Number},                                            //170,
                        resize: String                                                  //"fit"
                    }
                }
            }
        ]
    },
    extended_entities: {
        media: [
            {
                id: {type: Number},                                                 //703333285569683456,
                id_str: String,                                                       //"703333285569683456",
                indices: [Number],
                media_url: String,                                                    //"http:\/\/pbs.twimg.com\/media\/CcK95ZUW4AAp2au.jpg",
                media_url_https: String,                                              //"https:\/\/pbs.twimg.com\/media\/CcK95ZUW4AAp2au.jpg",
                url: String,                                                          //"https:\/\/t.co\/GOl3RGwPd7",
                display_url: String,                                                  //"pic.twitter.com\/GOl3RGwPd7",
                expanded_url: String,                                                 //"http:\/\/twitter.com\/FantasyandScifi\/status\/703333285708087296\/photo\/1",
                type: String,                                                         //"photo",
                sizes: {
                    large: {
                        w: {type: Number},                                             //1024,
                        h: {type: Number},                                             //512,
                        resize: String                                                  //"fit"
                    },
                    thumb: {
                        w: {type: Number},                                            //150,
                        h: {type: Number},                                            //150,
                        resize: String                                                  //"crop"
                    },
                    medium: {
                        w: {type: Number},                                            //600,
                        h: {type: Number},                                            //300,
                        resize: String                                                  //"fit"
                    },
                    small: {
                        w: {type: Number},                                            //340,
                        h: {type: Number},                                            //170,
                        resize: String                                                  //"fit"
                    }
                }
            }
        ]
    },
    favorited: Boolean,                                                            //false,
    retweeted: Boolean,                                                            //false,
    possibly_sensitive: Boolean,                                                   //false,
    filter_level: String,                                                          //"low",
    lang: String,                                                                  //"en",
    timestamp_ms: String                                                           //"1456522697270"

});

module.exports = mongoose.model('Tweets', TweetsSchema);
