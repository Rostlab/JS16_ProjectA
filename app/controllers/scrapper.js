module.exports = {
	
	/*
	* @return: Returns an array of String containing the scrapped values
	*/
	
	getAllHouses: function () {
		
		//Setup the mediawiki bot
		var bot = require("nodemw");
		
		var client = new bot({
			server: "awoiaf.westeros.org",
			path: "/api.php"
		});
		
		houses = [];
		
		
		//Iterate through all the houses
		//Needed because searchoffset is only 10
		for(i = 0; i < 580; i = i+10) {
			//Setup up the api parameters
			var params = {
				action: "query",
				titles: "Houses%20Of%20Westeros",
				list: "search",
				srsearch: "house",
				format: "json",
				sroffset: String(i)
			};
			
			//Get results from api
			client.api.call(params, function(err, info, next, data) {
				for(j = 0; j < data["query"]["search"].length; j++) {
					title = String(data["query"]["search"][j]["title"]);
					if(title.indexOf("House") != 0) {
						continue;
					}
					if(title == null) {
						break;
					}
					houses.push(title);
				}			
			});
		}
		
		
		//TODO: return value houses
		//Wait for the call task to end and then return
		
	}
	
};