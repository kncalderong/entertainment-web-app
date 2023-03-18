import { StatusCodes } from 'http-status-codes';
import User from "../models/User";
import { BadRequestError, UnAuthenticatedError } from '../errors';
import { Request, Response } from 'express';
import attachCookie from '../utils/attachCookie';

/* ---------REGISTER ---------- */
const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new BadRequestError('please provide all values')
  }
  
  const userAlreadyExists = await User.findOne({ email })
  
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }

  const user =  await User.create({ email, password })

  const token = user.createJWT()
  attachCookie({ res, token })
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email
    }
  })
}

/* ---------LOGIN ---------- */
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new BadRequestError('please provide all values')
  }
  
  const user = await User.findOne({ email }).select('+password'); //here I have to include again the password field of the document 'couse I need to compare it with the input one 
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  
  const token = user.createJWT()
  attachCookie({ res, token });
  user.password = undefined; // here I am removing again the hashed password from the response
  
  res.status(StatusCodes.OK).json({ user });
}

/* const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.user.userId || ''
  
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user});
}; */
export {register, login}