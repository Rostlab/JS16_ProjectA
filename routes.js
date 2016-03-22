module.exports = function (app, router) {

    var defController = require('./app/controllers/default');
    router.get('/start', defController.init);

    var housesController = require(__appbase + 'controllers/house');
    router.post('/houses/find', housesController.get);
    router.get('/houses', housesController.getAll);
    router.get('/houses/:houseName', housesController.getByName);
    router.get('/houses/byId/:houseId', housesController.getById);

    var episodeController = require(__appbase + 'controllers/episode');
    router.post('/episodes/find', episodeController.get);
    router.get('/episodes', episodeController.getAll);
    router.get('/episodes/:name', episodeController.getByName);
    router.get('/episodes/byId/:id', episodeController.getById);
    router.get('/episodes/byCharacter/:name', episodeController.getEpisodesByCharacter);

    var eventsController = require(__appbase + 'controllers/event');
    router.post('/events/find', eventsController.get);
    router.get('/events', eventsController.getAll);
    router.get('/events/:name', eventsController.getByName);
    router.get('/events/byId/:id', eventsController.getById);
    router.get('/episodes/byCharacter/:id', episodeController.getEpisodesByCharacter);

    var ageController = require(__appbase + 'controllers/age');
    router.post('/ages/find', ageController.get);
    router.get('/ages', ageController.getAll);
    router.get('/ages/:name', ageController.getByName);
    router.get('/ages/byId/:id', ageController.getById);

    var characterController = require(__appbase + 'controllers/character');
    router.post('/characters/find', characterController.get);
    router.get('/characters', characterController.getAll);
    router.get('/characters/:name', characterController.getByName);
    router.get('/characters/byId/:id', characterController.getById);
    router.get('/characters/plod/:count', characterController.getByPLOD);

    var geographyController = require(__appbase + 'controllers/geography');
    router.post('/continents/find', geographyController.getContinents);
    router.get('/continents', geographyController.getAllContinents);
    router.get('/continents/:name', geographyController.getContinentByName);
    router.get('/continents/byId/:id', geographyController.getContinentById);

    //router.post('/cultures', geographyController.addCulture);
    router.get('/cultures', geographyController.getAllCultures);
    router.get('/cultures/:name', geographyController.getCultureByName);
    router.get('/cultures/byId/:id', geographyController.getCultureById);

    router.post('/regions/find', geographyController.getRegions);
    router.get('/regions', geographyController.getAllRegions);
    router.get('/regions/:name', geographyController.getRegionByName);
    router.get('/regions/byId/:id', geographyController.getRegionById);

    router.post('/cities/find', geographyController.getCities);
    router.get('/cities', geographyController.getAllCities);
    router.get('/cities/:name', geographyController.getCityByName);
    router.get('/cities/byId/:id', geographyController.getCityById);

    var statsController = require(__appbase + 'controllers/statistics');
    router.get('/stats/', statsController.getStats);

    var twitterController = require('./app/controllers/twitter');
    router.get('/twitter/search/:byKeywords/:tweetCount', twitterController.searchTwitter);

};
