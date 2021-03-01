const request = require('supertest');

const server = require('../api/server.js');

const Users = require('../database/dbConfig.js');

let token = '';

describe('server.js', function() {
  describe('server', function() {
    describe('POST truncate', function() {
      beforeEach(async () => {
        await Users('users').truncate();
      });
    });
    it('should return 404', () => {
      const newUser = { username: 'chance', password: 'testing' };
      return request(server)
        .post('/register')
        .send(newUser)
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });
  describe('environment', function() {
    it('should set environment to testing', function() {
      expect(process.env.DB_ENV).toBe('testing');
    });
  });
  describe('POST ', function() {
    it('should return 404', function() {
      return request(server)
        .post('/register')
        .send({ username: 'marco', password: 'polo' })
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });
  describe('POST', function() {
    it('should return 404', function() {
      return request(server)
        .post('/login')
        .send({ username: 'sunny', password: 'test' })
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('POST', function() {
    it('should return a 401', function() {
      return request(server)
        .post('/api/auth/login')
        .send({ username: 'jellybean', password: 'bean' })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });
  describe('POST /register', () => {
    it('should return 500', () => {
      return request(server)
        .post('/api/auth/register')
        .send({ username: 'aaa1', password: 'aaa' })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });
  describe('dad joke server', () => {
    it('should return 401 no creds', () => {
      return request(server)
        .get('/api/jokes')
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
    it('should return JSON data', () => {
      return request(server)
        .get('/api/jokes')
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
  describe('jokes', () => {
    it('Return json', () => {
      return request(server)
        .get('/api/jokes')
        .expect('Content-Type', /json/);
    });
  });
});
