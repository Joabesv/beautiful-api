import { afterAll, describe, expect, expectTypeOf, test } from 'vitest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ImportMock } from 'ts-mock-imports';
import { buildServer } from '../../../src/server';
import * as userService from '../../../src/modules/user/user.service';
import { p } from '../../../src/database/connection';

describe('Test the path to register a user', async () => {
  const fastify = await buildServer();
  test('create user successfully', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const id = Math.floor(Math.random() * 1_000);

    const stub = ImportMock.mockFunction(userService, 'createUser', {
      name,
      email,
      id,
    });

    const response = await fastify.inject({
      method: 'POST',
      url: '/api/users',
      payload: {
        email,
        password,
        name,
      }
    })
    
    console.log(response.headers)

    expect(response.statusCode).toBe(201);
    
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');

    const json  = response.json();
    expect(json.email).toBe(email)
    expect(json.name).toBe(name)
    expectTypeOf(json.id).toBeNumber();
  }); 
  afterAll(async () => {
    await fastify.close();
  })
});
