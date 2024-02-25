import express from 'express';
import usersRouter from './routes/users.route';

const api = express.Router();

// /api/v1/users
api.use('/users', usersRouter);

export default api;
