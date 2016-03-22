module.exports = {
    /**
     * @api {get} /api/ages/ Get all ages
     * @apiVersion 0.0.1
     * @apiName GetAllAges
     * @apiGroup Ages
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{AgesModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the ages currently stored.
     */
    getAll: function (req, res) {
        var agesStore = require('../stores/ages');

        agesStore.getAll(function(success,ages) {
            if (success === true) {
                res.status(200).json(ages);
            }
            else {
                res.status(400).json({message: 'Error.', error: message});
            }
        });
    },

    /**
     * @api {post} /api/ages/find Find ages
     * @apiVersion 0.0.1
     * @apiName FindAges
     * @apiGroup Ages
     *
     *
     * @apiHeaderExample {json} Header-Example
     * {"startDate": "<0"}
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : age}
     *
     * @apiError (404) NotFound No age with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      {
     *          "message": "Failure. No age with that data existing!",
     *          "data": message
     *      }
     *
     * @apiError (400) BadRequestError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} BadRequestError
     *     HTTP/1.1 400
     *     {"message" : "Error: Bad request. Usage of non existing schema property!", "error" : err}
     *
     * @apiDescription Find ages matching the search criteria.<br>
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/age.js" target="_blank">age model</a>.
     */
    get: function(req,res) {
        var agesStore = require('../stores/ages');
        agesStore.get(req.body, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success === 3)
                res.status(404).json({ message: 'Failure. No age with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/ages/:name Get ages by name
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup Ages
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : age}
     *
     * @apiError (404) NotFound No age with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No age with that data existing!", "data": err };
     *
     * @apiDescription Return the age named :name.
     */
    getByName: function(req, res) {
        var agesStore = require('../stores/ages');

        agesStore.getByName(req.params.name, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No age with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/ages/byId/:id Get age by id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup Ages
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : age}
     *
     * @apiError (404) NotFound No age with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No age with that data existing!", "data": err };
     *
     * @apiDescription Return the age with the specific :id.
     */
    getById: function(req, res) {
        var agesStore = require('../stores/ages');

        agesStore.getById(req.params.id, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No age with that data existing!',data: message });
        });
    },
};
