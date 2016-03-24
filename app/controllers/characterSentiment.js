module.exports = {
    /**
     * @api {post} /api/sentiment?token=XYZ Add characters sentiment
     * @apiVersion 0.0.1
     * @apiName Add
     * @apiGroup CharacterSentiment
     *
     * @apiParam {token} Essential. Please ask @kordianbruck for API access token. Make your request in this query: http://got-api.bruck.me/api/sentiment?token=XYZ
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 201 OK
     *     {"message" : "Success", "data" : message }
     *
     * @apiError (400) message: 'Error. Property not valid to schema.', errorProperty: message 
     *
     * @apiError (400) message: 'Error.', error: message
     *
     * @apiDescription Add new character sentiment values. Take a look at https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/characterSentiment.js to understand how the JSON-body should look like.
     */
    add: function(req, res) {
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
     * @api {post} /api/sentiment/find Get characters sentiment
     * @apiVersion 0.0.1
     * @apiName Get
     * @apiGroup CharacterSentiment 
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : message}
     *
     * @apiError (404) message: 'Failure. No character sentiment with that data existing!',data: message 
     * @apiError (400) message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message
     *
     * @apiDescription Get character sentiment values.
     */
    get: function(req, res) {
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
     * @api {get} /api/sentiment Get all characters sentiment
     * @apiVersion 0.0.1
     * @apiName GetAll
     * @apiGroup CharacterSentiment 
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {charactersSentiment}
     *
     * @apiError (404) message: 'Failure. No character sentiment with that data existing!',data: message 
     *
     * @apiDescription Get all character sentiment values.
     */
    getAll: function (req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.getAll(function(success,characters) {
            if(success)
                res.status(200).json(characters);
            else
                res.status(404).json({ message: 'Failure. No character Sentiment with that data existing!'});

        });
    },

    /**
     * @api {get} /api/sentiment/byDate/:date Get all characters sentiment by a specific date
     * @apiVersion 0.0.1
     * @apiName GetByDate
     * @apiGroup CharacterSentiment 
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Failure. No character sentiment with that data existing!'
     *
     * @apiDescription Get character sentiment values by a specific date
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
     * @api {get} /api/sentiment/byTimeRange/:beginDate/:endDate Get all characters sentiment within timerange
     * @apiVersion 0.0.1
     * @apiName GetByTimeRange
     * @apiGroup CharacterSentiment 
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Failure. No character sentiment with that data existing!',data: message 
     *
     * @apiDescription Get all character sentiment values within a timerange
     */
    getByTimeRange: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.getBySentiment((req.params.beginDate || req.params.endDate), function(success, message) {
            if(success)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character sentiment with that data existing!'});
        });
    },

    /**
     * @api {get} /api/sentiment/byId/:id Get characters sentiment by :id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup CharacterSentiment 
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Failure. No character sentiment with that data existing!',data: message 
     *
     * @apiDescription Get character sentiment values by :id
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
     * @api {get} /api/sentiment/byDescription/:description Get characters sentiment by :description
     * @apiVersion 0.0.1
     * @apiName GetByDescription
     * @apiGroup CharacterSentiment 
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Failure. No character sentiment with that data existing!',data: message 
     *
     * @apiDescription Get character sentiment values by :description
     */
    getByDescription: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.getByDescription(req.params.description, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character Sentiment with that data existing!',data: message });
        });
    },

    /**
     * @api {put} /api/sentiment/edit/:id Edit characters sentiment by :id
     * @apiVersion 0.0.1
     * @apiName Edit
     * @apiGroup CharacterSentiment 
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Error. No character exsiting with that id', id: :id 
     *
     * @apiError (400) message: 'Error: Bad request. No such property.', errorProperty: message 
     *
     * @apiError (400) message: 'Error.', error: message 
     *
     * @apiDescription Edit character sentiment values by :id
     */
    edit: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.edit(req.params.id, function(success, message) {
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
     * @api {delete} /api/sentiment/remove/:id Delete characters sentiment by :id
     * @apiVersion 0.0.1
     * @apiName Delete
     * @apiGroup CharacterSentiment 
     * 
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { message: 'Success', data: message }
     *
     * @apiError (404) message: 'Error. No Sentiment existing with that id', id: :id 
     *
     * @apiError (400) message: 'Error: Bad request. No such property.', errorProperty: message
     *
     * @apiError (400) message: 'Error.', error: message
     *
     * @apiDescription Delete character sentiment values by :id
     */
    remove: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersSentiment');

        charactersSentimentStore.remove(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No Sentiment existing with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    }
};
