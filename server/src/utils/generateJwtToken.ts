import jwt from 'jsonwebtoken';
import { UserType } from '../models/user/user.mongo';

const generateJwtToken = (user: UserType) => {
  return jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: '7d' }
  );
};

export default generateJwtToken;
