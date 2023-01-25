import type { FastifyRequest } from 'fastify';
import type { CreateProductInput } from './product.schema';
import { createProduct, getProducts } from './product.service';

export async function createProductHandler(
  request: FastifyRequest<{ Body: CreateProductInput }>
) {
  const { id } = request.user;

  const product = await createProduct({
    ...request.body,
    ownerId: id,
  });

  return product;
}

export async function getProductsHandler() {
  const products = await getProducts();

  return products;
}
