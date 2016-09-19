'use strict';

var request = require('request');

/**
 * Recherche une liste de documents ISTEX
 * Exemple pour la variable search
 */
exports.find = function (search,  callback) {

  if (!search && search.length != 40) {
    return callback(new Error('index istex is incorrect'));
  }
  var urlistex = 'https://api.istex.fr/document/' + search ;
  var options = {
    url: urlistex,
    headers: {
      'User-Agent': 'ezpaarse'
    }
  };

  request.get(options, function (err, req, body) {
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

  });
};

exports.findlot = function (search, callback) {

  var urlistex = 'https://api.istex.fr/document/?size=200&output=*&q=id:(';
  if (search && search.length != 0)  {
    urlistex += search.shift();
  } else {
    return callback(new Error('index istex is incorrect'));
  }
  for (var i = 0; i < search.length; i++) {
    urlistex = urlistex + ' OR ' + search[i] ;
  }

  urlistex = urlistex + ')';

  var options = {
    url: urlistex,
    headers: {
      'User-Agent': 'ezpaarse'
    }
  };
  request.get(options, function (err, req, body) {
    if (err) { return callback(err); }

    try {
      var result = JSON.parse(body);
    } catch (e) {
      return callback(e);
    }

    if (result.total == 0 && result.error) {
      return callback(new Error('erreur de requette'));
    }
    callback(null, result.hits);

  });
};

