var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	/* Load JSON object into local variable */
	var dataFile = req.app.get('appData');
	var total_price = 0;
	var clock_total = 0;
	var watch_total = 0;

	/* 
		* Parse through JSON object and calculate total prices for all watches,
	   	* Clock, and all products
	*/
	for(var k = 0; k < dataFile.length; k++) {
		for(var i = 0; i < dataFile[k].products.length; i++) {
	    	for(var j = 0; j < dataFile[k].products[i].variants.length; j++) {
	    		if(dataFile[k].products[i].product_type == 'Clock') {
	    			clock_total = Number(dataFile[k].products[i].variants[j].price) + clock_total;
	    			total_price = Number(dataFile[k].products[i].variants[j].price) + total_price;
	    		}
	    		else if(dataFile[k].products[i].product_type == 'Watch') {
	    			watch_total = Number(dataFile[k].products[i].variants[j].price) + watch_total;
	    			total_price = Number(dataFile[k].products[i].variants[j].price) + total_price;
	    		}
	    		else {
	    			total_price = Number(dataFile[k].products[i].variants[j].price) + total_price;
	    		}
	    	}
		}
	}

	clock_total = Math.round(clock_total * 100) / 100;
	watch_total = Math.round(watch_total * 100) / 100;
	total_price = Math.round(total_price * 100) / 100;

	/* Send data to view */
	res.render('index', {
		title: 'JSON Parser',
		clock: clock_total,
		watch: watch_total,
		total: total_price
	});

});

module.exports = router;

//Final Git automation push
