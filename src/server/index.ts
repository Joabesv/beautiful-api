import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyEnv from '@fastify/env';
import fastifyJWT from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';
import { version } from '../../package.json';
import { options } from '../config/config';
import { prettyLog } from '../utils/prettyLog';
import { productSchemas } from '../modules/product/product.schema';
import { productRoutes } from '../modules/product/product.routes';

export async function buildServer() {
  const server = Fastify({
    logger: {
      transport: prettyLog,
    },
  });
  
  await server.register(fastifyEnv, options);
  server.register(fastifyJWT, {
    secret: server.config.JWT_SECRET as string,
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

  for (const schema of [...productSchemas]) {
    server.addSchema(schema)
  }

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

  server.register(productRoutes, { prefix: 'api/products' })


  return server;
}
