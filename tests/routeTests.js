const request = require('supertest');
const index = require('../index');

describe('add new user', () => {
    it('should add new user', async () => {
      const res = await request(index.callback())
        .post('/api/v1/users/register')
        .send({
          username: 'Username',
          password: 'password',
          email: 'email@email.com'
        })
      expect(res.statusCode).toEqual(201)
    })
  });

describe('Reject unknow user', () => {
    it('should reject log in ', async () => {
        const res = await request(index.callback())
          .post('/api/v1/users')
          .send({
            username: 'notindb',
            password: 'notindb'
          })
        expect(res.statusCode).toEqual(401)
      })
});

describe('accept know user', () => {
    it('should reject log in ', async () => {
        const res = await request(index.callback())
          .post('/api/v1/users')
          .send({
            username: 'Username',
            password: 'password'
          })
        expect(res.statusCode).toEqual(401)
      })
});
describe('accept know user', () => {
    it('should reject log in ', async () => {
        const res = await request(index.callback())
          .post('/api/v1/users')
          .send({
            username: 'Username',
            password: 'password'
          })
        expect(res.statusCode).toEqual(401)
      })
});