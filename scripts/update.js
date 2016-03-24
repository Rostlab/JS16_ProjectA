require(__dirname + '/../' + 'constants');

/*
 * check console input
 */
var requested = process.env.npm_config_collection;
if(requested === undefined) {
    console.log('Provide which collection should be refilled. Example: npm refill --collection=characters ');
    process.exit();
}
var possibleRefillings = [
    'ages',
    'characters',
    'episodes',
    'cities',
    'continents',
    'cultures',
    'events',
    'houses',
    'regions',
    'characterLocations'
]

if(possibleRefillings.indexOf(requested) < 0) {
    console.log('Request ' + requested + ' is unknown. Possible refills: ' + possibleRefillings.join(', ') + '.');
    process.exit();
}
/*
 * start
 */
console.log('Refilling collection: '+ requested);

var config = require('../cfg/config');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

global.__base = __dirname + '/../';
global.__appbase = __dirname + '/../app/';

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
    var controller = require('../app/controllers/filler/' + requested);
    controller.fill(2,function() {process.exit();});
});