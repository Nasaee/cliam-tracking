import express, { Request, Response } from 'express';
import { getAllUsers } from './admin.controller';
import { deleteUserById, getUserById } from '../../models/user/user.model';

const adminRouter = express.Router();

// /api/v1/admin/...
adminRouter.post('/all-users', getAllUsers);

adminRouter.delete('/user/:id', async (req: Request, res: Response) => {
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
});

export default adminRouter;
