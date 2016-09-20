/* global describe, it */
'use strict';

var istex       = require('..');
var expect      = require('chai').expect;

describe('node-istex', function () {

  it('devrait être capable de récupérer une métadonnées JSON d\'un document précis en partant de son id istex', function (done) {
    
    istex.findByIstexId('F1F927C3A43BC42B161D4BBEC3DD7719001E0429', function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.property('title');
      done(err);
    });

  });


});
