const request = require('supertest');

const server = require('../api/server.js');

describe('server.js', function() {
  describe('environment', function() {
    it('should set environment to testing', function() {
      expect(process.env.DB_ENV).toBe('testing');
    });
  });

  describe('POST /', function() {
    it('should return a 201', function() {
      // spin up the server
      return request(server)
        .post('/register')
        .then(res => {
          expect(res.status).toBe(201);
        });
      // make GET request to /
      // look at the http status code for the response
    });

    it.skip('auth example', function() {
      return request(server)
        .post('/login')
        .send({ username: 'me', password: 'pass' })
        .then(res => {
          const token = res.body.token;

          return request(server)
            .get('/')
            .set('Authorization', token)
            .then(res => {
              expect(res.status).toBe(200);
              expect(Array.isArray(res.body)).toBe(true);
            });
        });
    });
  });
  describe('POST /users', function() {
    it('responds with json', function(done) {
      request(server)
        .post('/register')
        .send({ username: 'sunny', password: 'test' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
