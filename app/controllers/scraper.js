module.exports = {

    getAllHouses: function (callback) {

        //Setup the mediawiki bot
        var bot = require("nodemw");

        var client = new bot({
            server: "awoiaf.westeros.org",
            path: "/api.php",
			concurrency: "5"
        });

        houses = [];
		fields = [];
		
        //Iterate through all the houses

        console.log("Loading all houses from the wiki. This might take a while");

        var apiCallback = function (err, info, next, data) {
			if(data != null) {
				for (j = 0; j < data.query.search.length; j++) {
					//console.log(info);
					title = String(data.query.search[j].title);
					if (title === null) {
						break;
					}
					
					console.log("House " + title);

					
					sc = require("./scraper");
					sc.getHouseFieldKeyWords(title, function(result) {
						for(i = 0; i < result.length; i++) {
							if(fields.indexOf(result[i]) == -1) {
								fields.push(result[i]);
							}
						}
					});
					
					houses.push(title);
				}
				if (houses.length == data.query.searchinfo.totalhits) {
					callback(houses, fields);
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
	
	getHouseFieldKeyWords : function(houseName, callback) {
		
		pageName = houseName.replace(" ", "_");
		
		
		var bot = require("nodemw");
		var client = new bot({
			server: "awoiaf.westeros.org",
			path: "/api.php",
			concurrency: "1"
		});
		var params = {
			action: "parse",
			page: pageName,
			format: "json"
		};
		keywords = [];
		client.api.call(params, function (err, info, next, data) {
			if(data != null) {
				var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/th>/g);
				if(arr != null) {
					
					for(i = 0; i < arr.length; i++) {
						subArr = arr[i].match(/>(.*?)</g);
						keywords.push(subArr[0].substring(1,subArr[0].length-1));
					}
					callback(keywords);
				}
			}
		});
	},
	
	getAllHouseDetails : function(callback) {
		
		sc = require("./scraper");
		sc.getAllHouses(function(houses, fields) {
		
		/*
		* For testing purposes(and faster results) uncomment this section and comment the above code section.
		*/
		/*
		var fs = require("fs");
		fs.readFile('test.txt', function (err, data) {
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
		console.log(houses.length);
		for(i = 0; i < houses.length; i++) {
		
		
			pageName = houses[i].replace(" ", "_");
		
			var params = {
				action: "parse",
				page: pageName,
				format: "json"
			};
			
			housesCollection = [];
			
			client.api.call(params, function (err, info, next, data) {
				
				
				
				if(data != null) {
					var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/td><\/tr>/g);				
					if(arr != null) {
						
						house = [];
							
						for(j = 0; j < fields.length; j++) {
							house[fields[j].toString()] = null;
						}
						
						for(i = 0; i < arr.length; i++) {

							tempName = arr[i].match(/<th\sscope(.*?)>(.*?)<\/th>/g)[0].match(/>(.*?)</g);
							name = tempName[0].substring(1, tempName[0].length-1);
							tempValue = arr[i].match(/<td\sclass=\"\"\sstyle=\"\">(.*?)<\/td>/g)[0].match(/\">(.*?)<\/td>/g);	
							value = tempValue[0].substring(1, tempValue[0].length-1);
							newValue = [];
							if(value.indexOf("href") != -1) {
								value = value.match(/\">(.*?)<\/a>/)[0];
								value = value.substring(2, value.length-4);
							}
							else {
								value = value.substring(1, value.length-4);
							}
							
							house[name] = value;		
							
							
						}
						housesCollection.push(house);
						console.log(housesCollection.length);
					}
				}
				
				if(housesCollection.length == houses.length) {
					callback(housesCollection);
				}
				
			});
			
		}	
			
		});
		
		
	},

    getAllCharacters: function (req, res) {

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

        characters = [];

        //Iterate through all the Characters

        console.log("Loading all characters from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {
            for (i = 0; i < data.parse.links.length; i++) {
                characters.push(data.parse.links[i]["*"]);
            }
            res.status(200).json(characters);
        });

        res.status(400).json({message: 'Error', error: "something went wrong"});
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
