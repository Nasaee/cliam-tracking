import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import { loginUser, logOutUser } from './route.controller';
import verifyToken from '../../middlewares/verifyToken.middleware';

const authRouter = express.Router();

// /api/v1/auth/...
authRouter.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password with 6 or more characters required').isLength({
    min: 6,
  }),
  loginUser,
]);

authRouter.post('/logout', logOutUser);

authRouter.get(
  '/validate-token',
  verifyToken,
  (req: Request, res: Response) => {
    return res.status(200).send({ user: req.user });
  }
);

export default authRouter;
