import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors';
import {Request, Response, NextFunction} from 'express'

export interface RequestWithUser extends Request {
  user?: {
    userId: string
  }
}

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || '');
    console.log('payload from auth middleware: ' + payload);
    req.user = { userId: payload.userId }; //here I am passing the user info in the request object to further controllers
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
}

export default auth;