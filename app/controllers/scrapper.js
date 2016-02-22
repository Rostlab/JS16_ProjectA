module.exports = {
    scrapWebPage: function (req, res) {
        var cheerio = require('cheerio');
		var request = require('request');
		
		url = 'http://awoiaf.westeros.org/index.php/Houses_of_Westeros';
		
		request(url, function(error, response, html) {			
			var body = cheerio.load(html);
			body('.navbox-list').filter(function() {
				var data = body(this);
				/*
					For testing purposes
					Write to console all houses names
				*/
				/*
				for(i = 0; i < arrayOfChildren.length; i++) {
					var child = arrayOfChildren[i];
					console.log(child);
				}
				*/
			})
		});  
    }
};