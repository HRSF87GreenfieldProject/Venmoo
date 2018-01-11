<<<<<<< HEAD
const expect = require('chai').expect;
const server = require('./../server/index.js');

import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount, render } from 'enzyme';
import ProfilePage from '../client/src/components/ProfilePage.jsx';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../client/src/components/SignUp.jsx';

configure({ adapter: new Adapter() });

describe('server', () => {
  it('Example test should pass', () => {
    expect(1).to.not.equal(2);
  });
});

describe('react router login test', () => {
  it('should render profile page on login', () => {
    const component = shallow(<ProfilePage />);
    expect(component.find('div').toExist);
  });
});

describe("react router signup test", () => {
  it("should render signup on login", () => {
    const component = shallow(<SignUp />);
    expect(component.find("div").toExist);
  });
});
=======
const {should, assert} = require('chai');
const supertest = require('supertest');

const server = require('./../server').app;
const request = supertest.agent(server);


describe('server', function() {
  describe('GET /user/:id', () => {

    it('should return an object of user info when id is a user', function(done) {
      request
        .get('/user/1')
        .expect(200, done)
        //.expect(/annie/, done) //not perfect put better than anything we got
    })

    it('should 404 when given an invalid user id', function(done) {
      request
        .get('/user/999999')
        .expect(404, done)

        request
          .get('/user/abc')
          .expect(404, done)
    })

  });
})
>>>>>>> valid tests for GET /user/id
