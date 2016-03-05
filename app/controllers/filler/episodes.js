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
            console.log('Filling done =).');
        }

        var file = __appbase + '../wikiData/episodes.json';
        jsonfile.readFile(file, function(err, obj) {
            var filler = require(__appbase + 'controllers/filler/episodes');
            if(obj != undefined)
                var cacheAge = ((new Date) - new Date(obj.createdAt));

            var ttl = require(__appbase + '../cfg/config.json');
            ttl = ttl.TTLWikiCache;

            if(obj == undefined || cacheAge > ttl) {
                if(obj != undefined && cacheAge > ttl)
                    console.log('Cache file outdated.');

                Scraper.scrapToFile(file, Scraper.getEpisodes, function (err, obj) {
                    if (err != null) {
                        console.log(err)
                    }
                    else {
                        filler.insertToDb(obj.data,afterInsertion);
                    }
                });
            }
            else {
                console.log('Episodes from cache file "'+file+'". Not scrapped from wiki.');
                filler.insertToDb(obj.data,afterInsertion);
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
            if (z == 'characters' || z == 'predecessor' || z == 'successor' || !Episode.schema.paths.hasOwnProperty(z)) {
                delete episode[z];
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
    addReferences: function(req,res) {
        // TODO: Still every db entry has to be edited and the references updated
    }
};