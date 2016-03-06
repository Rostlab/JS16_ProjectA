module.exports = {

		
	    getAllCultures: function (req, res) {

	        //Setup the mediawiki bot
	        var bot = require("nodemw");

	        var client = new bot({
	            server: "awoiaf.westeros.org",
	            path: "/api.php"
	        });
	        var params = {
	            action: "",
	            page: "",
	            prop: "",
	            format: "json"
	        };

	        culture = [];

	        //Iterate through all culture

	        console.log("Loading all culture from the wiki. This might take a while");
	        client.api.call(params, function (err, info, next, data) {
	            for (i = 0; i < data[""][""].length; i++) {
	                characters.push(data[""][""][i]["*"]);
	            }
	            res.status(200).json(culture);
	        });

	        res.status(400).json({message: 'Error', error: "something went wrong"});
	    },

		getCultureByName: function(cultureName, callback) {
			var scraper = require("./cultureScraper");
			scraper.getAllCultures(function(cultures) {
				for(i = 0; i < cultures.length; i++) {
					if(cultures[i].name == cultureName) {
						callback(cultures[i]);
					}
				}
			});
		},
		
	    getCultureById: function(req, res) {
	        var culturesStore = require('../stores/cultures');

	        culturesStore.getById(req.params.id, function(success, message) {
	            if(success == 1)
	                res.status(200).json({ message: 'Success', data: message });
	            else
	                res.status(404).json({ message: 'Failure. No culture with that data existing!',data: message });
	        });
	    },
	    
	    addCulture: function (req, res) {
	        var culturesStore = require('../stores/cultures');
	        culturesStore.add(req.body,function(success, message) {
	            if(success == 1)
	                res.status(201).json({ message: 'Success', data: message });
	            else if(success == 2)
	                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
	            else
	                res.status(400).json({ message: 'Error.', error: message });
	        });
	    },
	    
	    editCulture: function(req, res) {
	        var culturesStore = require('../stores/cultures');

	        culturesStore.edit(req.params.id, req.body,function(success, message) {
	            if(success == 1)
	                res.status(200).json({ message: 'Success', data: message });
	            else if(success == 2)
	                res.status(404).json({ message: 'Error. No culture exsiting with that id', id: req.params.id });
	            else if(success == 4)
	                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
	            else
	                res.status(400).json({ message: 'Error.', error: message });
	        });
	    },
	    
	    removeCharacter: function(req,res) {
	        var culturesStore = require('../stores/cultures');
	        culturesStore.remove(req.params.id,function(success) {
	            if(success === true)
	                res.status(200).json({ message: 'Success.' });
	            else
	                res.status(404).json({ message: 'Failure: No culture with that id is existing.', id: req.params.id });
	        });
	    }

};
