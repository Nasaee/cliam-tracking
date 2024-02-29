import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import generateJwtToken from '../../utils/generateJwtToken';
import { getUserByEmail } from '../../models/user/user.model';
import bcrypt from 'bcryptjs';

export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid Credentials' });
  }

  const isMatchPwd = await bcrypt.compare(password, user.password);

  if (!isMatchPwd) {
    return res.status(400).json({ message: 'Invalid Credentials' });
  }

  const token = generateJwtToken(user);

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).send({ message: 'Loged in successfuly' });
};

export const validateToken = (req: Request, res: Response) => {
  return res.status(200).send({ user: req.user });
};

export const logOutUser = (req: Request, res: Response) => {
  res.cookie('auth_token', '', { expires: new Date(0) });
  res.send();
};
