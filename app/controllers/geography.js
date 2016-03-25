module.exports = {
/*
 * continent
 */


    /**
     * @api {get} /api/continents/ Get all continents
     * @apiVersion 0.0.1
     * @apiName GetAllContinents
     * @apiGroup Continents
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{ContinentsModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the continents currently stored.
     *
     */
    getAllContinents: function (req, res) {
        var continentsStore = require('../stores/continents');

        continentsStore.getAll(function(success,continents) {
            res.status(200).json(continents);
        });
    },

    /**
     * @api {post} /api/continents/find Find continents
     * @apiVersion 0.0.1
     * @apiName FindContinents
     * @apiGroup Continents
     *
     *
     * @apiHeaderExample {json} Header-Example
     * {"cardinalDirection": "west"} // get the contintent in the west of the known world.
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : continent}
     *
     * @apiError (404) NotFound No continent with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      {
     *          "message": "Failure. No continent with that data existing!",
     *          "data": message
     *      }
     *
     * @apiError (400) BadRequestError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} BadRequestError
     *     HTTP/1.1 400
     *     {"message" : "Error: Bad request. Usage of non existing schema property!", "error" : err}
     *
     * @apiDescription Find continents matching the search criteria.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/continent.js" target="_blank">continent model</a>.
     */
    getContinents: function(req,res) {
        var continentsStore = require('../stores/continents');
        continentsStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No continents with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/continents/:name Get continent by name
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup Continents
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : continent}
     *
     * @apiError (404) NotFound No continent with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No continent with that data existing!", "data": err };
     *
     * @apiDescription Return the continent named :name.
     */
    getContinentByName: function(req, res) {
        var continentsStore = require('../stores/continents');

        continentsStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No continent with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/continents/byId/:id Get continent by id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup Continents
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : continent}
     *
     * @apiError (404) NotFound No continent with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No continent with that data existing!", "data": err };
     *
     * @apiDescription Return the continent with the specific :id.
     */
    getContinentById: function(req, res) {
        var continentsStore = require('../stores/continents');

        continentsStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No continent with that data existing!',data: message });
        });
    },

/*
 * regions
 */
    /**
     * @api {get} /api/regions/ Get all regions
     * @apiVersion 0.0.1
     * @apiName GetAllRegions
     * @apiGroup Regions
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{RegionsModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the regions currently stored.
     */
    getAllRegions: function (req, res) {
        var regionsStore = require('../stores/regions');

        regionsStore.getAll(function(success,regions) {
            res.status(200).json(regions);
        });
    },

    /**
     * @api {post} /api/regions/find Find regions
     * @apiVersion 0.0.1
     * @apiName FindRegions
     * @apiGroup Regions
     *
     * @apiHeaderExample {json} Header-Example
     * {"continent": "Westeros"} // get all regions in westeros.
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : region}
     *
     * @apiError (404) NotFound No region with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      {
     *          "message": "Failure. No region with that data existing!",
     *          "data": message
     *      }
     *
     * @apiError (400) BadRequestError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} BadRequestError
     *     HTTP/1.1 400
     *     {"message" : "Error: Bad request. Usage of non existing schema property!", "error" : err}
     *
     * @apiDescription Find regions matching the search criteria.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/region.js" target="_blank">region model</a>.
     */
    getRegions: function(req,res) {
        var regionsStore = require('../stores/regions');
        regionsStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No regions with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/regions/:name Get region by name
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup Regions
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : region}
     *
     * @apiError (404) NotFound No region with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No region with that data existing!", "data": err };
     *
     * @apiDescription Return the region named :name.
     */
    getRegionByName: function(req, res) {
        var regionsStore = require('../stores/regions');

        regionsStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No region with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/regions/byId/:id Get region by id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup Regions
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : region}
     *
     * @apiError (404) NotFound No region with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No region with that data existing!", "data": err };
     *
     * @apiDescription Return the region with the specific :id.
     */
    getRegionById: function(req, res) {
        var regionsStore = require('../stores/regions');

        regionsStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No region with that data existing!',data: message });
        });
    },

