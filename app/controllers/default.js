module.exports = {
	/**
	 * @api {get} /api/ Default route
	 * @apiVersion 0.0.1
	 * @apiName Default
	 * @apiGroup Default
	 *
	 * @apiDescription This function shows the "hello world" message to prove the nodejs app is working
	 */
	init: function (req, res) {
		res.render('default');
    }
};