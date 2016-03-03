module.exports = function (app, router) {

    var defController = require('./app/controllers/default');
    router.get('/', defController.init);

    var dbFiller = require(__appbase + 'controllers/dbFiller');
    router.get('/dbFiller/houses', dbFiller.fillHouses);
    router.delete('/dbFiller/houses', dbFiller.clearHouses);

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
    router.delete('/characters/:id', characterController.remove);
    router.put('/characters/:id', characterController.edit);
    router.post('/skills', characterController.addSkill);
    router.post('/skills/find', characterController.getSkills);
    router.get('/skills', characterController.getAllSkills);
    router.get('/skills/:name', characterController.getSkillByName);
    router.get('/skills/byId/:id', characterController.getSkillById);
    router.delete('/skills/:id', characterController.removeSkill);
    router.put('/skills/:id', characterController.editSkill);

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



    var twitterController = require('./app/controllers/twitter');
    router.get('/twitter/search/:byKeywords', twitterController.searchTwitter);

};
