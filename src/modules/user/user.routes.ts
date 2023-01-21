import type { FastifyInstance } from 'fastify';
import {
  registerUserHandler,
  loginHandler,
  getUsersHandler,
} from './user.controller';
import { $ref } from './user.schema';

export async function userRoutes(serverInstance: FastifyInstance) {
  serverInstance.post(
    '/',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: { 201: $ref('createUserResponseSchema') },
      },
    },
    registerUserHandler
  );

  serverInstance.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: { 200: $ref('loginResponseSchema') },
      },
    },
    loginHandler
  );

  serverInstance.get(
    '/',
    { preHandler: [serverInstance.authenticate] },
    getUsersHandler
  );
}
