import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        username: string;
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
    const decodeCoockie = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    if (!decodeCoockie) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const { userId, username, role } = decodeCoockie as JwtPayload;
    req.user = { userId, username, role };
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  next();
};

export default verifyToken;
