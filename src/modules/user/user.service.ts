import { p } from '../../database/connection';
import { hashPassword } from '../../utils/hash'
import type { CreateUserInput } from './user.schema'

export async function createUser(input: CreateUserInput) {
  const { password, ...userInput } = input;
  const { hash, salt } = hashPassword(password);

  const user = await p.user.create({
    data: { ...userInput, salt, password: hash }
  })

  return user;
}

export async function findUsers() {
  return p.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
}