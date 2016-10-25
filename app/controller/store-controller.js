var stores = require('../models/stores');
var zipcodes = require('zipcodes');


exports.saveStore = function(req,res){
	if(!req.body.storeName){
		res.status(400).send({'message':'Enter valid Store name'});
		return;
	}
	if(!req.body.lat || isNaN(req.body.lat)){
		res.status(400).send({'message':'Enter valid latitude value'});
		return;
	}
	if(!req.body.lon || isNaN(req.body.lon)){
		res.status(400).send({'message':'Enter valid longitude value'});
		return;
	}

	var storeDoc = {
						storeName : req.body.storeName,
						position:[req.body.lon, req.body.lat]
				   }
	stores.find(storeDoc,function(err, allStores) {
		if(allStores){
			res.status(400).send({'message':'Store already exists'});
			return;
		}else{
			stores.create(storeDoc, function(err, store) {
				if (err)
					res.send(err);
				
				stores.find(function(err, storeAll) {
					if (err)
						res.send(err)
					res.json(storeAll);
				});
			});
		}
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
	if(!req.body.storeName || !isNaN(req.body.storeName)){
		res.send(400,{'message':'Enter valid Store name value'}); return;
	}
	if(!req.body.lat || isNaN(req.body.lat)){
		res.send(400,{'message':'Enter valid latitude value'}); return;
	}
	if(!req.body.lon || isNaN(req.body.lon)){
		res.send(400,{'message':'Enter valid longitude value'}); return;
	}
	var pos = [req.body.lon,req.body.lat];

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
	if(zipcode == null || isNaN(zipcode)){
		res.send(400,{'message':'Enter valid zipcode'}); return;
	}
	if(distance == null || isNaN(distance) ){
		res.send(400,{'message':'Enter valid distance'}); return;
	}
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

		var query = {'position': { '$geoWithin': { '$centerSphere': [[parseFloat(lon), parseFloat(lat)] , distInMiles] } } };
		stores.find(query,  function(err, storesInRange) {
			if (err){
				res.send(err)
			}else{
				if(storesInRange == null || storesInRange.length == 0){
					res.send(404,{'message':'No Stores found wihin given distance'}); return;
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
		res.send(400,{'message':'No location found for given zipcode'});
	});

}