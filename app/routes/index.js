var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	/* Load JSON object into local variable to prepare for parsing product totals */
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




	/*
		* Below is a very rough graph implementation. Since the products in the JSON objects 
		* were all created on the same day and had the same time stamp I decided to make
		* a fake month by month sales chart by assigning each of the first 12 product price
		* totals to a month.
	*/

	// Created local variables for graph implementation
	var watch_trend = [];
	var clock_trend = [];
	var total_trend = [];
	var clock_sum = 0;
	var watch_sum = 0;
	var sum = 0;

	// Created push functions to push data points to the trend arrays
	function push_clock(x, y) {
  		clock_trend = clock_trend.concat(new Array([x, y]));
	}
	function push_total(x, y) {
  		total_trend = total_trend.concat(new Array([x, y]));
	}

	// Created an array of months
	var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	// Loop through the first twelve products and all of there variants
	// no watch products were contained in the first 12 products so I ommited
	// Watch sales
	for(i = 0; i < months.length; i++) {
		for(j = 0; j < dataFile[0].products[i].variants.length; j++) {
				if(dataFile[0].products[i].product_type == 'Clock') {
					clock_sum = clock_sum + Number(dataFile[0].products[i].variants[j].price);
					sum = sum + Number(dataFile[0].products[i].variants[j].price);
				}
				else {
					sum = sum + Number(dataFile[0].products[i].variants[j].price);
				}
		}
		push_clock(months[i], clock_sum);
		push_total(months[i], sum);
		clock_sum = 0;
		sum = 0;
	}


	

	/* Send all data (totals and trend arrays) to view */
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
