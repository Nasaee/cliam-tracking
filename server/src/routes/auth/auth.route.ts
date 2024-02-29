import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import { loginUser, logOutUser, validateToken } from './auth.controller';
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

authRouter.get('/validate-token', verifyToken, validateToken);

authRouter.post('/logout', logOutUser);

export default authRouter;