/*
 * cultures
 */
    /**
     * @api {get} /api/cultures/ Get all cultures
     * @apiVersion 0.0.1
     * @apiName GetAllCultures
     * @apiGroup Cultures
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{RegionsModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the cultures currently stored.
     */
    getAllCultures: function (req, res) {
        var culturesStore = require('../stores/cultures');

        culturesStore.getAll(function(success,cultures) {
            res.status(200).json(cultures);
        });
    },

    /**
     * @api {get} /api/cultures/find Find cultures
     * @apiVersion 0.0.1
     * @apiName FindCultures
     * @apiGroup Cultures
     *
     * @apiHeaderExample {json} Header-Example
     * {"name": "Warg"}
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : culture}
     *
     * @apiError (404) NotFound No culture with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      {
     *          "message": "Failure. No culture with that data existing!",
     *          "data": message
     *      }
     *
     * @apiError (400) BadRequestError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} BadRequestError
     *     HTTP/1.1 400
     *     {"message" : "Error: Bad request. Usage of non existing schema property!", "error" : err}
     *
     * @apiDescription Find cultures matching the search criteria.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/culture.js" target="_blank">culture model</a>.
     */
    getCultures: function(req,res) {
        var culturesStore = require('../stores/cultures');
        culturesStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No cultures with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/cultures/:name Get culture by name
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup Cultures
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : culture}
     *
     * @apiError (404) NotFound No culture with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No culture with that data existing!", "data": err };
     *
     * @apiDescription Return the culture named :name.
     */
    getCultureByName: function(req, res) {
        var culturesStore = require('../stores/cultures');

        culturesStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No culture with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/cultures/byId/:id Get culture by id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup Cultures
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : culture}
     *
     * @apiError (404) NotFound No culture with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No culture with that data existing!", "data": err };
     *
     * @apiDescription Return the culture with the specific :id.
     */
    getCultureById: function(req, res) {
        var culturesStore = require('../stores/cultures');

        culturesStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No culture with that data existing!',data: message });
        });
    },

    /**
     * @api {post} /api/cities/find Find cities
     * @apiVersion 0.0.1
     * @apiName getCities
     * @apiGroup City
     *
     * @apiHeaderExample {json} By continent
     * {"continent": "Westeros"}
     *
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", data: [entries]}
     *
     * @apiError (404) NotFound No city with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No city with that data existing!", "data": err };
     *
     * @apiDescription Find a city with given search criteria.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/city.js" target="_blank">city model</a>.
     */
    getCities: function(req,res) {
        var citiesStore = require('../stores/cities');
        citiesStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No cities with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/cities Get all cities
     * @apiVersion 0.0.1
     * @apiName getAllCities
     * @apiGroup City
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No city with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No city with that data existing!", "data": err };
     *
     * @apiDescription Get all cities.
     */
    getAllCities: function(req,res) {
        var citiesStore = require('../stores/cities');
        citiesStore.getAll(function(success,cities) {
            res.status(200).json(cities);
        });
    },

    /**
     * @api {get} /api/cities/:name Get city by name
     * @apiVersion 0.0.1
     * @apiName getCityByName
     * @apiGroup City
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No city with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No cities with that data existing!", "data": err };
     *
     * @apiDescription Find a city by the name :name.
     */
    getCityByName: function(req,res) {
        var citiesStore = require('../stores/cities');
        citiesStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No cities with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/cities/byId/:id Get city by :id
     * @apiVersion 0.0.1
     * @apiName getCityById
     * @apiGroup City
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No city with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No city with that data existing!", "data": err };
     *
     * @apiDescription Get city by the id :id.
     */
    getCityById: function(req,res) {
        var citiesStore = require('../stores/cities');
        citiesStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No cities with that data existing!',data: message });
        });
    },
};
