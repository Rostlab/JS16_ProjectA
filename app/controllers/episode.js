module.exports = {
    /**
     * @api {get} /api/episodes/ Get all episodes
     * @apiVersion 0.0.1
     * @apiName GetAllEpisode
     * @apiGroup Episodes
     *
     * @apiSuccess (200) {Date} airDate The date, when the episode first aired on TV. No time information, which is to ignore.
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{EpisodeModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the episodes currently stored.
     */
    getAll: function (req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getAll(function (success, episodes) {
            res.status(200).json(episodes);
        });
    },

    /**
     * @api {post} /api/episodes/find Find episodes
     * @apiVersion 0.0.1
     * @apiName FindEpisode
     * @apiGroup Episodes
     *
     * @apiExample {post} Example
     *     {"nr": 2, "season": 4} // get episode S04E02
     *
     * @apiSuccess (200) {Date} airDate The date, when the episode first aired on TV. No time information, which is to ignore.
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
     * @apiDescription Find episodes matching the search criteria. <br>
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/episode.js" target="_blank">episode model</a>.
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
     * @apiSuccess (200) {Date} airDate The date, when the episode first aired on TV. No time information, which is to ignore.
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : episode}
     *
     * @apiError (404) NotFound No episode with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No episode with that data existing!", "data": err };
     *
     * @apiDescription Return all episodes named :name.
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
     * @apiSuccess (200) {Date} airDate The date, when the episode first aired on TV. No time information, which is to ignore.
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : episode}
     *
     * @apiError (404) NotFound No episode with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No episode with that data existing!", "data": err };
     *
     * @apiDescription Return the episode with the specific :id.
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
     * @api {get} /api/episodes/byCharacter/:id Get episodes by character
     * @apiVersion 0.0.1
     * @apiName GetEpisodesByCharacter
     * @apiGroup Episodes
     *
     * @apiParam {String} id Character _id
     * @apiSuccess (200) {Date} airDate The date, when the episode first aired on TV. No time information, which is to ignore.
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : episodes}
     *
     * @apiError (404) NotFound No episode with that character existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No episode with that character existing!", "data": err };
     *
     * @apiDescription Search episodes in which the character id appears.
     */
    getEpisodesByCharacter: function (req, res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.getEpisodesByCharacter(req.params.id, function (success, message) {
            if (success === 1) {
                res.status(200).json({message: 'Success', data: obj});
            } else if (success === 2) {
                res.status(404).json({message: 'Error', error: message});
            } else {
                res.status(404).json({message: 'Failure: No episode with that character is existing.', data: message});
            }
        });
    }


};
