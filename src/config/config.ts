const schema = {
  type: 'object',
  required: ['JWT_SECRET'],
  properties: {
    JWT_SECRET: {
      type: 'string',
      default: 'defaultSecret'
    },
  },
};

export const options = {
  confKey: 'config',
  dotEnv: true,
  schema,
  data: process.env,
};
