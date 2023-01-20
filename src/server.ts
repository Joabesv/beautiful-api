import Fastify from 'fastify';
const app = Fastify();

const startApp = async () => {
  app.get('/', async (request, reply) => {
    reply.send({
      msg: 'bom dia, to desanimado',
    });
  });

  await app.listen({ port: 3000 });
};

startApp();
