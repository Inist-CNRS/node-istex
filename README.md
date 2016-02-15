# node-istex

A nodejs wrapper to interrogate the API Istex

## Installation
```shell
  npm install node-istex
```


## implemant

```javascript
 var istex = require("node-istex");

    istex.find(id , function(err, result){
      if (err || !result) { 
        return pullBuffer();
      }

      console.log(result);
 // { "corpusName": "springer", "host": { "volume": "40", "issue": "4", "title": "Journal of the 
 //ACM", "publicationDate": "1993"}}
});
```

## Methods


- find(id , callback)
