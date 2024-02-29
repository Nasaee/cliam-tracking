import { Request, Response } from 'express';
import { getAllUsersDB } from '../../models/user/user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await getAllUsersDB();
  if (!allUsers) {
    return res.status(500).send({ message: 'Somthing went wrong' });
  }
  return res.status(200).send(allUsers);
};
