import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../repositories/users.repository';
import responseWrapper from '../../../../helpers/responseWrapper';
import httpCode from '../../../../constants/httpCode';
import { users } from '../../../../constants/user';

export class UserController extends UserRepository {

  login = (req: Request, res: Response, next: NextFunction) => {
    try {
      const find = users.find((item) => item.username === req.body.username);

      if (!find) {
        return responseWrapper({
          res,
          message: 'Incorrect username',
          status: httpCode.CONFLICT
        });
      }

      if (find.password !== req.body.password) {
        return responseWrapper({
          res,
          message: 'Incorrect password',
          status: httpCode.CONFLICT
        });
      }

      (req.session as any).userId = find._id;

      return responseWrapper({
        res,
        message: 'Loggedin successfully',
        status: httpCode.OK
      });
    } catch (error) {
      return next(error);
    }
  };

  getUser = (req: Request, res: Response, next: NextFunction)=> {
      try {
        if((req.session as any).userId){
           const find = users.find((item)=> item._id === (req.session as any).userId);
           if(find){
            return responseWrapper({res, data: find, status: httpCode.OK})
           }
        }

        return responseWrapper({res, status: httpCode.UNAUTHORIZED, message: 'You are not authorized'})
       
      } catch (error) {
        next(error);
      }
  }

  logout = (req: Request, res: Response, next: NextFunction)=> {
  try {
    (req.session as any).destroy();
    
    return responseWrapper({res, status: httpCode.OK, message: 'Logged Out'})
  } catch (error) {
    next(error);
  }
  }
}
