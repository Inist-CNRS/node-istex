# node-istex

Un wrapper nodejs sur l'[API ISTEX](https://api.istex.fr).

## Installation

```shell
  npm install node-istex
```


## Utilisation


Pour faire une recherche dans la plateforme ISTEX :

```javascript
var istex = require("node-istex");
istex.find('?q=brain' , function (err, result) {
  if (err) throw err;
  console.log(result);

  // ceci affichera comme résultat :
  // 
  // { total: 1495399,
  //   nextPageURI: 'https://api.istex.fr/document/?q=brain&size=10&from=10',
  //   firstPageURI: 'https://api.istex.fr/document/?q=brain&size=10&from=0',
  //   lastPageURI: 'https://api.istex.fr/document/?q=brain&size=10&from=1495389',
  //   hits: 
  //    [ { title: 'anatomy of the brain',
  //        id: '2176FFD80B8885F17B7EB28F372B31232543C7B1',
  //        score: 2.3035161 },
  //      { title: 'Wounds of the brain proved curable',
  // [...]

});
```

Pour récupérer les métadonnées JSON d'un unique document dans la plateforme ISTEX en partant de son identifiant ISTEX :

```javascript
var istex = require("node-istex");
istex.findByIstexId('128CB89965DA8E531EC59C61102B0678DDEE6BB7' , function (err, result) {
  if (err) throw err;
  console.log(result);

  // ceci affichera comme résultat :
  // 
  // { corpusName: 'bmj',
  //   title: 'Supplement 743',
  //   doi: [ '10.1136/bmj.2.3003.S13' ],
  //   [...]

});
```


Pour faire une recherche en donnant une liste d'identifiants ISTEX dans le but de récupérer une liste de métadonnées au format JSON (un par document) :

```javascript
var istex = require("node-istex");
istex.findByIstexIds([ '128CB89965DA8E531EC59C61102B0678DDEE6BB7', 'F1F927C3A43BC42B161D4BBEC3DD7719001E0429' ], function (err, result) {
  if (err) throw err;
  console.log(result);

  // ceci affichera comme résultat un tableau contenant
  // les métadonnées de deux documents :
  // 
  // [
  //   { corpusName: 'bmj',
  //     refBibs: 
  //      [ [Object],
  //        [Object],
  //     [...]
  //   },
  //   { corpusName: 'bmj',
  //     refBibs: [],
  //     genre: [ 'review-article' ],
  //     [...]
  //   }
  // ]

});
```

Remarque: la méthode ``findlot`` est obsolète, elle est remplacée par ``findByIstexIds``



## Paramètres

Il est possible de régler les paramètres suivants de la manière suivante :

```javascript
var istex = require("node-istex").defaults({
  // le user agent qui sera utilisé pour faire 
  // les requêtes HTTP vers l'API istex
  userAgent: 'my-application',

  // les paramètres suplémentaire à ajouter dans toutes les l'URL
  // pour faire des requêtes vers l'API istex
  extraQueryString: { sid: 'my-application' }
});
```