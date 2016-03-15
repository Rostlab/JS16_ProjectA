module.exports = function (app, router) {

    var defController = require('./app/controllers/default');
    router.get('/', defController.init);

    var housesFiller = require(__appbase + 'controllers/filler/houses');
    router.get('/houses/filler', housesFiller.fill);
    router.delete('/houses/filler', housesFiller.clearAll);

    var continentsFiller = require(__appbase + 'controllers/filler/continents');
    router.get('/continents/filler', continentsFiller.fill);
    router.delete('/continents/filler', continentsFiller.clearAll);

    var regionsFiller = require(__appbase + 'controllers/filler/regions');
    router.get('/regions/filler', regionsFiller.fill);
    router.delete('/regions/filler', regionsFiller.clearAll);

    var episodesFiller = require(__appbase + 'controllers/filler/episodes');
    router.get('/episodes/filler', episodesFiller.fill);
    router.delete('/episodes/filler', episodesFiller.clearAll);

    var charactersFiller = require(__appbase + 'controllers/filler/characters');
    router.get('/characters/filler', charactersFiller.fill);
    router.delete('/characters/filler', charactersFiller.clearAll);

    var agesFiller = require(__appbase + 'controllers/filler/ages');
    router.get('/ages/filler', agesFiller.fill);
    router.delete('/ages/filler', agesFiller.clearAll);
    
    var eventsFiller = require(__appbase + 'controllers/filler/events');
    router.get('/events/filler', eventsFiller.fill);
    router.delete('/events/filler', eventsFiller.clearAll);
    
    var culturesFiller = require(__appbase + 'controllers/filler/cultures');
    router.get('/cultures/filler', culturesFiller.fill);
    router.delete('/cultures/filler', culturesFiller.clearAll);

    var housesController = require(__appbase + 'controllers/house');
    router.post('/houses', housesController.add);
    router.post('/houses/find', housesController.get);
    router.get('/houses', housesController.getAll);
    router.get('/houses/:houseName', housesController.getByName);
    router.get('/houses/byId/:houseId', housesController.getById);
    router.delete('/houses/:houseId', housesController.remove);
    router.put('/houses/:houseId', housesController.edit);

    var episodeController = require(__appbase + 'controllers/episode');
    router.post('/episodes', episodeController.add);
    router.post('/episodes/find', episodeController.get);
    router.get('/episodes', episodeController.getAll);
    router.get('/episodes/:name', episodeController.getByName);
    router.get('/episodes/byId/:id', episodeController.getById);
    router.get('/episodes/byCharacter/:name', episodeController.getEpisodesByCharacter);
    router.delete('/episodes/:id', episodeController.remove);
    router.put('/episodes/:id', episodeController.edit);

    var eventsController = require(__appbase + 'controllers/event');
    router.post('/events', eventsController.add);
    router.post('/events/find', eventsController.get);
    router.get('/events', eventsController.getAll);
    router.get('/events/:name', eventsController.getByName);
    router.get('/events/byId/:id', eventsController.getById);
    router.get('/episodes/byCharacter/:id', episodeController.getEpisodesByCharacter);
    router.delete('/events/:id', eventsController.remove);
    router.put('/events/:id', eventsController.edit);

    var ageController = require(__appbase + 'controllers/age');
    router.post('/ages', ageController.add);
    router.post('/ages/find', ageController.get);
    router.get('/ages', ageController.getAll);
    router.get('/ages/:name', ageController.getByName);
    router.get('/ages/byId/:id', ageController.getById);
    router.delete('/ages/:id', ageController.remove);
    router.put('/ages/:id', ageController.edit);

    var characterController = require(__appbase + 'controllers/character');
    router.post('/characters', characterController.add);
    router.post('/characters/find', characterController.get);
    router.get('/characters', characterController.getAll);
    router.get('/characters/:name', characterController.getByName);
    router.get('/characters/byId/:id', characterController.getById);
    router.get('/characters/byHouses/:id', characterController.getCharactersByHouse);
    router.get('/characters/byCulture/:id', characterController.getCharactersByCulture);
    router.get('/characters/byGender/:id', characterController.getCharactersByGender);
    router.delete('/characters/:id', characterController.remove);
    router.put('/characters/:id', characterController.edit);

    var geographyController = require(__appbase + 'controllers/geography');
    router.post('/continents', geographyController.addContinent);
    router.post('/continents/find', geographyController.getContinents);
    router.get('/continents', geographyController.getAllContinents);
    router.get('/continents/:name', geographyController.getContinentByName);
    router.get('/continents/byId/:id', geographyController.getContinentById);
    router.delete('/continents/:id', geographyController.removeContinent);
    router.put('/continents/:id', geographyController.editContinent);

    router.post('/cultures', geographyController.addCulture);
    router.post('/cultures/find', geographyController.getCultures);
    router.get('/cultures', geographyController.getAllCultures);
    router.get('/cultures/:name', geographyController.getCultureByName);
    router.get('/cultures/byId/:id', geographyController.getCultureById);
    router.delete('/cultures/:id', geographyController.removeCulture);
    router.put('/cultures/:id', geographyController.editCulture);

    router.post('/regions', geographyController.addRegion);
    router.post('/regions/find', geographyController.getRegions);
    router.get('/regions', geographyController.getAllRegions);
    router.get('/regions/:name', geographyController.getRegionByName);
    router.get('/regions/byId/:id', geographyController.getRegionById);
    router.get('/regions/byContinent/:id', geographyController.getRegionsByContinent);
    router.get('/regions/byCulture/:id', geographyController.getRegionsByCulture);
    router.delete('/regions/:id', geographyController.removeRegion);
    router.put('/regions/:id', geographyController.editRegion);

    router.post('/cities', geographyController.addCity);
    router.post('/cities/find', geographyController.getCities);
    router.get('/cities', geographyController.getAllCities);
    router.get('/cities/:name', geographyController.getCityByName);
    router.get('/cities/byId/:id', geographyController.getCityById);
    router.get('/cities/byContinent/:id', geographyController.getCitiesByContinent);
    router.get('/cities/byCulture/:id', geographyController.getCitiesByCulture);
    router.delete('/cities/:id', geographyController.removeCity);
    router.put('/cities/:id', geographyController.editCity);

    var statsController = require(__appbase + 'controllers/statistics');
    router.get('/stats/', statsController.getStats);

    var twitterController = require('./app/controllers/twitter');
    router.get('/twitter/search/:byKeywords/:tweetCount', twitterController.searchTwitter);

};
