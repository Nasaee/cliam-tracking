import express from 'express';
import usersRouter from './routes/user/users.route';
import authRouter from './routes/auth/auth.route';

const api = express.Router();

// /api/v1/...
api.use('/auth', authRouter);
api.use('/users', usersRouter);

export default api;
