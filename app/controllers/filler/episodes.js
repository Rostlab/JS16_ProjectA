var Scraper = require(__appbase + 'controllers/scraper');
var Episode = require(__appbase + 'models/episode');
var Episodes = require(__appbase + 'stores/episodes');
var jsonfile = require('jsonfile');
var async = require('async');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var afterInsertion = function()
        {
            var filler = require(__appbase + 'controllers/filler/episodes');
            filler.fillPreAndSuccessor(function(success) {
                console.log('Filling done =).');
            });
        };

        var file = __appbase + '../wikiData/episodes.json';
        var scrape = function(){
            Scraper.scrapToFile(file, Scraper.getEpisodes, function (err, obj) {
                if (err !== null) {
                    console.log(err);
                } else {
                    filler.insertToDb(obj.data,afterInsertion);
                }
            });
        };

        jsonfile.readFile(file, function(err, obj) {
            var filler = require(__appbase + 'controllers/filler/episodes');
            var ttl = require(__appbase + '../cfg/config.json');

            if(obj !== undefined) {
                var cacheAge = ((new Date()) - new Date(obj.createdAt));
                if(cacheAge > ttl.TTLWikiCache) {
                    console.log('Cache file outdated.');
                    scrape();
                } else {
                    console.log('Episodes from cache file "'+file+'". Not scrapped from wiki.');
                    filler.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(req,res) {
        Episode.remove({}, function(err) {
            console.log('Episodes collection removed');
        });
    },
    matchToModel: function(episode) {
        // go through the properties of the house
        for(var z in episode) {
            // ignore references for now, later gather the ids and edit the entries
            if ( z == 'characters' || z == 'predecessor' || z == 'successor' || !Episode.schema.paths.hasOwnProperty(z)) {
                delete episode[z];
            }
            if(z == 'airDate') {
                var date = new Date(Date.parse(episode[z].replace('th','') + ' EDT'));
                if ( Object.prototype.toString.call(date) === "[object Date]" && isNaN( date.getTime() )) {
                    console.log('Could not translate date for airdate:' + episode[z] );
                    delete episode[z];
                }
                else {

                    episode[z] =  date;
                }
            }


            if(z == 'name') {
                episode[z] = episode[z].trim().replace(' (TV)', '');

            }

            // remove spaces and html tags
            if (typeof episode[z] == 'string') {
                episode[z] = episode[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return episode;
    },
    insertToDb: function(episodes, callback) {
        console.log('Inserting into db..');
        var i = 0;

        // iterate through houses
        async.forEach(episodes, function (episode, _callback) {
            var filler = require(__appbase + 'controllers/filler/episodes');
            episode = filler.matchToModel(episode);
            // add house to db
            Episodes.add(episode, function (success, data) {
                if (success != 1) {
                    console.log('Problem:' + data);
                }
                else {
                    console.log('SUCCESS: ' + data.name);
                }
                _callback();
            });
        },
        function (err) {
            callback(true);
        });
    },
    fillPreAndSuccessor: function(callback) {
        console.log('Start filling pre- and successor.');
        Episodes.getAll(function(success,episodes) {
            // foreach episode
            async.forEach(episodes, function (episode, _callback) {
                var pre = episode.totalNr-1,
                    next = episode.totalNr+1;
                if(pre > 0) {
                    Episodes.get({'totalNr': pre},function(success,data) {
                       if(data.length>0)
                       {
                           var preEpisode = data[0];
                           if( preEpisode.name !== undefined) {
                               episode.predecessor = preEpisode.name;
                               episode.save(episode.id,function(err){});
                           }
                       }
                        else {
                           console.log(episode.name + "has no predecessor with totalNr" + pre);
                       }
                    });
                }
                if(next > 0) {
                    Episodes.get({'totalNr': next},function(success,data) {
                        if(data.length>0)
                        {
                            var nextEpisode = data[0];
                            if( nextEpisode.name !== undefined) {
                                episode.successor = nextEpisode.name;
                                episode.save(episode.id,function(err){});
                            }
                        }
                        else {
                            console.log(episode.name + "has no successor with totalNr" + next);
                        }
                    });
                }
                _callback();
            },
            function (err) {
                callback(true);
            });
        });
    }
};