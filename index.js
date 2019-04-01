'use strict';

const request = require('request');

/**
 * Mise en place des options réglables par la méthode defaults
 * (comme pour le module request)
 * - userAgent : le user agent positionnée dans les requêtes HTTP qui seront réalisées sur l'API istex
 * - sid: le paramètre sid qui sera ajouter dans la querystring des requetes vers l'API istex
 *        et qui permet de signaler à ISTEX quel outil a réalisé la requête à des fin de statistique
 *        (ex: google-scholar, istex-brower-addon, istex-widgets, ebsco ...)
 */
const options = {
  userAgent: 'node-istex',
  extraQueryString: { sid: 'node-istex' },
  baseUrl: 'https://api.istex.fr'
};

exports.defaults = function (opt) {
  if (opt.userAgent) {
    options.userAgent = opt.userAgent;
    options.extraQueryString = `sid=${opt.userAgent}`;
  }
  if (opt.extraQueryString) {
    options.extraQueryString = opt.extraQueryString;
  }
  if (opt.baseUrl) {
    options.baseUrl = opt.baseUrl;
  }
  return exports;
}

/**
 * Recherche des métadonnées JSON d'un document ISTEX par son identifiant istex
 * Exemple basique pour la variable istexId: 128CB89965DA8E531EC59C61102B0678DDEE6BB7
 */
exports.findByIstexId = function (istexId,  callback) {

  if (!istexId && istexId.length !== 40) {
    return callback(new Error(`invalid ISTEX identifier (${istexId})`));
  }

  return exports.find(`${istexId}/`, callback);
};

/**
 * Recherche dans l'API ISTEX en utilisant le système de querystring
 * proposée par l'API ISTEX.
 * cf documentation disponible ici https://api.istex.fr/documentation/
 * Exemple basique pour la variable search : ?q=brain
 */
exports.find = function (search, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  opts = Object.assign({}, options, opts);

  let url = '/document/';
  let qs = {};

  if (typeof search === 'string') {
    url += search;
  } else if (typeof search === 'object') {
    qs = search;
  }

  const requestOpt = {
    baseUrl: opts.baseUrl,
    url: url,
    qs: Object.assign(qs, opts.extraQueryString),
    headers: {
      'User-Agent': opts.userAgent
    }
  };

  request.get(requestOpt, function (err, res, body) {
    if (err) { return callback(err); }

    let result;
    try {
      result = JSON.parse(body);
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
exports.findByIstexIds = function (istexIds, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  opts = Object.assign({}, options, opts);

  if (istexIds.length > 200) {
    const err = new Error(`node-istex findByIstexIds cannot be called with more than 200 istex ids (${istexIds.length} requested)`);
    return callback(err);
  }
  if (istexIds.length <= 0) {
    const err = new Error(`node-istex findByIstexIds should be called with 1 or more istex ids (${istexIds.length} requested)`);
    return callback(err);
  }

  const qs = {
    size: 200,
    output: '*',
    q: `id:(${istexIds.join(' OR ')})`
  };

  const requestOpt = {
    baseUrl: opts.baseUrl,
    url: '/document/',
    qs: Object.assign({}, qs, opts.extraQueryString),
    headers: {
      'User-Agent': opts.userAgent
    }
  };

  request.get(requestOpt, function (err, res, body) {
    if (err) { return callback(err); }

    let result;
    try {
      result = JSON.parse(body);
    } catch (e) {
      return callback(e);
    }

    if (result.total == 0 && result.error) {
      return callback(new Error('request error'));
    }
    callback(null, result.hits);
  });
};

/**
 * Deprecated: bad naming
 */
let findlotWarningDisplayed = false;
exports.findlot = function (search, callback, noWarning) {
  if (!findlotWarningDisplayed && !noWarning) {
    console.error('node-istex: findlot is deprecated, use findByIstexIds instead');
    findlotWarningDisplayed = true;
  }
  return exports.findByIstexIds(search, callback);
};

