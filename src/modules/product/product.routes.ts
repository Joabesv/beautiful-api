import type { FastifyInstance } from 'fastify';
import { $ref } from './product.schema';
import { createProductHandler, getProductsHandler } from './product.controller';

export async function productRoutes(serverInstance: FastifyInstance) {
  serverInstance.post(
    '/',
    {
      preHandler: [serverInstance.authenticate],
      schema: {
        body: $ref('createProductSchema'),
        response: {
          201: $ref('productResponseSchema'),
        },
      },
    },
    createProductHandler
  );

  serverInstance.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('productsResponseSchema'),
        },
      },
    },
    getProductsHandler
  );
}
