import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { MainRoutes } from './routes/main.routes';
import { errors } from 'celebrate';
import httpCode from './constants/httpCode';
import responseWrapper from './helpers/responseWrapper';
import swaggerSetup from './api-docs/v1/swaggerSetup';
import errorHandler from './helpers/errorHandler';
import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import IORedis from 'ioredis';

const mainRoutes = new MainRoutes().router;

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const RedisStore = connectRedis(expressSession);
const redisClient = new IORedis();

app.use(
  expressSession({
    secret: 'secret',
    name: 'testid',
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 366
    }, // maxAge 1 year
    store: new RedisStore({ client: redisClient })
  })
);

app.use('/api/v1', mainRoutes);

app.use('/api-docs/v1', swaggerUI.serve, swaggerSetup);

app.use((_req, res) =>
  responseWrapper({
    status: httpCode.NOT_FOUND,
    message: 'Page / API Not Found',
    res
  })
);

app.use(errors());

app.use(errorHandler);

export default app;
