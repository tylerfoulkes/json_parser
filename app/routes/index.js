var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {

	var dataFile = req.app.get('appData');
	var total_price = 0;
	var json_data = [];

	for(var i = 0; i < dataFile.products.length; i++) {
    	for(var j = 0; j < dataFile.products[i].variants.length; j++) {  
    		json_data = json_data.concat(dataFile.products[i].variants[j].price);
    		total_price = Number(dataFile.products[i].variants[j].price) + total_price;
    	}
	}


	res.render('index', {
		title: 'JSON Parser',
		"name": json_data,
		total: total_price
	});

});

module.exports = router;
