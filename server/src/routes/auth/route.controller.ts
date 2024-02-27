import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import generateJwtToken from '../../utils/generateJwtToken';
import { getUser } from '../../models/user/user.model';
import bcrypt from 'bcryptjs';
import { log } from 'console';

const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const { email, password } = req.body;

  const user = await getUser(email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid Credentials' });
  }

  const isMatchPwd = await bcrypt.compare(password, user.password);
  console.log(isMatchPwd);

  if (!isMatchPwd) {
    return res.status(400).json({ message: 'Invalid Credentials' });
  }

  const token = generateJwtToken(user);

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ user: { userId: user._id, role: user.role } });
};

const logOutUser = async (req: Request, res: Response) => {
  res.cookie('auth_token', '', { expires: new Date(0) });
  res.end();
};

export { loginUser, logOutUser };
