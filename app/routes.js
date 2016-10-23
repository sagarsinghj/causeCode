var Todo = require('./models/stores');
var storeController = require('./controller/store-controller');

module.exports = function(app) {

	// create store and send back store names after creation
	app.post('/api/saveStores', storeController.saveStore);
	// get all the store from database
	app.get('/api/getStores', storeController.getStores);
	// delete a store from database
	app.delete('/api/deleteStore/:storeId', storeController.deleteStore);
	// update a store from database
	app.put('/api/updateStore/:storeId', storeController.updateStore);

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};