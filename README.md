# node-istex

A nodejs wrapper to query the [Istex API](https://api.istex.fr).

## Installation
```shell
  npm install node-istex
```


## Usage

```javascript
var istex = require("node-istex");
/*
 	 {istexid} is the key identifing a document. Example:
 	 https://api.istex.fr/document/7881AA44F709292FCCD0A9B37D6628E47CF23C57/fulltext/pdf
 	 7881AA44F709292FCCD0A9B37D6628E47CF23C57 is the istexid
*/
istex.find(istexid , function (err, result) {
  if (err) throw err;

  console.log(result);
  // { "corpusName": "springer", "host": { "volume": "40", "issue": "4", "title": "Journal of the ACM",
  //   "publicationDate": "1993"}}
});
```

## Methods

- find(istexid , callback)
