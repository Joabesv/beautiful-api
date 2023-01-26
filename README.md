# Build a REST API with modern node techs


## How to run?

```bash
  # clone the project
  git clone https://github.com/Joabesv/beautiful-api.git

  # install deps
  pnpm i

  # Populate the .env file with your secrets
  cp .env.example .env

  # Init Docker-compose 
  docker-compose up -d

  # Migrate your schema
  pnpm prisma migrate dev --name 
  
  # Finally start the server in watch mode
  pnpm start:dev
```

## What are we using?
* Fastify - Web server
* Prisma - Database ORM
* Zod - Request and response validation
* Swagger - API docs
* TypeScript - Types & other cool stuff

## What you will need
* [Insomnia](https://insomnia.rest) - Make API requests
* [Prisma studio](https://www.prisma.io/studio) - View data
* [PostreSQL or MySQL](https://github.com/khezen/compose-postgres/blob/master/docker-compose.yml) - Database
* [Code editor](https://code.visualstudio.com/) - Edit your code

## Features
* Create a user
* Login
* List users
* Create a product
* List products
* Authentication
* Request & response validation
* Swagger docs

# Testing
## What are we testing with?
* [Vitest](https://vitest.dev/guide/) - Test framework
* [fastify.inject](https://www.fastify.io/docs/latest/Guides/Testing/#benefits-of-using-fastifyinject) - Inject HTTP requests
* [faker-js](@faker-js/faker) - Generate test data
* [ts-mock-imports](https://www.npmjs.com/package/ts-mock-imports) - Mock imports (do not recommend)

## What have I learn?
* How to test an API end-to-end
* How to inject http requests to your Fastify application (amazing feature)
* How to mock function calls
* How to test with a test database (this one i need to understand more)

## Where can I learn more about testing Fastify?
* [Unit Test Patterns And Strategies](https://github.com/knockaway/unit-test-patterns-and-strategies)
* [Fastify documentation](https://www.fastify.io/docs/latest/Guides/Testing/)
