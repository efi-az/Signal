import * as Joi from 'joi';

export const validationSchema = Joi.object({
    // app
    APP_NAME: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    API_GLOBAL_PREFIX: Joi.string().required(),
    APP_MODE: Joi.string().valid('developer', 'release'),

    // swagger
    SWAGGER_TITLE: Joi.string().required(),
    SWAGGER_DESCRIPTION: Joi.string().required(),
    SWAGGER_PREFIX: Joi.string().required(),
    SWAGGER_VERSION: Joi.string().required(),
    SWAGGER_TAG: Joi.string().required(),

    // database
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    NODE_ENV: Joi.string().valid('development', 'production'),

    // caching
    CACHE_OTP_TTL: Joi.number().required(),
});