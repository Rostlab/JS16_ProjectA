module.exports = function (app, router) {

    var defController = require('./app/controllers/default');
    router.get('/', defController.init);

    var housesController = require('./app/controllers/house');
    router.post('/houses', housesController.addHouse);
    router.post('/houseTypes', housesController.addHouseType);
    router.get('/houses', housesController.getHouses);
    router.get('/houseTypes', housesController.getHouseTypes);
    router.get('/houses/:houseName', housesController.getHouseByName);
    router.get('/houses/byId/:houseId', housesController.getHouseById);
    router.delete('/houses/:houseId', housesController.removeHouse);
    router.put('/houses/:houseId', housesController.editHouse);
    router.delete('/houseTypes/:houseId', housesController.removeHouseType);

    var episodeController = require(__appbase + 'controllers/episode');
    router.post('/episodes', episodeController.add);
    router.get('/episodes', episodeController.getAll);
    router.get('/episodes/:name', episodeController.getByName);
    router.get('/episodes/byId/:id', episodeController.getById);
    router.delete('/episodes/:id', episodeController.remove);
    router.put('/episodes/:id', episodeController.edit);


    var scraperController = require('./app/controllers/scraper');
    router.get('/scrapper/houses', scraperController.getAllHouses);
    router.get('/scrapper/characters', scraperController.getAllCharacters);

    var twitterController = require('./app/controllers/twitter');
    router.get('/twitter/search/:byKeywords', twitterController.searchTwitter);

}