module.exports = {
    /**
     * @api {post} /api/episodes/ Add an episode
     * @apiVersion 0.0.1
     * @apiName AddEpisode
     * @apiGroup Episodes
     *
     * @apiDescription Add an episode to the collection with all the required fields
     */
    add: function (req, res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {get} /api/episodes/ Get all episodes
     * @apiVersion 0.0.1
     * @apiName GetAllEpisode
     * @apiGroup Episodes
     *
     * @apiDescription Get all the episodes currently stored
     */
    getAll: function (req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getAll(function(success,episodes) {
            res.status(200).json(episodes);
        });
    },

    /**
     * @api {get} /api/episodes/find Find episodes
     * @apiVersion 0.0.1
     * @apiName FindEpisode
     * @apiGroup Episodes
     *
     * @apiDescription Find episodes matching the search criteria
     */
    get: function(req,res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No episode with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/episodes/:name Get episodes by name
     * @apiVersion 0.0.1
     * @apiName GetByNameEpisode
     * @apiGroup Episodes
     *
     * @apiDescription Return all episodes named :name
     */
    getByName: function(req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No episode with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/episodes/byId/:id Get episodes by id
     * @apiVersion 0.0.1
     * @apiName GetByIdEpisode
     * @apiGroup Episodes
     *
     * @apiDescription Return the episode with the specific :id
     */
    getById: function(req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No episode with that data existing!',data: message });
        });
    },

    /**
     * @api {put} /api/episodes/:id Get episodes by id
     * @apiVersion 0.0.1
     * @apiName EditEpisode
     * @apiGroup Episodes
     *
     * @apiDescription Update an episode with some new information
     */
    edit: function(req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No episode exsiting with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {delete} /api/episodes/:id Get episodes by id
     * @apiVersion 0.0.1
     * @apiName DeleteEpisode
     * @apiGroup Episodes
     *
     * @apiDescription Delete the episode with the :id
     */
    remove: function(req,res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.remove(req.params.id,function(success) {
            if(success == true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No episode with that id is existing.', id: req.params.id });
        });
    }
};