require(__dirname + '/../' + 'constants');
var fs = require('fs');
var jsonfile = require('jsonfile');
var async = require('async');

global.__base = __dirname + '/../';
global.__appbase = __dirname + '/../app/';

/*
 * check console input
 */

// npm run updatePageRanks --dir=tmp/pageRanks --to=data/pageRanks.json
// npm run updatePageRanks --update=characters --file=data/pageRanks.json
var dir = process.env.npm_config_dir || false;
var to = process.env.npm_config_to || 'data/pageRanks.json';
var charsToUpdate = process.env.npm_config_update === 'characters';
var file = process.env.npm_config_file || 'data/pageRanks.json';

var transformDirToJson = function(dir,to,callback) {
    dir = __base + dir;
    to = __base + to;
    var pageRanks = [];

    console.log('Direction ' + dir +' is to be transforemed to json file '+ to);

    fs.readdir(dir,function(err,files){
        if(err) {
            console.log('Error: No data in dir '+ dir);
            process.exit();
        }

        var processFileData = function(data,cback) {
            // syntax errors in these files =/

            // just handle the first element, which has the score
            data = data.substring(1).split('}');
            data = data[0] + '}';

            // replace syntax errors
            data = data.replace(/u'/g,'\'');
            data = data.replace(/u"/g,'"');
            data = data.replace(/{'/g,'{"');
            data = data.replace(/':/g,'":');
            data = data.replace(/, '/g,', "');
            data = data.replace(/: '/g,': "');
            data = data.replace(/',/g,'",');

            data = JSON.parse(data);
            pageRanks.push({
                "name": data.page_name,
                "score": data.score
            });
            cback(false);
        }


        files.forEach(function(file,index) {
            async.series([
                function(cback) {
                    fs.readFile(dir+'/'+file,"utf-8", function (err, data) {
                        if (err) {
                            console.log(err);
                            cback();
                        }
                        else {
                            processFileData(data,function(err) {
                                cback();
                            });
                        }
                    });
                },
                function(cback) {
                    if(files.length === index + 1) {
                        callback(false,pageRanks);
                    }
                }
            ]);
        });
    });
};

if(!dir && !charsToUpdate) {
    console.log('No directory to be transformed passed and no update of the characters´ pageRanks required.');
    console.log('Example usages:');
    console.log('To update the pageRank.json: npm run updatePageRanks --dir=tmp/pageRanks --to=data/pageRanks.json');
    console.log('--dir is required and is the directory to page rank data provided by guy.');
    console.log('--to is optional and the default is data/pageRanks.json.');
    console.log();
    console.log('To update the characters db with a pageRank.json: npm run updatePageRanks --update=characters');

    process.exit();
}

var updateCharacters = function(file,callback) {
    jsonfile.readFile(file,function(err,pageRanks){
        if(err)
        {
            console.log('Could not read pageRank file.');
            process.exit();
        }

        var config = require('../cfg/config');
        var mongoose = require('mongoose');

        //Create the DB connection string
        var databaseParams = config.database;
        var dbConnection = "mongodb://";
        if (databaseParams.username.length > 0 && databaseParams.password.length > 0) {
            dbConnection += databaseParams.username + ":" + databaseParams.password + "@";
        }
        dbConnection += databaseParams.uri + ":" + databaseParams.port + "/" + databaseParams.collection;

//Create the connection to mongodb
        console.log("Going to connect to " + dbConnection);
        mongoose.connect(dbConnection);
        var db = mongoose.connection;

// CONNECTION EVENTS: When successfully connected
        db.on('connected', function () {
            console.log('Mongoose connected');
        });

// If the connection throws an error
        db.on('error', function (err) {
            console.log('Mongoose default connection error: ' + err);
        });

// When the connection is disconnected
        db.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });

        db.on('open', function () {

            var filler = require(__appbase + 'controllers/filler/characters');
            filler.updatePageRanks(pageRanks,function(){
                callback(false);
            });
        });
    });
}

if(dir){
    transformDirToJson(dir,to,function(err,pageRanks){
        jsonfile.writeFile(to,pageRanks,{'spaces':2},function(){
            console.log('New pageRanks in file '+to);
            if(charsToUpdate) {
                updateCharacters(to,function(err){
                    console.log('DONE!')
                    process.exit();
                });
            }
            else {
                console.log('DONE!');
                process.exit();
            }
        });
    });
}
else {
    updateCharacters(file,function(err){
        console.log('DONE!');
        process.exit();
    });
}
