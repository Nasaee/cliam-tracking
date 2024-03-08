import { Request, Response, NextFunction } from 'express';
import { UserType } from '../shares/types';

type userRole = UserType['role'];

const checkUserRole =
  (...userRole: userRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;
    if (!userRole.includes(role as userRole)) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
  };
export default checkUserRole;
