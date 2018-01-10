const { expect } = require('chai');

const server = require('./../server/index.js');
const db = require('./../database/index.js');


describe('Database', function() {
  describe('getTransactionHistory', function() {
    it('should be a function', function() {
      expect(db.getTransactionHistory).to.be.a('function');
    });
    it('should return a promise', function() {
      let queryResult = db.getTransactionHistory('annie');
      expect(queryResult instanceof Promise).to.equal(true);
    });
    it('should resolve to an object', function() {
      return db.getTransactionHistory('annie').then((res) => {
        expect(res).to.be.an('object');
      });
    });
    it('should have amount, status, type, timestamp, and description data', function() {
      return db.getTransactionHistory('annie').then((res => {
        let dataEntry = res.rows[0];
        expect(dataEntry.hasOwnProperty('amount')).to.equal(true);
        expect(dataEntry.hasOwnProperty('status')).to.equal(true);
        expect(dataEntry.hasOwnProperty('type')).to.equal(true);
        expect(dataEntry.hasOwnProperty('created_timestamp')).to.equal(true);
        expect(dataEntry.hasOwnProperty('resolved_timestamp')).to.equal(true);
        expect(dataEntry.hasOwnProperty('description')).to.equal(true);
      }))
    })
  });
});

