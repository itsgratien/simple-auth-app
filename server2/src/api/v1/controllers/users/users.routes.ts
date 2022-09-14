import express from 'express';
import { UserController } from './users.controllers';

export class UserRoute extends UserController {
  private _router = express.Router();

  constructor() {
    super();
    this.createRoutes();
  }

  public get router() {
    return this._router;
  }

  private createRoutes(): void {
    this._router.post('/login', this.login);
    this._router.get('/me', this.me);
  }
}
