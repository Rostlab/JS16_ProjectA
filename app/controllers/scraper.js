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

    getAllCharacters: function (callback) {

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

};