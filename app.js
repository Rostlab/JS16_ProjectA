var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./cfg/config');
var swig = require('swig');
<<<<<<< HEAD
var uuid = require('node-uuid');
=======
var cors = require('cors');
>>>>>>> master

global.__base = __dirname + '/';
global.__appbase = __dirname + '/app/';

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
    // to get the data from a POST
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //Set swig as template engine
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __appbase + '/views');
    app.set('view cache', false);


    //Set up our router
    var router = express.Router();

    // this happens for every request
    router.use(function (req, res, next) {
        console.log('Request incoming: ' + req.url);

        //Allow all GET requests as these do not modify data and we want users to be able to see that basic stuff
        if (req.method === 'GET') {
            return next();
        }

        //Otherwise check if we got a token
        var sentToken = req.get('token');
        if (!sentToken) {
            console.log('401 - no token sent');
            return res.status(401).send({ //Send a nice little message to remind the user that he needs to supply a token
                message: 'Need to send a token',
                code: 401
            });
        }

        //Also check if the token is valid or not
        if (sentToken == accessToken) {
            return next();
        } else {
            console.log('401 - wrong token sent');
            return res.sendStatus(401);
        }
    });

    //Add cors support for all routes
    app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false
    }));

    //Include routes from external file
    require(__base + 'routes')(app, router);

    //Setup access token
    if (config.server.accessToken) {
        global.accessToken = config.server.accessToken;
    } else {
        global.accessToken = uuid.v4(); //Generate a default token when none is set
    }
    console.log('Your requests must contain the following token: ' + accessToken);

    // prefix for all routes
    app.use('/api', router);

    //Route for doc folder
    app.use('/doc', express.static('apidoc'));

    //Redirect to default page
    app.get('*', function (req, res) {
        res.redirect('/api');
    });

    //Start listening for requests
    var port = config.server.port || 8080; //set a default port if the config file does not contain it
    app.listen(port);
    console.log('Node server is listening on port ' + port);
});