import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

/* export interface RequestWithUser extends Request {
  user?: {
    userId: string
  }
} */

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = { userId: payload.userId}; //here I am passing the user info in the request object to further controllers
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
}

export default auth;