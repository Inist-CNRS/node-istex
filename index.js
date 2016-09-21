'use strict';

var request = require('request');
var qs      = require('qs');

/**
 * Mise en place des options réglables par la méthode defaults
 * (comme pour le module request)
 * - userAgent : le user agent positionnée dans les requêtes HTTP qui seront réalisées sur l'API istex
 * - sid: le paramètre sid qui sera ajouter dans la querystring des requetes vers l'API istex
 *        et qui permet de signaler à ISTEX quel outil a réalisé la requête à des fin de statistique
 *        (ex: google-scholar, istex-brower-addon, istex-widgets, ebsco ...)
 */
var options = {
  userAgent:         'node-istex',
  extraQueryString:  'sid=node-istex'
};
exports.defaults = function (opt) {
  if (opt.userAgent) {
    options.userAgent        = opt.userAgent;
    options.extraQueryString = 'sid=' + opt.userAgent;
  }
  if (opt.extraQueryString) {
    options.extraQueryString = opt.extraQueryString;
  }
  return exports;
}

/**
 * Recherche des métadonnées JSON d'un document ISTEX par son identifiant istex
 * Exemple basique pour la variable istexId: 128CB89965DA8E531EC59C61102B0678DDEE6BB7
 */
exports.findByIstexId = function (istexId,  callback) {

  if (!istexId && istexId.length != 40) {
    return callback(new Error('L\'identifiant ISTEX passé en argument n\'est pas valide (' + istexId + ')'));
  }

  return exports.find(istexId + '/', callback);
};

/**
 * Recherche dans l'API ISTEX en utilisant le système de querystring
 * proposée par l'API ISTEX.
 * cf documentation disponible ici https://api.istex.fr/documentation/
 * Exemple basique pour la variable search : ?q=brain
 */
exports.find = function (search,  callback) {

  var url = 'https://api.istex.fr/document/' + search ;

  // concaténation de extraQueryString à la liste des paramètres de l'URL
  var basePath    = url.split('?')[0];
  var queryString = url.split('?')[1];
  url = basePath + '?' + qs.stringify(Object.assign(qs.parse(queryString), qs.parse(options.extraQueryString)));

  var requestOpt = {
    url: url,
    headers: {
      'User-Agent': options.userAgent
    }
  };

  request.get(requestOpt, function (err, req, body) {
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
}


/**
 * Recherche une liste de documents ISTEX
 * en partant d'une liste d'identifiants ISTEX
 * Exemple pour la variable search :
 * [ '128CB89965DA8E531EC59C61102B0678DDEE6BB7', 'F1F927C3A43BC42B161D4BBEC3DD7719001E0429' ]
 */
exports.findByIstexIds = function (istexIds, callback) {
  if (istexIds.length > 200) {
    var err = new Error('node-istex findByIstexIds cannot be called with more than 200 istex ids (' + istexIds.length + ' requested)');
    return callback(err);
  }
  if (istexIds.length <= 0) {
    var err = new Error('node-istex findByIstexIds should be called with 1 or more istex ids (' + istexIds.length + ' requested)');
    return callback(err);
  }

  var url = 'https://api.istex.fr/document/?size=200&output=*&q=id:(';
  url += istexIds.join(' OR ');
  url += ')';

  var requestOpt = {
    url: url + '&' + options.extraQueryString,
    headers: {
      'User-Agent': options.userAgent
    }
  };

  request.get(requestOpt, function (err, req, body) {
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
/**
 * Deprecated: bad naming
 */
var findlotWarningDisplayed = false;
exports.findlot = function (search, callback, noWarning) {
  if (!findlotWarningDisplayed && !noWarning) {
    console.error('node-istex: findlot is deprecated, use findByIstexIds instead');
    findlotWarningDisplayed = true;
  }
  return exports.findByIstexIds(search, callback);
};

