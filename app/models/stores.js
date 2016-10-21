
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var wordsSchema = new Schema(
	{
	  storeName : String,
	  position : [Number]
	},
	{ 
		versionKey: false 
	}
);

module.exports = mongoose.model('Stores', wordsSchema);