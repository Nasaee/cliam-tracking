import express from 'express';
import usersRouter from './user/users.route';
import authRouter from './auth/auth.route';
import verifyToken from '../middlewares/verifyToken.middleware';
import adminRouter from './admin/admin.route';
import checkUserRole from '../middlewares/checkUserRole';

const apiV1 = express.Router();

// /api/v1/...
apiV1.use('/auth', authRouter);
apiV1.use('/users', usersRouter);
apiV1.use('/admin', verifyToken, checkUserRole('admin'), adminRouter);

export default apiV1;
