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

    /*var episodeController = require(__appbase + 'controllers/episode');
    router.post('/episodes', episodeController.add);
    router.get('/episodes', episodeController.getAll);
    router.get('/episodes/:name', episodeController.getByName);
    router.get('/episodes/byId/:id', episodeController.getById);
    router.delete('/episodes/:id', episodeController.remove);
    router.put('/episodes/:id', episodeController.edit);*/


    var scraperController = require('./app/controllers/scraper');
    router.get('/scrapper/houses', scraperController.getAllHouses);
    router.get('/scrapper/characters', scraperController.getAllCharacters);

    var twitterController = require('./app/controllers/twitter');
    router.get('/twitter/search/:byKeywords', twitterController.searchTwitter);

}