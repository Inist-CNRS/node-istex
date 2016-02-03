'use strict';

var request = require('request').defaults({
	proxy: process.env.http_proxy ||
	process.env.HTTP_PROXY ||
	process.env.https_proxy ||
	process.env.HTTPS_PROXY
	});

/**
* @param {Object} search
* @param {Object} options
* @param {Function} callback(err, result)
*/
//exports.find = function (search, options, callback) {
	var search = '55420CDEEA0F6538E215A511C72E2E5E57570138';
	var urlistex = 'https://api.istex.fr/document/' + search ;
	var options = {
	  url: urlistex,
	  headers: {
	    'User-Agent': 'ezpaarse'
	  }
	};
	request.get(options, function (err , req , body){
		if (err) {
			return err;
		}
		var test = '';
		var metaistex = {};
		var result = JSON.parse(body);	
		
		metaistex.publisher_name = result.corpusName;
		metaistex.print_identifier = result.host.issn;
		metaistex.doi = result.doi;
		metaistex.publication_title = result.host.title;
		metaistex.publication_date = result.publicationDate;
		test = result.host.pii;
		console.log(test);
	});
//};

