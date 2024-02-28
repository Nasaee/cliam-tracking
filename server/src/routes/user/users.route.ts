import express from 'express';
import { check } from 'express-validator';
import { registerUser } from './user.controller';

const usersRouter = express.Router();

// /api/v1/users/register
usersRouter.post(
  '/register',
  [
    check('username', 'Username is required')
      .notEmpty()
      .isString()
      .withMessage('Sorry username is not an string. Please try again.'),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  registerUser
);

export default usersRouter;
