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
	   	* clocks, and all products
	*/
	for(var k = 0; k < dataFile.length; k++) {
		for(var i = 0; i < dataFile[k].products.length; i++) {
	    	for(var j = 0; j < dataFile[k].products[i].variants.length; j++) {
	    		// If product type is clock increment clock total and total price
	    		if(dataFile[k].products[i].product_type == 'Clock') {
	    			clock_total = Number(dataFile[k].products[i].variants[j].price) + clock_total;
	    			total_price = Number(dataFile[k].products[i].variants[j].price) + total_price;
	    		}
	    		// If product type is watch increment watch total and total price
	    		else if(dataFile[k].products[i].product_type == 'Watch') {
	    			watch_total = Number(dataFile[k].products[i].variants[j].price) + watch_total;
	    			total_price = Number(dataFile[k].products[i].variants[j].price) + total_price;
	    		}
	    		// Else just increment product total price
	    		else {
	    			total_price = Number(dataFile[k].products[i].variants[j].price) + total_price;
	    		}
	    	}
		}
	}

	// Round each total to nearest two decmial places
	clock_total = Math.round(clock_total * 100) / 100;
	watch_total = Math.round(watch_total * 100) / 100;
	total_price = Math.round(total_price * 100) / 100;



	var watch_trend = [];
	var clock_trend = [];
	var total_trend = [];
	var clock_sum = 0;
	var watch_sum = 0;
	var sum = 0;

	function push_watch(x, y) {
  		watch_trend = watch_trend.concat(new Array([x, y]));
	}

	function push_clock(x, y) {
  		clock_trend = clock_trend.concat(new Array([x, y]));
	}

	function push_total(x, y) {
  		total_trend = total_trend.concat(new Array([x, y]));
	}



	var months = ['January', 'February', 'March', 'April', 
	'May', 'June', 'July', 'August', 'September', 'Ocotober', 'November', 'December'];

	for(i = 0; i < months.length; i++) {
		for(j = 0; j < dataFile[0].products[i].variants.length; j++) {
			if(dataFile[0].products[i].product_type == 'Clock') {
				clock_sum++;
				sum++;
			}
			else if(dataFile[0].products[i].product_type == 'Watch') {
				watch_sum++;
				sum++;
			}
			else {
				sum++;
			}
		}
		push_clock(months[i], clock_sum);
		push_total(months[i], sum);
		push_watch(months[i], watch_sum);
		watch_sum, clock_sum, sum = 0;
	}



	/* Send data to view */
	res.render('index', {
		title: 'JSON Parser',
		trend_watch: watch_trend,
		trend_clock: clock_trend,
		trend_total: total_trend,
		clock: clock_total,
		watch: watch_total,
		total: total_price
	});

});

module.exports = router;

//Final Git automation push
