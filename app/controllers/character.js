module.exports = {
    /**
     * @api {post} /api/characters/ Add character
     * @apiVersion 0.0.1
     * @apiName AddCharacter
     * @apiDescription Add a character to the collection.<br><br>
     * The name property is required.<br>
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/character.js" target="_blank">character model</a>.
     *
     * @apiGroup Characters
     *
     * @apiHeaderExample {json} Header-Example
     * {"name": "Stark"}
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
        var charactersStore = require('../stores/characters');
        charactersStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },
    /**
     * @api {get} /api/characters/ Get all characters
     * @apiVersion 0.0.1
     * @apiName GetAllCharacters
     * @apiGroup Characters
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{CharactersModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the characters currently stored.
     */
    getAll: function (req, res) {
        var charactersStore = require('../stores/characters');

        charactersStore.getAll(function(success,characters) {
            res.status(200).json(characters);
        });
    },

    /**
     * @api {post} /api/characters/find Find characters
     * @apiVersion 0.0.1
     * @apiName FindCharacters
     * @apiGroup Characters
     *
     * @apiHeaderExample {json} Header-Example
     * {"male": true} // get all male characters
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : character}
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
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/character.js" target="_blank">character model</a>.
     */
    get: function(req,res) {
        var charactersStore = require('../stores/characters');
        charactersStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/characters/:name Get character by name
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup Characters
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
     * @apiDescription Return the character named :name.
     */
    getByName: function(req, res) {
        var charactersStore = require('../stores/characters');

        charactersStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/characters/byId/:id Get character by id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup Characters
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
     * @apiDescription Return the character with the specific :id.
     */
    getById: function(req, res) {
        var charactersStore = require('../stores/characters');

        charactersStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
        });
    },


    /**
     * @api {put} /api/characters/:id Edit character
     * @apiVersion 0.0.1
     * @apiName EditCharacter
     * @apiGroup Characters
     *
     * @apiHeaderExample {json} Header-Example
     * {"characterPopularity": 9.0} // change characterPopularity to 9.0
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : character}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Error. No character existing with that id", "id": character._id };
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
     * @apiDescription Update an character with the id :id with some new information.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/character.js" target="_blank">character model</a>.
     */
    edit: function(req, res) {
        var charactersStore = require('../stores/characters');

        charactersStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No character exsiting with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {delete} /api/characters/:id Remove character
     * @apiVersion 0.0.1
     * @apiName RemoveCharacter
     * @apiGroup Characters
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No character with that data existing!", "data": err };
     *
     * @apiDescription Delete the character with the :id.
     */
    remove: function(req,res) {
        var charactersStore = require('../stores/characters');
        charactersStore.remove(req.params.id,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No character with that id is existing.', id: req.params.id });
        });
    },

};
