import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        role: string;
      };
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['auth_token'];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  try {
    const decodeCoockie = jwt.verify(token, process.env.TOKEN_SECRET as string);
    const { userId, role } = decodeCoockie as JwtPayload;
    req.user = { userId, role };
  } catch (error) {}
  next();
};

export default verifyToken;
