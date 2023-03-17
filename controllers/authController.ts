import { StatusCodes } from 'http-status-codes';
import User from "../models/User";
import { BadRequestError, UnAuthenticatedError } from '../errors';
import { Request, Response } from 'express';
import attachCookie from '../utils/attachCookie';


const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new BadRequestError('please provide all values')
  }
  
  const userAlreadyExists = await User.findOne({ email })
  
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }

  const user = await User.create({email, password})
  
  const token = user.createJWT()
  attachCookie({ res, token })
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email
    }
  })
}

export {register}