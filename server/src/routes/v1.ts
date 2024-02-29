import express from 'express';
import usersRouter from './user/users.route';
import authRouter from './auth/auth.route';
import verifyToken from '../middlewares/verifyToken.middleware';
import adminRouter from './admin/admin.route';
import checkUserRole from '../middlewares/checkUserRole';

const api = express.Router();

// /api/v1/...
api.use('/auth', authRouter);
api.use('/users', usersRouter);
api.use('/admin', verifyToken, checkUserRole('admin'), adminRouter);

export default api;
