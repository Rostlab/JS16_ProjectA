module.exports = {
	/**
	 * @api {get} /api/ Default route
	 * @apiVersion 0.0.1
	 * @apiName Default
	 * @apiGroup Default
	 *
	 * @apiDescription This function shows the "hello world" message to prove the nodejs app is working
	 */
	init: function (req, res) {
        res.json({ message: 'Hello World!' });
    },
	
	populateDB: function (db) {
		
		/*
		*	Initialize the controller that will retrieve data from the wiki
		*/
		var houseController = require("house");
		var characterController = require("character");
		var cultureController = require("culture");
		var episodeController = require("episode");
		var historyController = require("history");
		
		/*
		*	Initialize the collections(tables) in the database that will contain the retrieved data
		*/
		
		var houseCollection = db.collection("houses");
		var characterCollection = db.collection("characters");
		var cultureCollection = db.collection("culture");
		var episodeCollection = db.collection("episodes");
		var historyCollection = db.collection("history");
		
		/*
		*	Get the data from the wiki
		*/
		var houses = houseController.getData();
		var characters = characterController.getData();
		var culture = cultureController.getData();
		var episodes = episodeController.getData();
		var history = historyController.getData();
		
		/*
		*	Insert the data in the freshly made collections
		*/
		
		houseCollection.insert(houses, function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				console.log("Inserted %d documents into the \"houses\" collection.", result.length);
			}
		});
		
		characterCollection.insert(characters, function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				console.log("Inserted %d documents into the \"characters\" collection.", result.length);
			}
		});
		
		cultureCollection.insert(culture, function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				console.log("Inserted %d documents into the \"culture\" collection.", result.length);
			}
		});
		
		episodeCollection.insert(episodes, function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				console.log("Inserted %d documents into the \"episodes\" collection.", result.length);
			}
		});
		
		historyCollection.insert(history, function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				console.log("Inserted %d documents into the \"history\" collection.", result.length);
			}
		});
		
	}
};