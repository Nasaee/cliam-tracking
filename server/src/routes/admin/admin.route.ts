import express from 'express';
import { deleteUser, getAllUsers, updateRole } from './admin.controller';

const adminRouter = express.Router();

// /api/v1/admin/...
adminRouter.get('/all-users', getAllUsers);

adminRouter.delete('/user/:id', deleteUser);

adminRouter.patch('/user/:id', updateRole);

export default adminRouter;
