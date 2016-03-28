(function () {
    "use strict";
    var bot = require("nodemw");
    var client = new bot({
        server: "awoiaf.westeros.org",
        path: "/api.php",
        concurrency: "5"
    });
    var jsonfile = require('jsonfile');
    var HtmlParser = require('cheerio');
    var async = require('async');

    module.exports = {
        /*
         * Fetches details for one character
         */
        get: function (characterName, callback) {
            if(!characterName){
                console.log("Skipped: "+characterName);
                return ;
            }

            var pageName = characterName.replace(/\s/g, "_");

            var params = {
                action: "parse",
                page: pageName,
                format: "json",
				redirects: ""
            };

            var character = {};
            client.api.call(params, function (err, info, next, data) {
                if (data) {
                    var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/td><\/tr>/g);
                    if (arr !== null) {
                        character.name = characterName;
                        character.slug = pageName;

                        for (let i = 0; i < arr.length; i++) {
                            var tempName = arr[i].match(/<th\sscope(.*?)>(.*?)<\/th>/g)[0].match(/>(.*?)</g);
                            var name = tempName[0].substring(1, tempName[0].length - 1);
                            var tempValue = arr[i].match(/<td\sclass=\"\"\sstyle=\"\">(.*?)<\/td>/g)[0].match(/\">(.*?)<\/td>/g);
                            var value = tempValue[0].substring(1, tempValue[0].length - 1);
                            if (value.indexOf("href") != -1) {
                                value = value.match(/\">(.*?)<\/a>/)[0];
                                value = value.substring(2, value.length - 4);
                            }
                            else {
                                value = value.substring(1, value.length - 4);
                            }
                            /*
                             * Get the other information
                             */

                            if (value !== null) {
                                name = name.toLowerCase();
                                if (name == "played by") {
                                    name = "actor";
                                }
                                else if (name == "allegiance") {
                                    name = "house";
                                }
                                character[name] = value;
                            }

                            /*
                             *
                             */
                        }
                    }
                    if (data.parse.properties.length !== 0) {
                        var firstAttempt = data.parse.properties[0]["*"];
                        var gender = null;
                        if (firstAttempt !== null) {
                            var phrases = firstAttempt.split(".");
                            if (phrases.length > 1) {
                                var phrase = phrases[1].trim();
                                if (phrase.indexOf("He") === 0 || phrase.indexOf("His") === 0) {
                                    gender = "Male";
                                }
                                else if (phrase.indexOf("She") === 0 || phrase.indexOf("Her") === 0) {
                                    gender = "Female";
                                }
                            }
                        }

                        if (gender === null) {
                            var secondAttempt = data.parse.text["*"];
                            if (secondAttempt !== null) {
                                var fGender = (secondAttempt.match(/\sher\s|She|herself/g) || []).length;
                                var mGender = (secondAttempt.match(/\shis\s|\shim\s|He|himself/g) || []).length;
                                if (fGender > mGender) {
                                    gender = "Female";
                                }
                                else if (fGender < mGender) {
                                    gender = "Male";
                                }
                                else {
                                    gender = null;
                                }
                            }
                        }

                        if (gender == "Male") {
                            character.male = true;
                        }
                        else {
                            character.male = false;
                        }
                    }

                    //fetch the image
                    var $ = HtmlParser.load(data.parse.text["*"]);
                    var imgLink = $('.infobox-image img').attr('src');
                    if(imgLink !== undefined) {
                        character.imageLink = imgLink;
                    }

                    var infobox = $('.infobox th');
                    //fetch titles
                    character.titles = [];

                    var titleTd = infobox.
                        filter(function(i, el) {return $(this).html() === 'Title';}).
                        parent().find('td')
                    ;

                    if(titleTd.html() !== null)
                    {
                        // get multiple titles
                        var titles = titleTd.html().split('<br>');
                        titles.forEach(function(title) {
                            // remove html tags and unnecessary spaces
                            title = title.replace(/\*?<(?:.|\n)*?>/gm, '').trim();

                            // remove references like [1]
                            title = title.replace(/\[\d+\]+/g, '');

                            character.titles.push(title);
                        });
                    }


                    //fetch books
                    character.books = [];
                    var booksTd = infobox.
                        filter(function(i, el) {return $(this).html() === 'Book(s)';}).
                        parent().find('td')
                    ;

                    if(booksTd.html() !== null)
                    {
                        // get multiple titles
                        var books = booksTd.html().split('<br>');
                        books.forEach(function(book) {
                            // remove html tags and unnecessary spaces
                            book = book.replace(/\*?<(?:.|\n)*?>/gm, '').trim();

                            // remove references like [1]
                            book = book.replace(/\(\w+\)+/g, '').trim();

                            character.books.push(book);
                        });
                    }

                    // Catch birthdate
                    var bornTd = infobox.
                        filter(function(i, el) {return $(this).html() === 'Born' || $(this).html() === 'Born in';}).
                        parent().find('td')
                        ;

                    if(bornTd.html() !== null) {
                        var born = bornTd.html();

                        var isBirthDate = false;
                        if(born.indexOf('AC') > -1) {
                            var bornAC = born.match(/\d+ AC/);
                            if(bornAC !== null) {
                                born = bornAC[0].replace(/\D/g,'');
                            }
                            isBirthDate = true;
                        }
                        if(born.indexOf('BC') > -1) {
                            var bornBC = born.match(/\d+ BC/);
                            if(bornBC !== null) {
                                born = 0 - bornBC[0].replace(/\D/g,'');
                            }
                            isBirthDate = true;
                        }
                        if(isBirthDate){
                            character.dateOfBirth = born;
                        }
                    }

                    // Catch dateOfDeath
                    var diedTd = infobox.
                        filter(function(i, el) {return $(this).html() === 'Died' || $(this).html() === 'Died in';}).
                        parent().find('td')
                    ;

                    if(diedTd.html() !== null) {
                        var died = diedTd.html();
                        var isDead = false;

                        if(died.indexOf('AC') > -1) {
                            var diedAC = died.match(/\d+ AC/);
                            if(diedAC !== null) {
                                died = diedAC[0].replace(/\D/g,'');
                            }
                            isDead = true;
                        }

                        if(died.indexOf('BC') > -1) {
                            var diedBC = died.match(/\d+ BC/);
                            if(diedBC !== null) {
                                died = 0 - diedBC[0].replace(/\D/g,'');
                            }
                            isDead = true;
                        }

                        if(isDead) {
                            character.dateOfDeath = died;
                        }
                    }
                }
                callback(character);
            });
        },

        /*
         * Call when you want to fetch all house information
         */
        getAll: function (callback) {
            var scraper = require("./characters");
            scraper.getAllNames(function (characters) {
                var charactersCollection = [];

                async.each(characters, function(character, cb){
                    scraper.get(character, function(char) {
                        console.log('Fetched ' + char.name);
                        charactersCollection.push(char);
                        console.log("Still " + (characters.length - charactersCollection.length) + " characters to fetch.");
						
                        cb();
                    });
                },
                function(err) {
                    console.log('Finished scraping.');
                    callback(charactersCollection);
                });
            });
        },

        /*
         * Returns a list of character names
         */
        getAllNames: function (callback) {

            //Setup the mediawiki bot
            var bot = require("nodemw");

            var client = new bot({
                server: "awoiaf.westeros.org",
                path: "/api.php"
            });
            var params = {
                action: "parse",
                page: "List_of_characters",
                format: "json"
            };

            var characters = [];
            //Iterate through all the Characters

            console.log("Loading all character names from the wiki. This might take a while");
            client.api.call(params, function (err, info, next, data) {
                var arr = data.parse.text["*"];
                var links = arr.match(/<li>\s<a\shref(.*?)<\/a>/g);
                for(let i = 0; i < links.length; i++) {
                    var matchedName = links[i].match(/title=\"(.*?)\"/g);
                    var characterName  = matchedName[0].substring(7, matchedName[0].length-1);
                    characters.push(characterName);
                }
                console.log("All character names loaded");
                callback(characters);
            });
        },
        scrapToFile: function (cacheFile, scraperFunction, callback) {
            console.log('Scrapping from wiki. May take a while..');
            scraperFunction(function (data) {
                data = {'data': data, createdAt: new Date()};
                console.log('Writing results into cache file "' + cacheFile + '"..');
                jsonfile.writeFile(cacheFile, data,{'spaces':2}, function (err) {
                    callback(err, data);
                });
            });
        }
    };
}());