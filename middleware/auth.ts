import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors';
import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose';

export interface RequestWithUser extends Request {
  user?: {
    userId: string,
    bookmarks: [mongoose.Types.ObjectId]
  }
}

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = { userId: payload.userId, bookmarks: payload.bookmarks}; //here I am passing the user info in the request object to further controllers
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
}

export default auth;