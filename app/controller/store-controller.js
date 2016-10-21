var stores = require('../models/stores');


exports.saveStore = function(req,res){ console.log(req.body)
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
