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
exports.find = function (search,  callback) {

	var search = '55420CDEEA0F6538E215A511C72E2E5E57570138';
	console.log(search.length)
	if (!search && search.length != 40)  {
		return callback(new Error("index istex is incorrect"));
	}
	var urlistex = 'https://api.istex.fr/document/' + search ;
	var options = {
	  url: urlistex,
	  headers: {
	    'User-Agent': 'ezpaarse'
	  }
	};
	var data = require('./rtype.json');
	request.get(options, function (err , req , body){
		if (err) { return callback(err); }
		
			
		try {
			var result = JSON.parse(body);
		} catch (e) {
			return callback(e);
		}

		if (result.error) {
			return callback(new Error(result.error));
		}
		 callback(null, result);
		/*	
		metaistex.publisher_name = result.corpusName;

		
		if (result.host.isbn) metaistex.print_identifier = result.host.isbn[0];
		if (result.host.issn) metaistex.print_identifier = result.host.issn[0];
		if (result.host.eisbn) metaistex.online_identifier = result.host.eisbn[0];
		if (result.doi) metaistex.doi = result.doi[0];
		metaistex.publication_title = result.host.title;
		if (result.publicationDate) { 
		metaistex.publication_date = result.publicationDate;
		} else { 
		metaistex.publication_date = result.copyrightDate;	
		}
		//metaistex.ppn
		metaistex.rtype = data[result.genre[0]];
		metaistex.language = result.language[0]; 
		*/
		
	});
};

