import { Request, Response } from 'express';
import {
  deleteUserById,
  getAllUsersDB,
  getUserById,
  updateUserRole,
} from '../../models/user/user.model';
import generateJwtToken from '../../utils/generateJwtToken';

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await getAllUsersDB();
  if (!allUsers) {
    return res.status(500).send({ message: 'Somthing went wrong' });
  }
  return res.status(200).send(allUsers);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).send({ message: 'bed request' });
  }
  const user = await getUserById(id);

  if (!user) {
    return res.status(500).send({ message: 'User not found' });
  }
  try {
    await deleteUserById(id);
    res.status(200).send({ message: 'user has been deleted' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Somthing went wrong, user not logged out' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newRole = req.body.newUserRole;

  if (!id || !newRole) {
    return res.status(500).send({ message: 'bed request' });
  }
  const user = await getUserById(id);

  if (!user) {
    return res.status(500).send({ message: 'User not found' });
  }

  try {
    await updateUserRole(id, newRole);
    const user = await getUserById(id);
    if (!user) {
      return res.end();
    }
    const token = generateJwtToken(user);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({ message: 'User role has been updated' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Somthing went wrong, user role not update' });
  }
};
