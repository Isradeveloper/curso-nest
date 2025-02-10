import * as Joi from 'joi';

export const envSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  PORT: Joi.number().required(),
  HOST_API: Joi.string().required(),
});
