import type { FastifyInstance } from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
    config: {
      JWT_SECRET: string;
    };
  }
}
