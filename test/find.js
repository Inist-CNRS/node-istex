/* global describe, it */
'use strict';

var istex  = require('..');
var expect = require('chai').expect;

describe('node-istex', function () {
  it('devrait être capable de faire une recherche simple find (?q=brain)', function (done) {
    this.timeout(5000);
    istex.find('?q=brain', function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.property('total');
      done(err);
    });
  });
});
