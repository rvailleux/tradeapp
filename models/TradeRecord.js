/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var TradeRecordSchema = new mongoose.Schema({
	date : { type : Date, default : Date.now },
	pair: String,
	askprice : Number,
	buyprice : Number,
	lasttradeprice : Number
});

module.exports = mongoose.model('TradeRecord', TradeRecordSchema);

