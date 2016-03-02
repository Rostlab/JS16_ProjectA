module.exports = {

	/*
	* Returns a list of house names
	*/
    getAllHouseNames: function (callback) {

        //Setup the mediawiki bot
        var bot = require("nodemw");

        var client = new bot({
            server: "awoiaf.westeros.org",
            path: "/api.php",
			concurrency: "5"
        });

        var houses = [];
		
        //Iterate through all the houses

        console.log("Loading all houses from the wiki. This might take a while");

        var apiCallback = function (err, info, next, data) {
			if(data != null) {
				for (j = 0; j < data.query.search.length; j++) {
					//console.log(info);
					var title = String(data.query.search[j].title);
					if (title === null) {
						break;
					}
					
					console.log("House " + title);

					houses.push(title);
				}
				if (houses.length == data.query.searchinfo.totalhits) {
					callback(houses);
				}
			}
        };

        for (i = 0; i < 540; i = i + 10) {
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
            client.api.call(params, apiCallback);
        }
    },
	
	
	/*
	* Call when you want to fetch all house information
	*/
	getAllHousesAndDetails : function(callback) {
		
		
		sc = require("./scraper");
		sc.getAllHouseNames(function(houses) {
		
		/*
		* For testing purposes(and faster results) uncomment this section and comment the above code section.
		*/
		/*
		var fs = require("fs");
		fs.readFile('./sample data/houses.txt', function (err, data) {
			if (err) {
			   return console.error(err);
			}
			string_array = data.toString().split("**");
			houses = JSON.parse(string_array[0]);
			fields = JSON.parse(string_array[1]);
		*/
				
					
			var bot = require("nodemw");
			var client = new bot({
				server: "awoiaf.westeros.org",
				path: "/api.php",
				concurrency: "5"
			});
			var housesCollection = [];
			var scraper = require("./scraper");
			for(i = 0; i < 20; i++) {
				scraper.getHouseDetails(houses[i], function(house) {
					housesCollection.push(house);
					if(housesCollection.length == 20) {
						callback(housesCollection);
					}
				});
			}
		});
	},
	
	/*
	* Fetches details for one house
	*/
	getHouseDetails : function(houseName, callback) {
		var bot = require("nodemw");
		var client = new bot({
			server: "awoiaf.westeros.org",
			path: "/api.php",
			concurrency: "1"
		});
		
		var fs = require("fs");
		fs.readFile('./sample data/houses.txt', function (err, data) {
			if (err) {
			   return console.error(err);
			}
			string_array = data.toString().split("**");
			var houses = JSON.parse(string_array[0]);
			//var fields = JSON.parse(string_array[1]);
		
		
			//console.log(houseName);
			var pageName = houseName.replace(" ", "_");
			
			var params = {
				action: "parse",
				page: pageName,
				format: "json"
			};	

			var sc = require("./scraper");
			
			var house = [];			
				
			client.api.call(params, function (err, info, next, data) {
				if(data != null) {
					var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/td><\/tr>/g);				
					if(arr != null) {	
						house["Name"] = houseName;

						for(i = 0; i < arr.length; i++) {
							var tempName = arr[i].match(/<th\sscope(.*?)>(.*?)<\/th>/g)[0].match(/>(.*?)</g);
							var name = tempName[0].substring(1, tempName[0].length-1);
							var tempValue = arr[i].match(/<td\sclass=\"\"\sstyle=\"\">(.*?)<\/td>/g)[0].match(/\">(.*?)<\/td>/g);	
							var value = tempValue[0].substring(1, tempValue[0].length-1);
							newValue = [];
							if(value.indexOf("href") != -1) {
								value = value.match(/\">(.*?)<\/a>/)[0];
								value = value.substring(2, value.length-4);
							}
							else {
								value = value.substring(1, value.length-4);
							}
							/*
							* Get the other information
							*/
							
							if(value != null) {
								
								if(name == "Current Lord") {
									sc.getCharacterDetails(value, function(characterDetails) {
										house["Current Lord"] = characterDetails;
									});
								}
								/*
								else if(name == "Region") {
									getRegionDetails(value, function(regionDetails) {
										house[name] = regionDetails;
									});
								}
								*/
								else if(name == "Founder") {
									sc.getCharacterDetails(value, function(characterDetails) {
										house["Founder"] = characterDetails;
									});
								}
								
								else if(name == "Overlord") {
									sc.getHouseDetails(value, function(houseDetails) {
										house["Overlord"] = houseDetails;
									});
								}
								
								
								else {
									house[name.toString()] = value;
								}
								
							}
							
							/*
							*
							*/
						}
					}
				}
				//console.log(house);
				callback(house);
			});
		});
	},
	
	/*
	* Fetches details for one character
	*/
	getCharacterDetails : function(characterName, callback) {
		//console.log("start getCharacterDetails");
		var bot = require("nodemw");
		var client = new bot({
			server: "awoiaf.westeros.org",
			path: "/api.php",
			concurrency: "5"
		});
		var fs = require("fs");
		fs.readFile('./sample data/characters.txt', function (err, data) {
			if (err) {
			   return console.error(err);
			}
			string_array = data.toString().split("**");
			var characters = JSON.parse(string_array[0]);
			//var fields = JSON.parse(string_array[1]);

			var pageName = characterName.replace(" ", "_");

			var params = {
				action: "parse",
				page: pageName,
				format: "json"
			};	
			var sc = require("./scraper");
			var character = [];			
			client.api.call(params, function (err, info, next, data) {
				if(data != null) {
					var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/td><\/tr>/g);				
					if(arr != null) {	
						character["Name"] = characterName;
						for(i = 0; i < arr.length; i++) {
							var tempName = arr[i].match(/<th\sscope(.*?)>(.*?)<\/th>/g)[0].match(/>(.*?)</g);
							var name = tempName[0].substring(1, tempName[0].length-1);
							var tempValue = arr[i].match(/<td\sclass=\"\"\sstyle=\"\">(.*?)<\/td>/g)[0].match(/\">(.*?)<\/td>/g);	
							var value = tempValue[0].substring(1, tempValue[0].length-1);
							newValue = [];
							if(value.indexOf("href") != -1) {
								value = value.match(/\">(.*?)<\/a>/)[0];
								value = value.substring(2, value.length-4);
							}
							else {
								value = value.substring(1, value.length-4);
							}
							/*
							* Get the other information
							*/
							
							if(value != null) {
								
								
								if(name == "Allegiance") {
									sc.getHouseDetails(value, function(houseDetails) {
										character["Allegiance"] = houseDetails;
									});
								}
								
								/*
								else if(name == "Region") {
									getRegionDetails(value, function(regionDetails) {
										character[name] = regionDetails;
									});
								}
								*/
								else {
									character[name] = value;
								}
								
							}
							
							/*
							*
							*/
						}
					}
				}
				//console.log(character);
				callback(character);
			});
		});
	},

	/*
	* Call when you want to fetch all house information
	*/
	getAllCharactersAndDetails : function(callback) {
		
		
		var sc = require("./scraper");
		sc.getAllCharacterNames(function(characters) {
		
			var charactersCollection = [];
			var scraper = require("./scraper");
			
			console.log(characters.length);
			
			for(i = 0; i < 20; i++) {
				scraper.getCharacterDetails(characters[i], function(character) {
					charactersCollection.push(character);
					if(charactersCollection.length == 20) {
						callback(charactersCollection);
					}
				});
			}
		});
	},

	/*
	* Returns a list of character names
	*/
    getAllCharacterNames: function (callback) {

        //Setup the mediawiki bot
        var bot = require("nodemw");

        var client = new bot({
            server: "awoiaf.westeros.org",
            path: "/api.php"
        });
        var params = {
            action: "parse",
            page: "List_of_characters",
            prop: "links",
            format: "json"
        };

        var characters = [];
        //Iterate through all the Characters

        console.log("Loading all character names from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {
            for (i = 0; i < data.parse.links.length; i++) {
				
				title = String(data.parse.links[i]["*"]);
					if (title === null) {
						break;
					}
				characters.push(title);
            }
			console.log("All character names loaded");
			callback(characters);
        });
    },
	

	
	
	
	
	
	
	
	
	
    getAllHistory: function (req, res) {

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

        history = [];

        //Iterate through all histroy

        console.log("Loading all history from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {
            for (i = 0; i < data[""][""].length; i++) {
                characters.push(data[""][""][i]["*"]);
            }
            res.status(200).json(history);
        });

        res.status(400).json({message: 'Error', error: "something went wrong"});
    },


    getAllCulture: function (req, res) {

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

    getAllGeography: function (req, res) {

        //Setup the mediawiki bot
        var bot = require("nodemw");

        var client = new bot({
            server: "awoiaf.westeros.org",
            path: "/api.php"
        });
        var params = {
            action: "parse",
            page: "List_of_characters",
            prop: "links",
            format: "json"
        };

        geography = [];

        //Iterate through all Geography

        console.log("Loading all geography from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {
            for (i = 0; i < data[""][""].length; i++) {
                characters.push(data[""][""][i]["*"]);
            }
            res.status(200).json(geography);
        });

        res.status(400).json({message: 'Error', error: "something went wrong"});
    },

    getAllTVEpisodes: function (req, res) {

        //Setup the mediawiki bot
        var bot = require("nodemw");

        var client = new bot({
            server: "awoiaf.westeros.org",
            path: "/api.php"
        });
        var params = {
            action: "parse",
            page: "Portal:TV_Show",
            format: "json"
        };

        episodes = [];

        //Iterate through all the episodes

        console.log("Loading all episodes from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {
			arr =data.parse.text["*"].match(/<li>(.*?)<\/li>/g);
			for(i = 0; i < arr.length; i++) {
				subArr = arr[i].match(/>(.*?)</g);
				episodes.push(subArr[1].substring(1,subArr[1].length-1));
			}
			res.status(200).json(episodes);
        });
		res.status(400).json({message: 'Error', error: "something went wrong"});
    }
};
