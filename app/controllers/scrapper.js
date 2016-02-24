module.exports = {
    scrapWebPage: function () {
        var cheerio = require('cheerio');
		var request = require('request');
		
		url = 'http://awoiaf.westeros.org/index.php/Houses_of_Westeros';
		request(url, function(error, response, html) {			
			var body = cheerio.load(html);
			var arr = body('.navbox-list').filter(function() {
				var data = body(this);
				/*
					For testing purposes
					Write to console all houses names
				*/
				var arr = data.children().text().split("·");
				/*
				for(i = 0; i < arrayOfChildren.length; i++) {
					var child = arrayOfChildren[i];
					console.log(child);
				}
				*/
			})
		});	
    },
	
	scrapWebPageNew: function () {
		var MediaWiki = require("mediawiki");
		var bot = new MediaWiki.Bot({
			endpoint: "http://awoiaf.westeros.org/api.php"
		});
		//var url = http://awoiaf.westeros.org/api.php?action=query&titles=Houses%20Of%20Westeros&list=search&srsearch=house&format=xml&sroffset=10";
		bot.get({action: "query", titles: "Houses%20Of%20Westeros", list: "search", srsearch: "house", format: "xml", sroffset: "0"}).complete(function(response) {
			console.log(response.text);
		}).error(function (err) {
			console.log(err.toString());
		});		
	}
	
};