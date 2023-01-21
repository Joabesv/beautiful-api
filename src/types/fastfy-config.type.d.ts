import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { JWT } from '@fastify/jwt'

declare module 'fastify' {
  export interface FastifyRequest {
    jwt: JWT;
  }
  
  export interface FastifyInstance {
    authenticate: any;
    config: {
      JWT_SECRET: string;
    };
  }
}
