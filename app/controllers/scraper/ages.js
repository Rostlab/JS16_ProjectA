(function () {
    "use strict";
    var bot = require("nodemw");
    var client = new bot({
        server: "awoiaf.westeros.org",
        path: "/api.php",
        concurrency: "5"
    });

    var params = {
        action: "parse",
        page: "Timeline_of_major_events",
        format: "json"
    };
    var jsonfile = require('jsonfile');

    module.exports = {
        getAll: function (callback) {
            var ages = [];
            client.api.call(params, function (err, info, next, data) {

                var arrAge = data.parse.text["*"].match(/<span\sclass=\"tocnumber(.*?)>(.*?)<\/a>/g);
                for (let i = 1; i < arrAge.length - 2; i++) {
                    let tmp = arrAge[i].match(/\">(.*?)<\/span>/g);
                    let ageName = tmp[1].substring(2, tmp[1].length - 7);
                    var age = {};
                    age.name = ageName;
                    ages.push(age);
                }
                for (let i = 0; i < ages.length; i++) {
                    console.log(ages[i]);
                    if (i > 0 && i < ages.length - 1) {
                        ages[i].predecessor = ages[i - 1].name;
                        ages[i].successor = ages[i + 1].name;
                    }
                    if (i === 0) {
                        ages[i].successor = ages[i + 1].name;
                    }
                    if (i == ages.length - 1) {
                        ages[i].predecessor = ages[i - 1].name;
                    }
                }
                var arr = data.parse.text["*"].match(/<table\sclass=\"wikitable\">((.|[\r\n])*?)<\/table>/g);
                var start, end;
                for (let i = 0; i < arr.length; i++) {
                    var q = arr[i].match(/<tr>\n<td(.*?)>((.|[\r\n])*?)<\/td>/g);
                    if (q[0].indexOf("a>") != -1) {
                        if (q[0].indexOf("width") != -1) {
                            q[0] = q[0].match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                            q[0] = q[0].substring(2, q[0].length);
                        }
                        let tmp = q[0].match(/\">((.|[\r\n])*?)<\/a>/g);
                        start = tmp[0].substring(2, tmp[0].length - 4);

                    }
                    else {
                        let tmp = q[0].match(/>((.|[\r\n])*?)</g);
                        start = tmp[1].substring(1, tmp[1].length - 2);
                    }

                    if (q[q.length - 1].indexOf("a>") != -1) {
                        if (q[q.length - 1].indexOf("width") != -1) {
                            q[q.length - 1] = q[q.length - 1].match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                            q[q.length - 1] = q[q.length - 1].substring(2, q[q.length - 1].length);
                        }
                        let tmp = q[q.length - 1].match(/">((.|[\r\n])*?)<\/a>/g);
                        end = tmp[0].substring(2, tmp[0].length - 4);

                    }
                    else {
                        let tmp = q[q.length - 1].match(/>((.|[\r\n])*?)</g);
                        end = tmp[1].substring(1, tmp[1].length - 2);
                    }

                    ages[i].startDate = start;
                    ages[i].endDate = end;
                }
                callback(ages);
            });
        },

        getAllWithEvents: function (callback) {
            var ages = [];
            client.api.call(params, function (err, info, next, data) {

                var arrAge = data.parse.text["*"].match(/<span\sclass=\"tocnumber(.*?)>(.*?)<\/a>/g);
                for (let i = 1; i < arrAge.length - 2; i++) {
                    let tmp = arrAge[i].match(/\">(.*?)<\/span>/g);
                    let ageName = tmp[1].substring(2, tmp[1].length - 7);
                    var age = {};
                    age.name = ageName;
                    ages.push(age);
                }
                for (let i = 0; i < ages.length; i++) {
                    console.log(ages[i]);
                    if (i > 0 && i < ages.length - 1) {
                        ages[i].predecessor = ages[i - 1].name;
                        ages[i].successor = ages[i + 1].name;
                    }
                    if (i === 0) {
                        ages[i].successor = ages[i + 1].name;
                    }
                    if (i == ages.length - 1) {
                        ages[i].predecessor = ages[i - 1].name;
                    }
                }
                var arr = data.parse.text["*"].match(/<table\sclass=\"wikitable\">((.|[\r\n])*?)<\/table>/g);
                var start, end;
                for (let i = 0; i < arr.length; i++) {
                    var q = arr[i].match(/<tr>\n<td(.*?)>((.|[\r\n])*?)<\/td>/g);
                    if (q[0].indexOf("a>") != -1) {
                        if (q[0].indexOf("width") != -1) {
                            q[0] = q[0].match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                            q[0] = q[0].substring(2, q[0].length);
                        }
                        let tmp = q[0].match(/\">((.|[\r\n])*?)<\/a>/g);
                        start = tmp[0].substring(2, tmp[0].length - 4);

                    }
                    else {
                        let tmp = q[0].match(/>((.|[\r\n])*?)</g);
                        start = tmp[1].substring(1, tmp[1].length - 2);
                    }

                    if (q[q.length - 1].indexOf("a>") != -1) {
                        if (q[q.length - 1].indexOf("width") != -1) {
                            q[q.length - 1] = q[q.length - 1].match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                            q[q.length - 1] = q[q.length - 1].substring(2, q[q.length - 1].length);
                        }
                        let tmp = q[q.length - 1].match(/\">((.|[\r\n])*?)<\/a>/g);
                        end = tmp[0].substring(2, tmp[0].length - 4);

                    }
                    else {
                        let tmp = q[q.length - 1].match(/>((.|[\r\n])*?)</g);
                        end = tmp[1].substring(1, tmp[1].length - 2);
                    }

                    ages[i].startDate = start;
                    ages[i].endDate = end;
                }
                for (let i = 0; i < arr.length; i++) {
                    var lines = arr[i].match(/<tr>((.|[\r\n])*?)<\/tr>/g);
                    let events = [];
                    for (let j = 0; j < lines.length; j++) {

                        var date;
                        var event = {};
                        var eventName;

                        var nrOfCells = lines[j].match(/<td(.*?)>((.|[\r\n])*?)<\/td>/g);
                        if (nrOfCells.length == 1) {
                            continue;
                        }
                        var title = lines[j].match(/<td(.*?)>((.|[\r\n])*?)<\/td>/g)[0];
                        if (title.indexOf("a>") != -1) {
                            if (title.indexOf("width") != -1 || title.indexOf("rowspan") != -1) {
                                title = title.match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                                title = title.substring(2, title.length);
                            }
                            let tmp = title.match(/\">((.|[\r\n])*?)<\/a>/g);
                            date = tmp[0].substring(2, tmp[0].length - 4);
                        }
                        else {
                            let tmp = title.match(/>((.|[\r\n])*?)</g);
                            date = tmp[0].substring(1, tmp[0].length - 2);
                        }

                        //console.log(date);


                        var content = lines[j].match(/<b>(.*?)<\/b>/g);
                        if (content !== null) {
                            eventName = content[0].replace(/<a\shref(.*?)>/g, "");
                            eventName = eventName.replace(/<\/a>/g, "");
                            eventName = eventName.replace(/<b>/g, "");
                            eventName = eventName.replace(/<\/b>/g, "");
                        }
                        else {
                            eventName = "Unnamed";
                        }
                        event.name = eventName;
                        event.date = date;
                        events.push(event);

                    }
                    ages[i].events = events;
                }
                callback(ages);
            });
        },
        scrapToFile: function (cacheFile, scraperFunction, callback) {
            console.log('Scrapping from wiki. May take a while..');
            scraperFunction(function (data) {
                data = {'data': data, createdAt: new Date()};
                console.log('Writing results into cache file "' + cacheFile + '"..');
                jsonfile.writeFile(cacheFile, data, function (err) {
                    callback(err, data);
                });
            });
        }
    };
}());