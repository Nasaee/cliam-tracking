import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createNewUser, getUser } from '../../models/user/user.model';
import jwt from 'jsonwebtoken';
import generateJwtToken from '../../utils/generateJwtToken';

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  try {
    let user = await getUser(req.body.email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = await createNewUser(req.body);

    const token = generateJwtToken(user);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
