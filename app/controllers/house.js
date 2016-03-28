module.exports = {
    /**
     * @api {get} /api/houses/ Get all houses
     * @apiVersion 0.0.1
     * @apiName GetAllHouses
     * @apiDescription Get all houses.
     * @apiGroup Houses
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     *       "_id": "56d331be37f9bc06554c8af0",
     *       "words": "Hear Me Roar!",
     *       "name": "Lennister",
     *       "__v": 0,
     *       "updatedAt": "2016-02-28T17:43:26.246Z",
     *       "createdAt": "2016-02-28T17:43:26.245Z",
     *       "ancestralWeapon": [],
     *       "title": []
     *    }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getAll: function (req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getAll(function(success,houses) {
            res.status(200).json(houses);
        });
    },

    /**
     * @api {post} /api/houses/ Find houses
     * @apiVersion 0.0.1
     * @apiName FindHouses
     * @apiDescription Find house by search criteria.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/house.js" target="_blank">house model</a>.
     * @apiGroup Houses
     *
     * @apiHeaderExample {json} Header-Example
     * {"region": "Crownlands"} // Find houses in the region crownloands.
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *
     * {
     *    "message": "Success",
     *    "data": [
     *       {
     *          "_id": "56d331be37f9bc06554c8af0",
     *          "words": "Hear Me Roar!",
     *          "name": "Lennister",
     *          "__v": 0,
     *          "updatedAt": "2016-02-28T17:43:26.246Z",
     *          "createdAt": "2016-02-28T17:43:26.245Z",
     *          "ancestralWeapon": [],
     *          "title": []
     *       }
     *    ]
     * }
     *
     * @apiError (404) NotFound No house with that data existing!
     * @apiErrorExample {json} NotFound
     *     HTTP/1.1 404
     *     {
     *          "message": "Failure. No house with that data existing!",
     *          "data": {"words": "Hear Me Laugh!"}
     *     }
     *
     * @apiError (400) PropertyInvalid A property of the request is not valid to the underlying schema.
     * @apiErrorExample {json} PropertyInvalid
     *     HTTP/1.1 400
     *     {
     *          "message": "Error: Bad request. Usage of non existing schema property!",
     *          "errorProperty": prop
     *     }
     */
    get: function(req,res) {
        var housesStore = require('../stores/houses');
        housesStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },
    /**
     * @api {get} /api/houses/:name Get house by name
     * @apiVersion 0.0.1
     * @apiName GetHouseByName
     * @apiDescription Return the house named :name.
     * @apiGroup Houses
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Success",
     *    "data": [
     *       {
     *          "_id": "56d331be37f9bc06554c8af0",
     *          "words": "Hear Me Roar!",
     *          "name": "Lennister",
     *          "__v": 0,
     *          "updatedAt": "2016-02-28T17:43:26.246Z",
     *          "createdAt": "2016-02-28T17:43:26.245Z",
     *          "ancestralWeapon": [],
     *          "title": []
     *       }
     *    ]
     * }
     *
     * @apiError (404) NotFound No house with that data existing!
     * @apiErrorExample {json} NotFound
     *     HTTP/1.1 404
     *     {
     *          "message": "Failure. No house with that data existing!",
     *          "data": {"words": "Hear Me Laugh!"}
     *     }
     */
    getByName: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getByName(req.params.houseName, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/houses/byId/:id Get house by id
     * @apiVersion 0.0.1
     * @apiName GetHouseById
     * @apiDescription Return the house with the id :id.
     * @apiGroup Houses
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Success",
     *    "data": [
     *       {
     *          "_id": "56d331be37f9bc06554c8af0",
     *          "words": "Hear Me Roar!",
     *          "name": "Lennister",
     *          "__v": 0,
     *          "updatedAt": "2016-02-28T17:43:26.246Z",
     *          "createdAt": "2016-02-28T17:43:26.245Z",
     *          "ancestralWeapon": [],
     *          "title": []
     *       }
     *    ]
     * }
     *
     * @apiError (404) NotFound No house with that data existing!
     * @apiErrorExample {json} NotFound
     *     HTTP/1.1 404
     *     {
     *          "message": "Failure. No house with that data existing!",
     *          "data": {"id": "56d331be37f9bc06554c8af1"}
     *     }
     */
    getById: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getById(req.params.houseId, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: message });
        });
    },
};