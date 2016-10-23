var stores = require('../models/stores');


exports.saveStore = function(req,res){
	stores.create({
		storeName : req.body.storeName,
		position:[req.body.lat, req.body.lon]
	}, function(err, store) {
		if (err)
			res.send(err);
		
		stores.find(function(err, storeAll) {
			if (err)
				res.send(err)
			res.json(storeAll);
		});
	});
}

exports.getStores = function(req, res){
	stores.find(function(err, allStores) {
		if (err)
			res.send(err)

		res.json(allStores);
	});
}

exports.deleteStore = function(req,res){
	var id = req.params.storeId;
	stores.remove({
		_id : id
	}, function(err, store) {
		if (err)
			res.send(err);

		stores.find(function(err, storeAll) {
			if (err)
				res.send(err)
			res.json(storeAll);
		});
	});
}


exports.updateStore = function(req,res){
	var id = req.params.storeId;
	stores.findById(id, function(err, store) {
		if (err)
			res.send(err);

		store.storeName = req.body.storeName;
		store.position[0] = req.body.
		store.position[1] = req.body.

		store.save(function(err) {
			if (err){
				res.send(err)
			}else{
				stores.find(function(err, storeAll) {
				if (err)
					res.send(err)
					res.json(storeAll);
				});
			}
		});
	});
}