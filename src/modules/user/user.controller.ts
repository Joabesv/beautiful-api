import type { FastifyReply, FastifyRequest } from 'fastify';
import type { CreateUserInput, LoginInput } from './user.schema';
import { verifyPassword } from '../../utils/hash';
import { createUser, findUserByEmail, findUsers } from './user.service';

export async function registerUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  const { body } = request;

  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.send({ msg: 'Error Creating user', error: e.message });
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const { body } = request;
  const user = await findUserByEmail(body.email)

  if(!user) {
    return reply.code(401).send({
      msg: 'Invalid credentials'
    })
  }

  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password
  })

  if(correctPassword) {
    const { password, salt, ...userData } = user;
    return { accessToken: request.jwt.sign(userData) }
  }

  return reply.code(401).send({ message: 'Invalid credentials'})
}


export async function getUsersHandler() {
  const users = await findUsers();

  return users;
}