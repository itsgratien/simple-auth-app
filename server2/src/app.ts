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

const app = express();

const mainRoutes = new MainRoutes().router;

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
