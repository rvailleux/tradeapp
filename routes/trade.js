/**
 * http://usejsdoc.org/
 */

var Helpers = require('../helpers/helpers');
var TradeRecord = require("../models/TradeRecord");

var recordTradeFromKraken = function(pair){
	
	Helpers.getJSON(
			{
				host: 'api.kraken.com',
			    port: 443,
			    path: '/0/public/Ticker?pair='+pair,
			    method: 'GET',
			    headers: {
			        'Content-Type': 'application/json'
			    }
			},
			function(statusCode, result) {
				var newTrade = new TradeRecord({
					pair : pair, 
					askprice : result.result.XXBTZEUR.a[0],
					buyprice : result.result.XXBTZEUR.b[0],
					lasttradeprice : result.result.XXBTZEUR.c[0]
				});
				
				newTrade.save(function(err) {
					  if (err) {
						  	console.log("error:" + err);
						  	throw err;
					  }
					  console.log("save:" + newTrade);
				});
			}
	);
	
};

exports.record = function(req, res){
	recordTradeFromKraken("BTCEUR");
	
	
	res.end();
};
