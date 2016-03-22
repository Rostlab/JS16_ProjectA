global.__base = __dirname + '/';
global.__appbase = __dirname + '/app/';
global.__tmpbase = __dirname + '/tmp/';

require(__base + 'startUp').start(function () {
    console.log("StartUp done!");
});