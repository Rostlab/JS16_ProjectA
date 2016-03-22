global.__base = __dirname + '/';
global.__appbase = __dirname + '/app/';

require(__base + 'startUp').start(function () {
    console.log("StartUp done!");
});