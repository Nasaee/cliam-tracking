import { Request, Response } from 'express';
import { deleteUserById, getUserById } from '../../models/user/user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await getAllUsersDB();
  if (!allUsers) {
    return res.status(500).send({ message: 'Somthing went wrong' });
  }
  return res.status(200).send(allUsers);
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).send({ message: 'bed request' });
  }
  const user = await getUserById(id);

  if (!user) {
    return res.status(500).send({ message: 'user ID not exist' });
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
