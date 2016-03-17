module.exports = {
/*
 * continent
 */
    /**
     * @api {post} /api/continents/ Add continents
     * @apiVersion 0.0.1
     * @apiName Add continents
     * @apiDescription Add a continent to the collection.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/continent.js" target="_blank">continent model</a>.
     * @apiGroup Continents
     *
     * @apiHeaderExample {json} Header-Example
     * {"name": "Europe"}
     *
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Success",
     *       "data": newDbEntry
     *     }
     *
     * @apiError (400) PropertyInvalid A property of the request is not valid to the underlying schema.
     * @apiErrorExample {json} PropertyInvalid
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. Property not valid to schema.",
     *          "errorProperty": prop
     *     }
     *
     * @apiError (400) ValidationError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} ValidationError
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. A value for a property is not valid to the underlying schema.",
     *          "error": mongooseError
     *     }
     *
     */
    addContinent: function (req, res) {
        var continentsStore = require('../stores/continents');
        continentsStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

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

    /**
     * @api {put} /api/continents/:id Edit continent
     * @apiVersion 0.0.1
     * @apiName EditContinent
     * @apiGroup Continents
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : region}
     *
     * @apiError (404) NotFound No continent with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Error. No continent existing with that id", "id": continent._id };
     *
     * @apiError (400) InvalidProperty No such property
     * @apiErrorExample {json} InvalidProperty
     *      HTTP/1.1 404
     *      { "message": "Error: Bad request. No such property", "errorProperty": property };
     *
     * @apiError (400) GeneralError Mongoose error.
     * @apiErrorExample {json} GeneralError
     *      HTTP/1.1 404
     *      { "message": "Error", "error": err };
     *
     * @apiDescription Update an continent with the id :id with some new information.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/continent.js" target="_blank">continent model</a>.
     */
    editContinent: function(req, res) {
        var continentsStore = require('../stores/continents');

        continentsStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No continent exsiting with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {delete} /api/continents/:id Remove continent
     * @apiVersion 0.0.1
     * @apiName RemoveContinent
     * @apiGroup Continents
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No continent with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No continent with that data existing!", "data": err };
     *
     * @apiDescription Remove the continent with the :id.
     */
    removeContinent: function(req,res) {
        var continentsStore = require('../stores/continents');
        continentsStore.remove(req.params.id,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No continent with that id is existing.', id: req.params.id });
        });
    },
/*
 * regions
 */
    /**
     * @api {post} /api/regions/ Add regions
     * @apiVersion 0.0.1
     * @apiName Add regions
     * @apiDescription Add a region to the collection.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/region.js" target="_blank">region model</a>.
     * @apiGroup Regions
     *
     * @apiHeaderExample {json} Header-Example
     * {"name": "Crownland"} // add crownland region
     *
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Success",
     *       "data": newDbEntry
     *     }
     *
     * @apiError (400) PropertyInvalid A property of the request is not valid to the underlying schema.
     * @apiErrorExample {json} PropertyInvalid
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. Property not valid to schema.",
     *          "errorProperty": prop
     *     }
     *
     * @apiError (400) ValidationError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} ValidationError
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. A value for a property is not valid to the underlying schema.",
     *          "error": mongooseError
     *     }
     *
     */
    addRegion: function (req, res) {
        var regionsStore = require('../stores/regions');
        regionsStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

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
     * @api {get} /api/regions/find Find regions
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


    /**
     * @api {put} /api/regions/:id Edit region
     * @apiVersion 0.0.1
     * @apiName EditRegion
     * @apiGroup Regions
     *
     *
     * @apiHeaderExample {json} Header-Example
     * {"continent": "Esos"} // change the continent of the region to esos.
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : region}
     *
     * @apiError (404) NotFound No region with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Error. No region existing with that id", "id": region._id };
     *
     * @apiError (400) InvalidProperty No such property
     * @apiErrorExample {json} InvalidProperty
     *      HTTP/1.1 404
     *      { "message": "Error: Bad request. No such property", "errorProperty": property };
     *
     * @apiError (400) GeneralError Mongoose error.
     * @apiErrorExample {json} GeneralError
     *      HTTP/1.1 404
     *      { "message": "Error", "error": err };
     *
     * @apiDescription Update an region with the id :id with some new information.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/region.js" target="_blank">region model</a>.
     */
    editRegion: function(req, res) {
        var regionsStore = require('../stores/regions');

        regionsStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No region exsiting with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {delete} /api/regions/:id Remove region
     * @apiVersion 0.0.1
     * @apiName RemoveRegion
     * @apiGroup Regions
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No region with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No region with that data existing!", "data": err };
     *
     * @apiDescription Delete the region with the :id
     */
    removeRegion: function(req,res) {
        var regionsStore = require('../stores/regions');
        regionsStore.remove(req.params.id,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No region with that id is existing.', id: req.params.id });
        });
    },


/*
 * cultures
 */
    /**
     * @api {post} /api/cultures/ Add cultures
     * @apiVersion 0.0.1
     * @apiName Add cultures
     * @apiDescription Add a culture to the collection.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/culture.js" target="_blank">culture model</a>.
     * @apiGroup Cultures
     *
     * @apiHeaderExample {json} Header-Example
     * {"name": "Warg"}
     *
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Success",
     *       "data": newDbEntry
     *     }
     *
     * @apiError (400) PropertyInvalid A property of the request is not valid to the underlying schema.
     * @apiErrorExample {json} PropertyInvalid
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. Property not valid to schema.",
     *          "errorProperty": prop
     *     }
     *
     * @apiError (400) ValidationError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} ValidationError
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. A value for a property is not valid to the underlying schema.",
     *          "error": mongooseError
     *     }
     */
    addCulture: function (req, res) {
        var culturesStore = require('../stores/cultures');
        culturesStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

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
     * @api {put} /api/cultures/:id Edit culture
     * @apiVersion 0.0.1
     * @apiName EditCulture
     * @apiGroup Cultures
     *
     * @apiHeaderExample {json} Header-Example
     * {"name": "Bastardy"} // change name to bastardy
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : culture}
     *
     * @apiError (404) NotFound No culture with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Error. No culture existing with that id", "id": culture._id };
     *
     * @apiError (400) InvalidProperty No such property
     * @apiErrorExample {json} InvalidProperty
     *      HTTP/1.1 404
     *      { "message": "Error: Bad request. No such property", "errorProperty": property };
     *
     * @apiError (400) GeneralError Mongoose error.
     * @apiErrorExample {json} GeneralError
     *      HTTP/1.1 404
     *      { "message": "Error", "error": err };
     *
     * @apiDescription Update an culture with the id :id with some new information.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/culture.js" target="_blank">culture model</a>.
     */
    editCulture: function(req, res) {
        var culturesStore = require('../stores/cultures');

        culturesStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No culture exsiting with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {delete} /api/cultures/:id Remove character
     * @apiVersion 0.0.1
     * @apiName RemoveCulture
     * @apiGroup Cultures
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No culture with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No culture with that data existing!", "data": err };
     *
     * @apiDescription Delete the culture with the :id.
     */
    removeCulture: function(req,res) {
        var culturesStore = require('../stores/cultures');
        culturesStore.remove(req.params.id,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No culture with that id is existing.', id: req.params.id });
        });
    },

    /**
     * @api {post} /api/city Add a city
     * @apiVersion 0.0.1
     * @apiName addCity
     * @apiGroup City
     *
     * @apiHeaderExample {json} Header-Example
     * {"name": "Winterfell"}
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
     * @apiDescription Add a new city.
     */
    addCity: function(req,res) {
        var citiesStore = require('../stores/cities');
        citiesStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {post} /api/cities/find Find cities
     * @apiVersion 0.0.1
     * @apiName getCities
     * @apiGroup City
     *
     * @apiHeaderExample {json} By priority range
     * {"priority": "<=2"}
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

    /**
     * @api {delete} /api/cities/:id Remove city
     * @apiVersion 0.0.1
     * @apiName removeCity
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
     * @apiDescription Delete the city with the id :id.
     */
    removeCity: function(req,res) {
        var citiesStore = require('../stores/cities');
        citiesStore.remove(req.params.id,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No cities with that id is existing.', id: req.params.id });
        });
    }, 

    /**
     * @api {put} /api/cities/:id Edit city
     * @apiVersion 0.0.1
     * @apiName editCity
     * @apiGroup City
     *
     * @apiHeaderExample {json} Header-Example
     * {"region": "Crownland"} // Change region to crownland.
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
     * @apiDescription Edit the city with the :id.
     */
    editCity: function(req,res) {
        var citiesStore = require('../stores/cities');
        citiesStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No cities existing with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });

    }
};
