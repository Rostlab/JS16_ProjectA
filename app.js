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


// to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// the port we are listening to
var port = process.env.PORT || 8080;

var router = express.Router();

// this happens for every request
router.use(function(req, res, next) {
  console.log('Request incoming.');
  next(); // go to the specialized request
});

router.get('/', function(req, res) {
  res.json({ message: 'Hello World!' });
});

// add new house
router.route('/house')
    .post(function(req, res) {

      var House = require('./app/models/house');
      var house = new House();
      house.name = req.body.name;

      console.log(mongoose.connection.readyState); // i get a 0
      house.save(function(err) {
        if (err){
          res.send(err);
        }
        else {
          res.json({ message: 'House created!' });
        }
      });

    });


// prefix for all routes
app.use('/api', router);

app.listen(port);
console.log('Node server is listening on port ' + port);



