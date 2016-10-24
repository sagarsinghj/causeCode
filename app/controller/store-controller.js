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
		var location = zipcodes.lookup(zipcode);
		if(location) {
			resolve(location);
		}else {
			reject(null);
		}
	});

	p.then(function(loc){
		var lat = loc.latitude;
		var lon = loc.longitude;
		var locCity = loc.city;
		var locState = loc.state;
		var distInMiles = distance/3963.2;

		var query = {'position': { '$geoWithin': { '$center': [[lat, lon] ,distInMiles] } } };
		stores.find(query,  function(err, storesInRange) {
			if (err){
				res.send(err)
			}else{
				if(storesInRange == null || storesInRange.length == 0){
					res.send(404,{'message':'No Stores found wihin given distance'});
				}else{
					var responseData = {
						stores:storesInRange,
						zipcodeCity:locCity,
						zipcodeState:locState,
						zipcode:zipcode,
						distance:distance
					};
					res.send(200,responseData);
				}
			}
		});

	}).catch(function(error){
		res.send(405,{'message':'No location found for given zipcode'});
	});

}