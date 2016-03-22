module.exports = {
    /**
     * @api {get} /api/events/ Get all events
     * @apiVersion 0.0.1
     * @apiName GetAllEvents
     * @apiGroup Events
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{EventsModel},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiDescription Get all the events currently stored.
     */
    getAll: function (req, res) {
        var eventsStore = require('../stores/events');

        eventsStore.getAll(function(success,events) {
            if (success === true) {
                res.status(200).json(events);
            }
            else {
                res.status(400).json({message: 'Error.', error: message});
            }
        });
    },

    /**
     * @api {post} /api/events/find Find event
     * @apiVersion 0.0.1
     * @apiName FindEvents
     * @apiGroup Events
     *
     * @apiHeaderExample {json} Header-Example
     * {"date": -34} // Find events in 34 BC.
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : event}
     *
     * @apiError (404) NotFound No event with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      {
     *          "message": "Failure. No event with that data existing!",
     *          "data": message
     *      }
     *
     * @apiError (400) BadRequestError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} BadRequestError
     *     HTTP/1.1 400
     *     {"message" : "Error: Bad request. Usage of non existing schema property!", "error" : err}
     *
     * @apiDescription Find events matching the search criteria.<br>
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/event.js" target="_blank">event model</a>.
     */
    get: function(req,res) {
        var eventsStore = require('../stores/events');
        eventsStore.get(req.body, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success === 3)
                res.status(404).json({ message: 'Failure. No event with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    /**
     * @api {get} /api/events/:name Get events by name
     * @apiVersion 0.0.1
     * @apiName GetByName
     * @apiGroup Events
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : event}
     *
     * @apiError (404) NotFound No event with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No event with that data existing!", "data": err };
     *
     * @apiDescription Return the event named :name.
     */
    getByName: function(req, res) {
        var eventsStore = require('../stores/events');

        eventsStore.getByName(req.params.name, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No event with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/events/byId/:id Get event by id
     * @apiVersion 0.0.1
     * @apiName GetById
     * @apiGroup Events
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message" : "Success", "data" : event}
     *
     * @apiError (404) NotFound No event with that data existing!
     * @apiErrorExample {json} NotFound
     *      HTTP/1.1 404
     *      { "message": "Failure. No event with that data existing!", "data": err };
     *
     * @apiDescription Return the event with the specific :id.
     */
    getById: function(req, res) {
        var eventsStore = require('../stores/events');

        eventsStore.getById(req.params.id, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No event with that data existing!',data: message });
        });
    },
};
