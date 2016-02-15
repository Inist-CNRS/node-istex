# node-istex

A nodejs wrapper to interrogate the API Istex

## Installation
```shell
  npm install node-istex
```


## implemant

```javascript
 var istex = require("node-istex");
 	/*
 	 {id} is the key reference document example : api.istex.fr/document/{7881AA44F709292FCCD0A9B37D6628E47CF23C57} <== id 
 	*/
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
