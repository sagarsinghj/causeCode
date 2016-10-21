var Todo = require('./models/stores');
var storeController = require('./controller/store-controller');

module.exports = function(app) {

	// create store and send back all store names after creation
	app.post('/api/saveStores', storeController.saveStore);

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};