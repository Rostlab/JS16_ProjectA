module.exports = {
    /**
     * @api {post} /api/characters/plod Add character PLOD
     * @apiVersion 0.0.1
     * @apiName AddCharacterPlod
     * @apiDescription Add a character PLOD to the collection.<br><br>
     * The name property is required.<br>
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/characterPlod.js" target="_blank">character PLOD model</a>.
     *
     * @apiGroup CharactersPlod
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
        var charactersPlodStore = require('../stores/charactersPlod');
        charactersPlodStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {post} /api/characters/plod/find Find characters PLOD
     * @apiVersion 0.0.1
     * @apiName FindCharactersPlod
     * @apiGroup CharactersPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : characterplod}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      {
     *          "message": "Failure. No character with that data existing!",
     *          "data": message
     *      }
     *
     * @apiError (400) BadRequestError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} BadRequestError
     *     HTTP/1.1 400
     *     {"message" : "Error: Bad request. Usage of non existing schema property!", "error" : err}
     *
     * @apiDescription Find characters matching the search criteria.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/characterplod.js" target="_blank">character PLOD model</a>.
     */
    get: function(req,res) {
        var charactersPlodStore = require('../stores/charactersPlod');
        charactersPlodStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/characters/plod Get all characters PLOD
     * @apiVersion 0.0.1
     * @apiName GetAllCharactersPlod
     * @apiGroup CharactersPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{CharactersPlodModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the characters PLOD currently stored.
     */
    getAll: function (req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getAll(function(success,characters) {
            res.status(200).json(characters);
        });
    },

    /**
     * @api {get} /api/characters/plod/:count Get list of top-x characters by PLOD
     * @apiVersion 0.0.1
     * @apiName GetByPLOD
     * @apiGroup CharactersPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : charactersplod}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No character with that data existing!"};
     *
     * @apiDescription Return a list of top-x PLOD-characters
     */
    getByPLOD: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getByPLOD(req.params.count, function(success, message) {
            if(success)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!'});
        });
    },

    /**
     * @api {get} /api/characters/plod/:id Get character by PLOD id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup CharactersPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : character}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No character with that data existing!", "data": err };
     *
     * @apiDescription Return the character PLOD with the specific :id.
     */
    getById: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/characters/plod/:description Get character by plod description
     * @apiVersion 0.0.1
     * @apiName GetByDescription
     * @apiGroup CharactersPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : character}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No character PLOD with that data existing!", "data": err };
     *
     * @apiDescription Return the character PLOD with the specific :description.
     */
    getByDescription: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.getByDescription(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!',data: message });
        });
    },

    /**
     * @api {delete} /api/characters/:id Remove character PLOD
     * @apiVersion 0.0.1
     * @apiName RemoveCharacterPlod
     * @apiGroup CharactersPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No character PLOD with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No character PLOD with that data existing!", "data": err };
     *
     * @apiDescription Delete the character PLOD with the :id.
     */
    remove: function(req,res) {
        var charactersPlodStore = require('../stores/charactersPlod');
        charactersPlodStore.remove(req.params.id,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No character PLOD with that id is existing.', id: req.params.id });
        });
    },

    /**
     * @api {put} /api/characters/plod/:id Edit character PLOD
     * @apiVersion 0.0.1
     * @apiName EditCharacterPlod
     * @apiGroup CharactersPlod
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : character}
     *
     * @apiError (404) NotFound No character PLOD with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Error. No character PLOD existing with that id", "id": characterplod._id };
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
     * @apiDescription Update an character PLOD with the id :id with some new information.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/characterPlod.js" target="_blank">character plod model</a>.
     */
    edit: function(req, res) {
        var charactersPlodStore = require('../stores/charactersPlod');

        charactersPlodStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No character PLOD existing with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    }
};
