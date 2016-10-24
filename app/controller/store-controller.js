var stores = require('../models/stores');
var zipcodes = require('zipcodes');


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
	var pos = [req.body.lat,req.body.lon];
	stores.update({_id:id}, 
		{$set:{storeName : req.body.storeName, position : pos}}, 
		function(err, store) {
		if (err)
			res.send(err);
		
		stores.find(function(err, storeAll) {
		if (err)
			res.send(err)
			res.json(storeAll);
		});
	});
}

exports.findStore = function(req,res){
	var zipcode = req.body.zipcode;
	var distance = req.body.distance;

	var p = new Promise(function(resolve, reject){
		var location = zipcodes.lookup(9210);
		if(location) {
			resolve(location);
		}else {
			reject(null);
		}
	});

	p.then(function(loc){
		res.send(200,loc);
	}).catch(function(error){
		res.send(405,{'message':'Not Found'});
	});

}