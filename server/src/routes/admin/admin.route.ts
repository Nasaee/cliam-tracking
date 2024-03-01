import express, { Request, Response } from 'express';
import { deleteUser, getAllUsers, updateRole } from './admin.controller';

const adminRouter = express.Router();

// /api/v1/admin/...
adminRouter.post('/all-users', getAllUsers);

adminRouter.delete('/user/:id', deleteUser);

adminRouter.patch('/user/:id', updateRole);

export default adminRouter;
