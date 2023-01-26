import { p } from '../../database/connection';
import type { CreateProductInput } from './product.schema';

export async function createProduct(
  data: CreateProductInput & { ownerId: number }
) {
  return p.product.create({ data });
}

export async function getProducts() {
  // i know its ugly as hell
  return p.product.findMany({
    select: {
      content: true,
      title: true,
      price: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
}
