import { afterAll, describe, expect, test } from 'vitest';
import { buildServer } from '../../src/server';


describe('App tests' ,() => {
  test('request the healthCheck', async () => {
    const fastify = await buildServer();
    const response = await fastify.inject({
      method: 'GET',
      url: '/healthCheck'
    })
    
    expect(response.statusCode).toEqual(200)
    expect(response.json()).toEqual({ "status": "OK" })
  });

  afterAll(async () => {
   await (await buildServer()).close()
  })
})
