/* global describe, it */
'use strict';

var istex  = require('..');
var expect = require('chai').expect;

describe('node-istex', function () {
  it('devrait être capable de récupérer les métadonnées JSON de 2 documents en partant de leur id istex', function (done) {
    this.timeout(5000);
    istex.findByIstexIds([ '128CB89965DA8E531EC59C61102B0678DDEE6BB7', 'F1F927C3A43BC42B161D4BBEC3DD7719001E0429' ], function (err, res) {
      expect(err).to.be.null;
      expect(res.length).to.equals(2);
      done(err);
    });
  });

  it('devrait être capable de fonctionner avec findlot en attendant son obsolescence programmée', function (done) {
    this.timeout(5000);
    istex.findlot([ '128CB89965DA8E531EC59C61102B0678DDEE6BB7', 'F1F927C3A43BC42B161D4BBEC3DD7719001E0429' ], function (err, res) {
      expect(err).to.be.null;
      expect(res.length).to.equals(2);
      done(err);
    }, true);
  });
});
