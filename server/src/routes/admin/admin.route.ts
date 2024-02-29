import express, { Request, Response } from 'express';
import { deleteUser, getAllUsers } from './admin.controller';
import { deleteUserById, getUserById } from '../../models/user/user.model';

const adminRouter = express.Router();

// /api/v1/admin/...
adminRouter.post('/all-users', getAllUsers);

adminRouter.delete('/user/:id', deleteUser);

export default adminRouter;
