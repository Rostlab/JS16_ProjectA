module.exports = {
    searchTwitter: function (req, res) {
        var twitter = require('twitter');
        var config = require('./cfg/config');
        var keywords = req.params.byKeywords;

        var client = new twitter({
            consumer_key: config.twitter.consumer_key,
            consumer_secret: config.twitter.consumer_secret,
            access_token_key: config.twitter.access_token_key,
            access_token_secret: config.twitter.access_token_secret
        });

        client.stream('statuses/filter', {track: keywords}, function (stream) {
            stream.on('data', function (tweet) {
                console.log(tweet.text);
                //res.render(tweet.txt);
                res.status(200).json(tweet)
            });
            stream.on('error', function (error) {
                throw error;
            });
        });
    }
};