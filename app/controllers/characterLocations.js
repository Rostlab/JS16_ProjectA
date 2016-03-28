var CharacterLocations = require(__appbase + 'models/characterLocations');

module.exports = {
    /**
     * @api {get} /api/characters/locations Get all characters and their locations
     * @apiVersion 0.0.1
     * @apiName GetAllCharacterLocations
     * @apiGroup CharacterLocations
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
        CharacterLocations.find(function(err,locations) {
            res.status(200).json(locations);

        });
    },
    /**
     * @api {get} /api/characters/locations/:name Get locations by the name of the character.
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup CharacterLocations
     *
     *
     * @apiParam {Boolean} strict  Optional. Non-strict by default, which looks up case-insensitive and for substrings in the name. Just put ?strict=true for case-sensitive lookup.
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : [characters]}
     *
     * @apiError (404) NotFound No character with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { message: 'Failure. No character with that name existing!', data: lookup };
     *
     * @apiDescription Return the character´s location, which character name is :name.
     */
    getByName: function (req, res) {
        var strict = (req.query.strict === undefined) ? 'false' : req.query.strict;
        if(strict != 'false' && strict != 'true'){
            res.status(400).json({ message: 'Error: Strict option requires to be of type boolean.' });
            return;
        }

        var lookup = (strict == 'true' || strict === true) ? {'name':req.params.name} : {'name':{ "$regex": req.params.name, "$options": "i" } };
        CharacterLocations.find(lookup, function (err, obj) {
            if (err || obj.length === 0) {
                res.status(404).json({ message: 'Failure. No character with that name existing!', data: lookup });
            } else {
                res.status(200).json({ message: 'Success', data: obj });
            }
        });
    },
    /**
     * @api {get} /api/characters/locations/bySlug/:slug Get locations by the slug of the character.
     * @apiVersion 0.0.1
     * @apiName GetBySlug
     * @apiGroup CharacterLocations
     *
     *
     * @apiParam {Boolean} strict  Optional. Non-strict by default, which looks up case-insensitive and for substrings in the name. Just put ?strict=true for case-sensitive lookup.
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : [characters]}
     *
     * @apiError (404) NotFound No character with that slug existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { message: 'Failure. No character with that slug existing!', data: lookup };
     *
     * @apiDescription Return the character´s location, which character slug is :slug.
     */
    getBySlug: function (req, res) {
        var strict = (req.query.strict === undefined) ? 'false' : req.query.strict;
        if(strict != 'false' && strict != 'true'){
            res.status(400).json({ message: 'Error: Strict option requires to be of type boolean.' });
            return;
        }

        var lookup = (strict == 'true' || strict === true) ? {'slug':req.params.slug} : {'slug':{ "$regex": req.params.slug, "$options": "i" } };
        CharacterLocations.find(lookup, function (err, obj) {
            if (err || obj.length === 0) {
                res.status(404).json({ message: 'Failure. No character with that slug existing!', data: lookup });
            } else {
                res.status(200).json({ message: 'Success', data: obj });
            }
        });
    },
    /**
     * @api {get} /api/characters/locations/byLocation/:location Get the characters that have been in the location :location.
     * @apiVersion 0.0.1
     * @apiName GetByLocation
     * @apiGroup CharacterLocations
     *
     *
     * @apiParam {Boolean} strict  Optional. Non-strict by default, which looks up case-insensitive and for substrings in the name. Just put ?strict=true for case-sensitive lookup.
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : [characters]}
     *
     * @apiError (404) NotFound No character with that location existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { message: 'Failure. No character with that location existing!', data: lookup };
     *
     * @apiDescription Return the character´s location, which character slug is :slug.
     */
    getByLocation: function (req, res) {
        var strict = (req.query.strict === undefined) ? 'false' : req.query.strict;
        if(strict != 'false' && strict != 'true'){
            res.status(400).json({ message: 'Error: Strict option requires to be of type boolean.' });
            return;
        }

        var lookup = (strict == 'true' || strict === true) ? {'locations':req.params.location} : {'locations':{ "$regex": req.params.location, "$options": "i" } };
        CharacterLocations.find(lookup, function (err, obj) {
            if (err || obj.length === 0) {
                res.status(404).json({ message: 'Failure. No character with that location existing!', data: lookup });
            } else {
                res.status(200).json({ message: 'Success', data: obj });
            }
        });
    }
};
