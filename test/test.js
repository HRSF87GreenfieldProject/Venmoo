const { expect } = require('chai');
const server = require('./../server/index.js').app;
const db = require('./../database/index.js');

const supertest = require('supertest');
const request = supertest.agent(server);

import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount, render } from 'enzyme';
import ProfilePage from '../client/src/components/ProfilePage.jsx';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../client/src/components/SignUp.jsx';
import { response } from './../database/dummy-data.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 4000;

configure({ adapter: new Adapter() });

describe('server', () => {
  describe('GET /user/:id', () => {
    xit('should return an object of user info when id is a user', function(done) {
      request
        .get('/user/1')
        .expect(200)
        .expect(/annie/, done); 
      // request
      //   .get('/user/1')
      //   .then((res) => {
      //     let data = JSON.parse(res.text);
      //     console.log(data);
      //     expect(res.status).to.equal(200);
      //     expect(data.name).to.equal('annie');
      //   });
    });

    xit('should 404 when given an invalid user id', function(done) {
      request
        .get('/user/999999')
        .expect(404, done);

      request
        .get('/user/abc')
        .expect(404, done);
    });
  });

  describe('GET /profilepage/username/:name', () => {
    xit('should 404 when given a nonexistent username', function(done) {
      request
        .get('/profilepage/username/ljsdflksd')
        .expect(404, done);
    });

    xit('should return 200 when a valid username is entered', function(done) {
      request
        .get('/profilepage/username/annie')
        .expect(200, done);
    });

    xit('should return an object with transactions and user objects')
      request
        .get('/profilepage/username/annie')
        .then((res) => {
          let data = JSON.parse(res.text);
          expect(data.hasOwnProperty('user')).to.equal(true);
          expect(data.user.name).to.equal('annie');
          expect(data.hasOwnProperty('transactions')).to.equal(true);
          expect(data.transactions[0].transaction_id).to.equal(1);
        });
  });

  describe('POST /payments and /request', () => {
    xit('should 201 when posting to /payment', function(done) {
    request
      .post('/payment', {username: 'test',
        amount: '30',
        isPayment: true,
        message: 'This is a test!'})
      .expect('Success!')
      .expect(201, done)
    });

    xit('should 201 when posting to /request', function(done) {
    request
      .post('/request', {username: 'test',
        amount: '30',
        isPayment: false,
        message: 'This is a test!'})
      .expect('Success!')
      .expect(201, done)
    });

  })
});


describe('Client', function() {
  describe('react router login test', () => {
    it('should render profile page on login', () => {
      const component = shallow(<ProfilePage user={response.user}/>);
      expect(component.find('div').toExist);
    });
  });
  
  describe("react router signup test", () => {
    it("should render signup on login", () => {
      const component = shallow(<SignUp />);
      expect(component.find("div").toExist);
    });
  });
});


describe('Database', function() {
  describe('getTransactionHistory', function() {
    xit('should be a function', function() {
      expect(db.getTransactionHistory).to.be.a('function');
    });
    xit('should return a promise', function() {
      let queryResult = db.getTransactionHistory('annie');
      expect(queryResult instanceof Promise).to.equal(true);
    });
    xit('should resolve to an object', function() {
      return db.getTransactionHistory('annie').then((res) => {
        expect(res).to.be.an('object');
      });
    });
    xit('should have amount, status, type, timestamp, and description data', function() {
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
