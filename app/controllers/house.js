module.exports = {
    /**
     * @api {post} /api/houses/ Add house
     * @apiVersion 0.0.1
     * @apiName AddHouse
     * @apiGroup Houses
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Success",
     *       "data": newDbEntry
     *     }
     *
     * @apiError (400) PropertyInvalid A property of the request is not valid to the underlying schema.
     * @apiErrorExample {json} PropertyInvalid:
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. Property not valid to schema.",
     *          "errorProperty": prop
     *     }
     *
     * @apiError (400) ValidationError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} ValidationError:
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. A value for a property is not valid to the underlying schema.",
     *          "error": mongooseError
     *     }
     *
     * @apiDescription Get all houses of the collection.
     */
    add: function (req, res) {
        var housesStore = require('../stores/houses');
        housesStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error. A value for a property is not valid to the underlying schema.', error: message });
        });
    },

    /**
     * @api {get} /api/houses/ Get all houses
     * @apiVersion 0.0.1
     * @apiName GetAllHouses
     * @apiGroup Houses
     *
     * @apiSuccess (200) {Array} houses Array of houses.
     */
    getAll: function (req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getAll(function(success,houses) {
            res.status(200).json(houses);
        });
    },

    /**
     * @api {post} /api/houses/ Find houses
     * @apiVersion 0.0.1
     * @apiName FindHouses
     * @apiGroup Houses
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Success",
     *       "data": houses
     *     }
     *
     * @apiError (404) NotFound Failure. No house with that data existing!.
     * @apiError (400) BadRequest Error: Bad request. Usage of non existing schema property!
     */
    get: function(req,res) {
        var housesStore = require('../stores/houses');
        housesStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    getByName: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getByName(req.params.houseName, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: message });
        });
    },

    getById: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getById(req.params.houseId, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: message });
        });
    },

    edit: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.edit(req.params.houseId, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No house exsiting with that id', id: req.params.houseId });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    remove: function(req,res) {
        var housesStore = require('../stores/houses');
        housesStore.remove(req.params.houseId,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No house with that id is existing.', id: req.params.houseId });
        });
    },

    addType: function (req, res) {
        var housesStore = require('../stores/houses');
        housesStore.addType(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    getAllTypes: function (req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getAllTypes(function(success,types) {
            res.status(200).json(types);
        });
    },

    removeType: function(req,res) {
        var housesStore = require('../stores/houses');
        housesStore.removeType(req.params.houseTypeId,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No houseType with that id is existing.', id: req.params.houseTypeId });
        });
    },
};