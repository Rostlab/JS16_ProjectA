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
    }
};
