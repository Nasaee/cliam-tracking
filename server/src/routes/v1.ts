import express from 'express';
import usersRouter from './user/users.route';
import authRouter from './auth/auth.route';
import verifyToken from '../middlewares/verifyToken.middleware';
import adminRouter from './admin/admin.route';
import checkUserRole from '../middlewares/checkUserRole';
import applierRouter from './applier/applier.route';
import otherProductsRouter from './otherProducts/otherProducts.route';

const apiV1 = express.Router();

// /api/v1/...
apiV1.use('/auth', authRouter);
apiV1.use('/users', usersRouter);
apiV1.use('/admin', verifyToken, checkUserRole('admin'), adminRouter);
apiV1.use(
  '/applier',
  verifyToken,
  checkUserRole('admin', 'editor', 'user'),
  applierRouter
);
apiV1.use(
  '/other-products',
  verifyToken,
  checkUserRole('admin', 'editor', 'user'),
  otherProductsRouter
);

export default apiV1;
