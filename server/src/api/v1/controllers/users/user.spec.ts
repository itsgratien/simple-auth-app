import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../../../app';
import httpCode from '../../../../constants/httpCode';

describe('UserController', () => {
  describe('Register A User', () => {
    test('should register a user', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({ name: faker.name.firstName() });

      expect(res.status).toEqual(httpCode.CREATED);
    });
  });
});
