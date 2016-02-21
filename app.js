var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

mongoose.connect('mongodb://js16a:js16mongo@ds055855.mongolab.com:55855/js16a');

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
// I get on server start:
/*
 Node server is listening on port 8080
 Mongoose default connection disconnected
 Mongoose default connection error: MongoError: auth failed
 */


// to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var router = express.Router();

// this happens for every request
router.use(function(req, res, next) {
    console.log('Request incoming.');

    // HERE LOGIN TEST

    next(); // go to the specialized request
});

/*
#### Routes
 */
var defController = require('./app/controllers/default');
router.get('/', defController.init);

var housesController = require('./app/controllers/house');
router.post('/houses', housesController.addHouse);

/*
###
 */

// prefix for all routes
app.use('/api', router);

var port = 8080;
app.listen(port);
console.log('Node server is listening on port ' + port);