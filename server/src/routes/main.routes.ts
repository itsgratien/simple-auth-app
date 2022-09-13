import express from 'express';
import type { Router } from 'express';
import { UserRoute } from '../api/v1/controllers/users/users.routes';
import httpCode from '../constants/httpCode';

export class MainRoutes {
  private _router = express.Router();
  private readonly userRoute: UserRoute;

  constructor() {
    this.userRoute = new UserRoute();
    this.routes();
  }

  public get router(): Router {
    return this._router;
  }

  private routes(): void {
    this._router
      .use('/users', this.userRoute.router)
      .use('/health', (_req, res) => res.send(httpCode.OK));
  }
}
