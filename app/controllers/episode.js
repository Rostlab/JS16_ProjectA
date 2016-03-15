module.exports = {
    /**
     * @api {post} /api/episodes/ Add an episode
     * @apiVersion 0.0.1
     * @apiName AddEpisode
     * @apiGroup Episodes
     *
     * @apiExample {post} Example
     *     {"name": "The Wars to Come"}
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : episode}
     *
     * @apiError (400) PropertyInvalid A property of the request is not valid to the underlying schema.
     * @apiErrorExample {json} PropertyInvalid
     *      HTTP/1.1 400
     *      {
     *          "message": "Error. Property not valid to schema.",
     *          "errorProperty": prop
     *      }
     *
     * @apiError (400) BadRequestError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} BadRequestError
     *     HTTP/1.1 400
     *     {"message" : "Error: Bad request", "error" : err}
     *
     * @apiDescription Add an episode to the collection with all the required fields
     */
    add: function (req, res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.add(req.body, function (success, message) {
            if (success == 1) {
                res.status(201).json({message: 'Success', data: message});
            } else if (success == 2) {
                res.status(400).json({message: 'Error. Property not valid to schema.', errorProperty: message});
            } else {
                res.status(400).json({message: 'Error.', error: message});
            }
        });
    },

    /**
     * @api {get} /api/episodes/ Get all episodes
     * @apiVersion 0.0.1
     * @apiName GetAllEpisode
     * @apiGroup Episodes
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{EpisodeModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the episodes currently stored
     */
    getAll: function (req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getAll(function (success, episodes) {
            res.status(200).json(episodes);
        });
    },

    /**
     * @api {get} /api/episodes/find Find episodes
     * @apiVersion 0.0.1
     * @apiName FindEpisode
     * @apiGroup Episodes
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : episodes}
     *
     * @apiError (404) NotFound No episode with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      {
     *          "message": "Failure. No episode with that data existing!",
     *          "data": message
     *      }
     *
     * @apiError (400) BadRequestError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} BadRequestError
     *     HTTP/1.1 400
     *     {"message" : "Error: Bad request. Usage of non existing schema property!", "error" : err}
     *
     * @apiDescription Find episodes matching the search criteria
     */
    get: function (req, res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.get(req.body, function (success, message) {
            if (success == 1) {
                res.status(200).json({message: 'Success', data: message});
            } else if (success == 3) {
                res.status(404).json({message: 'Failure. No episode with that data existing!', data: message});
            } else {
                res.status(400).json({
                    message: 'Error: Bad request. Usage of non existing schema property!',
                    error: message
                });
            }
        });
    },

    /**
     * @api {get} /api/episodes/:name Get episodes by name
     * @apiVersion 0.0.1
     * @apiName GetByNameEpisode
     * @apiGroup Episodes
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : episode}
     *
     * @apiError (404) NotFound No episode with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No episode with that data existing!", "data": err };
     *
     * @apiDescription Return all episodes named :name
     */
    getByName: function (req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getByName(req.params.name, function (success, message) {
            if (success == 1) {
                res.status(200).json({message: 'Success', data: message});
            } else {
                res.status(404).json({message: 'Failure. No episode with that data existing!', data: message});
            }
        });
    },

    /**
     * @api {get} /api/episodes/byId/:id Get episodes by id
     * @apiVersion 0.0.1
     * @apiName GetByIdEpisode
     * @apiGroup Episodes
     *
     * @apiParam {String} id Episode _id
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : episode}
     *
     * @apiError (404) NotFound No episode with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No episode with that data existing!", "data": err };
     *
     * @apiDescription Return the episode with the specific :id
     */
    getById: function (req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getById(req.params.id, function (success, message) {
            if (success == 1) {
                res.status(200).json({message: 'Success', data: message});
            } else {
                res.status(404).json({message: 'Failure. No episode with that data existing!', data: message});
            }
        });
    },

    /**
     * @api {put} /api/episodes/:id Edit episode
     * @apiVersion 0.0.1
     * @apiName EditEpisode
     * @apiGroup Episodes
     *
     * @apiParam {String} id Episode _id
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : episode}
     *
     * @apiError (404) NotFound No episode with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Error. No episode exsiting with that id", "id": episode._id };
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
     * @apiDescription Update an episode with the id :id with some new information.
     */
    edit: function (req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.edit(req.params.id, req.body, function (success, message) {
            if (success == 1) {
                res.status(200).json({message: 'Success', data: message});
            } else if (success == 2) {
                res.status(404).json({message: 'Error. No episode exsiting with that id', id: req.params.id});
            } else if (success == 4) {
                res.status(400).json({message: 'Error: Bad request. No such property.', errorProperty: message});
            } else {
                res.status(400).json({message: 'Error', error: message});
            }
        });
    },

    /**
     * @api {delete} /api/episodes/:id Remove episode
     * @apiVersion 0.0.1
     * @apiName RemoveEpisode
     * @apiGroup Episodes
     *
     * @apiParam {String} id Episode _id
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success"}
     *
     * @apiError (404) NotFound No episode with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No episode with that data existing!", "data": err };
     *
     * @apiDescription Delete the episode with the :id
     */
    remove: function (req, res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.remove(req.params.id, function (success) {
            if (success === true) {
                res.status(200).json({message: 'Success'});
            } else {
                res.status(404).json({message: 'Failure: No episode with that id is existing.', id: req.params.id});
            }
        });
    },


     /**
      * @api {get} /api/episodes/byCharacter/:id Get episodes by character
      * @apiVersion 0.0.1
      * @apiName GetEpisodesByCharacter
      * @apiGroup Episodes
      *
      * @apiParam {String} id Character _id
      * @apiSuccessExample {json} Success-Response
      *     HTTP/1.1 200 OK
      *     {"message" : "Success", "data" : episodes}
      *
      * @apiError (404) NotFound No episode with that character existing!
      * @apiErrorExample {json} NotFound
      *      HTTP/1.1 404
      *      { "message": "Failure. No episode with that character existing!", "data": err };
      *
      * @apiDescription Search episodes in which the characterId
      */
    getEpisodesByCharacter: function (req, res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.getEpisodesByCharacter(req.params.id , function (success, message) {
            if (success === 1) {
                res.status(200).json({message: 'Success', data: obj});
            }else if (success === 2){
                res.status(404).json({message: 'Error', error: message});
            }else{
		res.status(404).json({message: 'Failure: No episode with that character is existing.', data: message});
	    } 
        });
    }


};
