var CharacterPath = require(__appbase + 'models/characterPath');

module.exports = {
    /**
     * @api {get} /api/characters/paths Get all characters with paths
     * @apiVersion 0.0.1
     * @apiName GetAllCharacterPaths
     * @apiGroup CharacterPaths
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{CharacterPath},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the characters with paths.
     */
    getAll: function (req, res) {
        CharacterPath.find(function(err,locations) {
            res.status(200).json(locations);

        });
    },
    /**
     * @api {get} /api/characters/paths/:name Get paths by the name of the character.
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup CharacterPaths
     *
     *
     * @apiParam {Boolean} strict  Optional. Non-strict by default, which looks up case-insensitive and for substrings in the name. Just put ?strict=true for case-sensitive lookup.
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : [charactersPath]}
     *
     * @apiError (404) NotFound No character with paths has the name :name!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { message: 'Failure. No character with paths has the given name!', data: lookup };
     *
     * @apiDescription Return the character´s paths, which character name is :name.
     */
    getByName: function (req, res) {
        var strict = (req.query.strict === undefined) ? 'false' : req.query.strict;
        if(strict != 'false' && strict != 'true'){
            res.status(400).json({ message: 'Error: Strict option requires to be of type boolean.' });
            return;
        }

        var lookup = (strict == 'true' || strict === true) ? {'name':req.params.name} : {'name':{ "$regex": req.params.name, "$options": "i" } };
        CharacterPath.find(lookup, function (err, obj) {
            if (err || obj.length === 0) {
                res.status(404).json({ message: 'Failure. No character with that name existing!', data: lookup });
            } else {
                res.status(200).json({ message: 'Success', data: obj });
            }
        });
    }
};
