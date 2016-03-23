module.exports = {
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
     *
     * @apiParam {Boolean} strict  Optional. Non-strict by default, which looks up case-insensitive and for substrings in the name. Just put ?strict=true for case-sensitive lookup.
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
        var strict = (req.query.strict === undefined) ? 'false' : req.query.strict;
        console.log(strict);
        if(strict != 'false' && strict != 'true'){
            res.status(400).json({ message: 'Error: Strict option requires to be of type boolean.' });
            return;
        }
        charactersStore.getByName(req.params.name, strict, function(success, message) {
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
};
