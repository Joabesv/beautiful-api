import { afterAll, expect, test, describe, expectTypeOf } from 'vitest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { p } from '../../../src/database/connection';
import { buildServer } from '../../../src/server';
import { UserType } from '@fastify/jwt';

describe('testing the login path', async () => {
  const fastify = await buildServer();
  test('should login if email and login are correct', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await fastify.inject({
      method: 'POST',
      url: '/api/users',
      payload: {
        email,
        password,
        name,
      },
    });

    const response = await fastify.inject({
      method: 'POST',
      url: '/api/users/login',
      payload: {
        email,
        password
      },
    });

    expect(response.statusCode).toBe(200);
    const verifiedUser = fastify.jwt.verify<UserType & { iat: number }>(
      response.json().accessToken
    );

    expect(verifiedUser.email).toBe(email)
    expect(verifiedUser.name).toBe(name)
    expectTypeOf(verifiedUser.id).toBeNumber()
    expectTypeOf(verifiedUser.iat).toBeNumber()
    
  });

  test('given the email and password are not correct', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await fastify.inject({
      method: "POST",
      url: "/api/users",
      payload: {
        email,
        password,
        name,
      },
    });

    const response = await fastify.inject({
      method: "POST",
      url: "/api/users/login",
      payload: {
        email,
        password: "wrong",
      },
    });

    const json = response.json()
    expect(response.statusCode).toBe(401);
    expect(json.message).toBe("Invalid credentials")
  })

  afterAll(async () => {
    await fastify.close();
    await p.user.deleteMany({});
  });
});
