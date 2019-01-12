var fs = require('fs');

exports.index = function(req, res, next) {

	fs.readFile('counter.txt', (err, data) => {
		if(err) throw err;

		var counter = parseInt(data);
		counter++;

		fs.writeFile('counter.txt', counter, (err) => {
	    	if(err) throw err;
	    	res.render('index', {value: counter});
		});
	});

}
