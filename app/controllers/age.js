module.exports = {
    /**
     * @api {post} /api/ages/ Add age
     * @apiVersion 0.0.1
     * @apiName AddAge
     * @apiDescription Add an age to the collection.
     * @apiGroup Ages
     *
     * @apiHeaderExample {json} Header-Example
     * {"name": "Dawn of Days"}
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
    add: function (req, res) {
        var agesStore = require('../stores/ages');
        agesStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },
    /**
     * @api {get} /api/ages/ Get all ages
     * @apiVersion 0.0.1
     * @apiName GetAllAges
     * @apiGroup Ages
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{AgesModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the ages currently stored.
     */
    getAll: function (req, res) {
        var agesStore = require('../stores/ages');

        agesStore.getAll(function(success,ages) {
            if (success == true) {
                res.status(200).json(ages);
            }
            else {
                res.status(400).json({message: 'Error.', error: message});
            }
        });
    },

    /**
     * @api {get} /api/ages/find Find ages
     * @apiVersion 0.0.1
     * @apiName FindAges
     * @apiGroup Ages
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : age}
     *
     * @apiError (404) NotFound No age with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      {
     *          "message": "Failure. No age with that data existing!",
     *          "data": message
     *      }
     *
     * @apiError (400) BadRequestError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} BadRequestError
     *     HTTP/1.1 400
     *     {"message" : "Error: Bad request. Usage of non existing schema property!", "error" : err}
     *
     * @apiDescription Find ages matching the search criteria.
     */
    get: function(req,res) {
        var agesStore = require('../stores/ages');
        agesStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No age with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/ages/:name Get ages by name
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup Ages
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : age}
     *
     * @apiError (404) NotFound No age with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No age with that data existing!", "data": err };
     *
     * @apiDescription Return the age named :name
     */
    getByName: function(req, res) {
        var agesStore = require('../stores/ages');

        agesStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No age with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/ages/byId/:id Get age by id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup Ages
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : age}
     *
     * @apiError (404) NotFound No age with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No age with that data existing!", "data": err };
     *
     * @apiDescription Return the age with the specific :id
     */
    getById: function(req, res) {
        var agesStore = require('../stores/ages');

        agesStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No age with that data existing!',data: message });
        });
    },


    /**
     * @api {put} /api/ages/:id Edit age
     * @apiVersion 0.0.1
     * @apiName EditAges
     * @apiGroup Ages
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : age}
     *
     * @apiError (404) NotFound No age with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Error. No age existing with that id", "id": age._id };
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
     * @apiDescription Update an age with the id :id with some new information.
     */
    edit: function(req, res) {
        var agesStore = require('../stores/ages');

        agesStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No age existing with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {delete} /api/ages/:id Remove age
     * @apiVersion 0.0.1
     * @apiName RemoveAge
     * @apiGroup Ages
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No age with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No age with that data existing!", "data": err };
     *
     * @apiDescription Delete the age with the :id
     */
    remove: function(req,res) {
        var agesStore = require('../stores/ages');
        agesStore.remove(req.params.id,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No age with that id is existing.', id: req.params.id });
        });
    }

};
