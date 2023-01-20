import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyJWT from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';
import { version } from '../../package.json';

export function buildServer() {
  const server = Fastify({ logger: true });

  server.register(fastifyJWT, {
    secret: process.env.JWT_SECRET as string,
  });

  server.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        server.log.info('authenticated');
      } catch (e) {
        server.log.info('auth error', e);
        return reply.send(`error in auth ${e}`);
      }
    }
  );

  server.get('/healthCheck', async () => {
    return { status: 'OK' };
  });

  server.register(
    fastifySwagger,
    withRefResolver({
      routePrefix: '/docs',
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: 'Fastify APi with modern Ts',
          description: 'Product API',
          version,
        },
      },
    })
  );
}
