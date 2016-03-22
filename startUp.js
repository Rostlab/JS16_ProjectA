
var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
var uuid = require('node-uuid');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require(__base + 'cfg/config');

function getDbString(config){ //Create the DB connection string
    var dbConnection = "mongodb://";
    if (config.username.length > 0 && config.password.length > 0) {
        dbConnection += config.username + ":" + config.password + "@";
    }
    return dbConnection + config.uri + ":" + config.port + "/" + config.collection;
}

function setupDb(){
    //Create the connection to mongodb
    console.log("Going to connect to " + getDbString(config.database));
    mongoose.connect(getDbString(config.database));
    var db = mongoose.connection;

    // DB CONNECTION EVENTS:
    db.on('connected', function () { //When successfully connected
        console.log('Mongoose connected');
    });
    db.on('error', function (err) {// If the connection throws an error
        console.log('Mongoose default connection error: ' + err);
    });
    db.on('disconnected', function () { // When the connection is disconnected
        console.log('Mongoose default connection disconnected');
    });
    db.on('open', function () {
        console.log("Mongoose connection open")
    });
}

function setupToken(){
    //Setup access token
    if (config.server.accessToken) {
        global.accessToken = config.server.accessToken;
    } else {
        global.accessToken = uuid.v4(); //Generate a default token when none is set
    }
    console.log('Your requests must contain the following token: ' + accessToken);
}

module.exports = {
    start: function(done) {
        // Parallelize
        const numCPUs = require('os').cpus().length;
        const cluster = require('cluster');
        const consoleStamp = require('console-stamp');

        if (cluster.isMaster) {
            // Setup timestamps for logging
            consoleStamp(console,{
                metadata: function () {
                    return ("[MASTER]");
                },
                colors: {
                    stamp: "yellow",
                    label: "white",
                    metadata: "red"
                }
            } );

            // Fork workers.
            for (var i = 0; i < numCPUs; i++) {
                var worker = cluster.fork();
                console.log("Spwaning worker " + worker.id);
            }

            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
                cluster.fork();
            });

            //Use a single connection to the db server as this should be enough
            setupDb();

            //Setup the token only once so all worker share the same secret
            setupToken();
        } else {

            // Setup timestamps for logging
            consoleStamp(console,{
                metadata: function () {
                    return ("[Worker " + cluster.worker.id + "]");
                },
                colors: {
                    stamp: "yellow",
                    label: "white",
                    metadata: "green"
                }
            } );

            //Setup application
            var app = express();

            // Add parser to get the data from a POST
            app.use(bodyParser.urlencoded({extended: true}));
            app.use(bodyParser.json());

            //Set swig as template engine for our main page
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
                var sentToken = req.query.token;
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

            // prefix for all routes
            app.use('/api', router);

            //Route for doc folder
            app.use('/doc', express.static('apidoc'));

            //Character images
            app.use('/misc/images/', express.static('misc/images'));

            //Redirect to docs
            app.get('*', function (req, res) {
                res.redirect('/doc');
            });

            //Start listening for requests
            var port = config.server.port || 8080; //set a default port if the config file does not contain it
            app.listen(port);
            console.log('is listening on port ' + port);
        }
    },
    stop: function(done) {
        if (!context || !context.server) {
            console.log('Server stopped');
            return;
        }
        context.server.close(done);
    }
};