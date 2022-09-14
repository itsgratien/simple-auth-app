import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../repositories/users.repository';
import responseWrapper from '../../../../helpers/responseWrapper';
import httpCode from '../../../../constants/httpCode';
import axios from 'axios';

export class UserController extends UserRepository {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const find = await axios.post(
        'http://localhost:4000/api/v1/users/login',
        { username: 'johndoe', password: 'hacker@12' },
      );

      return responseWrapper({ res, status: httpCode.OK, data: find.data });
    } catch (error) {
      return next(error);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const find = await axios.get('http://localhost:4000/api/v1/users/me', {
        headers: {
          Authorization: 'coding'
        }
      });

      return responseWrapper({ res, status: httpCode.OK, data: find.data });
    } catch (error: any) {
      return next(error);
    }
  };
}
