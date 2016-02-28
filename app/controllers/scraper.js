module.exports = {

    getAllHouses: function (req, res) {

        //Setup the mediawiki bot
        var bot = require("nodemw");

        var client = new bot({
            server: "awoiaf.westeros.org",
            path: "/api.php"
        });

        houses = [];

        //Iterate through all the houses

        console.log("Loading all houses from the wiki. This might take a while");

        for (i = 0; i < 580; i = i + 10) {
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
            client.api.call(params, function (err, info, next, data) {
                for (j = 0; j < data["query"]["search"].length; j++) {
                    title = String(data["query"]["search"][j]["title"]);
                    if (title == null) {
                        break;
                    }
                    houses.push(title);
                }
                if (houses.length == data["query"]["searchinfo"]["totalhits"]) {
                    res.status(200).json(houses);
                }
            });
        }
        res.status(400).json({ message: 'Error', error: "something went wrong" });
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
            for (i = 0; i < data["parse"]["links"].length; i++) {
                characters.push(data["parse"]["links"][i]["*"]);
            }
            res.status(200).json(characters);
        });

        res.status(400).json({ message: 'Error', error: "something went wrong" });
    }


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

        res.status(400).json({ message: 'Error', error: "something went wrong" });
    }


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

        res.status(400).json({ message: 'Error', error: "something went wrong" });
    }

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

        res.status(400).json({ message: 'Error', error: "something went wrong" });
    }

    getAllTVEpisodes: function (req, res) {

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

        episodes = [];

        //Iterate through all the episodes

        console.log("Loading all episodes from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {
            for (i = 0; i < data[""][""].length; i++) {
                characters.push(data["]["links"][i]["*"]);
            }
            res.status(200).json(episodes);
        });

        res.status(400).json({ message: 'Error', error: "something went wrong" });
    }





};
