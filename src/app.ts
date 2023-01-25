import { buildServer } from './server';

async function server() {
  const app = await buildServer();
  try {
    await app.listen({ port: 5000, host: '0.0.0.0' });
    app.log.info('server ready at http://localhost:5000');
  } catch (e) {
    app.log.error(e, 'Error in server startup');
    process.exit(1);
  }
}

server();
