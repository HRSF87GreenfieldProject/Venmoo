const {should, assert} = require('chai');
const supertest = require('supertest');

const server = require('./../server').app;
const request = supertest.agent(server);


describe('server', function() {
  describe('GET /user/:id', () => {

    it('should return an object of user info when id is a user', function(done) {
      request
        .get('/user/1')
        .expect(200)
        .expect(/annie/, done) //not perfect put better than anything we got
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
