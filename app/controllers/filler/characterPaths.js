var CharacterPath = require(__appbase + 'models/characterPath');
var Character = require(__appbase + 'models/character');
var jsonfile = require('jsonfile');
var async = require('async');
var cfg = require(__appbase + '../cfg/config.json');

var file = __base + 'data/characterPaths.json';

module.exports = {
    fill: function(policy, callback) {
        module.exports.policy = policy;
        console.log('Filling started.');

        var pathsToCharacters = [];

        var addPathToDb = function(data, cback) {
            pathsToCharacters.push(data.name);
            if(!data.hasOwnProperty('name')) {
                cback(true);
                return;
            }

            var newPath = new CharacterPath();
            newPath.name = data.name;

            if(data.hasOwnProperty('path')) {
                newPath.path = data.path;
            }

            newPath.save(function(err){
                if(err) {
                    console.log(err);
                }
                cback(false);
            });
        };

        async.waterfall([
            function(cb) {
                if(module.exports.policy == 1) {
                    module.exports.clearAll(function(){
                        cb(null);
                    });
                }
                else {
                    cb(null);
                }
            },

            function(cb) {
                jsonfile.readFile(file,function(err, paths) {
                    if(err) {
                        console.log('Could not read file ' + file + ' to fill the charactersPath collection.');
                        callback(true);
                        return;
                    }

                    cb(null, paths);
                });
            },

            function(paths, cb) {
                async.each(paths,function(path,_callb) {
                    if(module.exports.policy == 1) {
                        addPathToDb(path, function(err) {
                            if(!err) {
                                console.log(path.name + ' added to db!');
                            }
                            _callb();
                            return;
                        })
                    }
                    else {
                        CharacterPath.findOne({'name': path.name}, function (err, oldPath) {
                            if (err || !oldPath || oldPath === null) {
                                addPathToDb(path, function (err) {
                                    if (!err) {
                                        console.log(path.name + ' added to db!');
                                    }
                                    _callb();
                                    return;
                                })
                            }

                            if (module.exports.policy == 2) {
                                oldPath.path = path.path;
                                oldPath.save(function (err) {
                                    if (err) {
                                        console.log('Could not update: ' + err);
                                        _callb();
                                        return;
                                    }
                                    else {
                                        console.log(oldPath.name + ' got updated!');
                                        pathsToCharacters.push(oldPath.name);
                                        _callb();
                                        return;
                                    }
                                })
                            }
                            else {
                                var isChange = false;
                                for (var prop in path) {
                                    if (!oldPath.hasOwnProperty(prop) && oldPath[prop].length < 1) {
                                        oldPath[prop] = path[prop];
                                        isChange = true;
                                    }
                                }

                                if (!isChange) {
                                    console.log(oldPath.name + 'is untouched. Already existing properties are not updated!');
                                    _callb();
                                    return;
                                }

                                oldPath.save(function (err) {
                                    if (err) {
                                        console.log('Could not update: ' + err);
                                        _callb();
                                    }
                                    else {
                                        console.log(oldPath.name + ' got new properties!');
                                        pathsToCharacters.push(oldPath.name);
                                        _callb();
                                    }
                                })
                            }
                        });
                    }
                },
                function(err) {
                    if(err) {
                        console.log(err);
                    }
                    cb(null,pathsToCharacters);
                });
            },

            function(charsHavePaths, cb) {
                var notFoundChars = [];
                async.each(charsHavePaths,function(char, _callback) {
                    Character.findOne({'name':char}, function(err, oldChar) {
                        if(err || oldChar === null) {
                            notFoundChars.push(char);
                            _callback(null);
                            return;
                        }
                        oldChar.hasPath = true;
                        oldChar.save(function(err){
                            if(err) {
                                console.log('ERROR: '+ err);
                                _callback(null);
                            }
                            else {
                                console.log('Character property of ' +  char +' hasPath has been updated.');
                                _callback(null);
                            }
                        });
                    });
                },function(err){
                    if(notFoundChars.length > 0) {
                        console.log('Following characters are in the paths json, but not in the characters db: ' + notFoundChars.join(', '));
                    }
                    cb(null);
                })
            }

        ], function(err, result) {
            console.log('Filling finished! =)');
            callback(true);
        });
    },
    clearAll: function(callback) {
        CharacterPath.remove({}, function(err) {
            console.log('collection removed');
            callback();
        });
    }
};