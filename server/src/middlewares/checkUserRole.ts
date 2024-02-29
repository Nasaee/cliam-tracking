import { Request, Response, NextFunction } from 'express';
import { UserType } from '../models/user/user.mongo';

type userRole = UserType['role'];

const checkUserRole =
  (userRole: userRole) => (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;
    if (userRole !== role) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
  };
export default checkUserRole;
