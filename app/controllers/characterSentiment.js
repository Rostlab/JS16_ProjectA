module.exports = {
    /**
     * @api {post} /api/characters/sentiment/add Add characters sentiment
     * @apiVersion 0.0.1
     * @apiName AddCharactersSentiment
     * @apiGroup CharactersSentiment
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : charactersentiment}
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
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/charactersentiment.js" target="_blank">character sentiment model</a>.
     */
    add: function(req,res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');
        charactersSentimentStore.add(req.body, function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {post} /api/characters/sentiment/find Find characters sentiment
     * @apiVersion 0.0.1
     * @apiName FindCharactersSentiment
     * @apiGroup CharactersSentiment
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : charactersentiment}
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
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/charactersentiment.js" target="_blank">character sentiment model</a>.
     */
    get: function(req,res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');
        charactersSentimentStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No character sentiment with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/characters/sentiment Get all characters sentiment
     * @apiVersion 0.0.1
     * @apiName GetAllCharactersSentiment
     * @apiGroup CharactersSentiment
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{CharactersSentimentModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the characters sentiments currently stored.
     */
    getAll: function (req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.getAll(function(success,characters) {
            res.status(200).json(characters);
        });
    },

    /**
     * @api {get} /api/characters/sentiment/byDate/:date Get list of character sentiments by a specific date
     * @apiVersion 0.0.1
     * @apiName GetBySentiment
     * @apiGroup CharactersSentiment
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : characterssentiment}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No character with that data existing!"};
     *
     * @apiDescription Return a list of characters sentiment by date
     */
    getByDate: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.getByDate(req.params.date, function(success, message) {
            if(success)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character sentiment with that data existing!'});
        });
    },

    /**
     * @api {get} /api/characters/sentiment/byTimeframe/:startdate/:enddate Get list of character sentiments by a specific time range
     * @apiVersion 0.0.1
     * @apiName GetBySentiment
     * @apiGroup CharactersSentiment
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : characterssentiment}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No character with that data existing!"};
     *
     * @apiDescription Return a list of characters sentiment by time range
     */
    getByTimeframe: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.getByTimeframe(req.params.startdate, req.params.enddate, function(success, message) {
            if(success)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character sentiment with that data existing!'});
        });
    },

    /**
     * @api {get} /api/characters/sentiment/byId/:id Get character sentiment by id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup CharactersSentiment
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
     * @apiDescription Return the character sentiment with the specific :id.
     */
    getById: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/characters/sentiment/byDescription/:description Get character by sentiment description
     * @apiVersion 0.0.1
     * @apiName GetByDescription
     * @apiGroup CharactersSentiment
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : character}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No character sentiment with that data existing!", "data": err };
     *
     * @apiDescription Return the character sentiment with the specific :description.
     */
    getByDescription: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.getByDescription(req.params.description, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character sentiment with that data existing!',data: message });
        });
    }
};
