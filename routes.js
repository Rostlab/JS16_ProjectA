module.exports = function (app, router) {

    var defController = require('./app/controllers/default');
    router.get('/', defController.init);

    var housesController = require(__appbase + 'controllers/house');
    router.post('/houses', housesController.add);
    router.post('/houses/find', housesController.get);
    router.post('/houseTypes', housesController.addType);
    router.get('/houses', housesController.getAll);
    router.get('/houseTypes', housesController.getAllTypes);
    router.get('/houses/:houseName', housesController.getByName);
    router.get('/houses/byId/:houseId', housesController.getById);
    router.delete('/houses/:houseId', housesController.remove);
    router.put('/houses/:houseId', housesController.edit);
    router.delete('/houseTypes/:houseTypeId', housesController.removeType);

    var episodeController = require(__appbase + 'controllers/episode');
    router.post('/episodes', episodeController.add);
    router.post('/episodes/find', episodeController.get);
    router.get('/episodes', episodeController.getAll);
    router.get('/episodes/:name', episodeController.getByName);
    router.get('/episodes/byId/:id', episodeController.getById);
    router.delete('/episodes/:id', episodeController.remove);
    router.put('/episodes/:id', episodeController.edit);

    var characterController = require(__appbase + 'controllers/character');
    router.post('/characters', characterController.add);
    router.post('/characters/find', characterController.get);
    router.get('/characters', characterController.getAll);
    router.get('/characters/:name', characterController.getByName);
    router.get('/characters/byId/:id', characterController.getById);
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
    router.delete('/regions/:id', geographyController.removeRegion);
    router.put('/regions/:id', geographyController.editRegion);


    var scraperController = require('./app/controllers/scraper');
    router.get('/scrapper/houses', scraperController.getAllHouses);
    router.get('/scrapper/characters', scraperController.getAllCharacters);

    var twitterController = require('./app/controllers/twitter');
    router.get('/twitter/search/:byKeywords', twitterController.searchTwitter);

}