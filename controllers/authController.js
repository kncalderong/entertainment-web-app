import { StatusCodes } from 'http-status-codes';
import User from "../models/User.js";
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import attachCookie from '../utils/attachCookie.js';

/* ---------REGISTER ---------- */
const register = async (req, res) => {
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
  res.status(StatusCodes.CREATED).json({ user, bookmarks: [] });
}

/* ---------LOGIN ---------- */
const login = async (req, res) => {
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
  
  res.status(StatusCodes.OK).json({ user, bookmarks: user?.bookmarks || [] });
}

/* ---------GET CURRENT USER  ---------- */
const getCurrentUser = async (req, res) => { 
  const user = await User.findOne({ _id: req.user?.userId || ''}); // this is based on the token authorization middleware, so every time the front end reloads the page, this request is made to get the info from the current user again available
  res.status(StatusCodes.OK).json({ user, bookmarks: user?.bookmarks || [] });
};

/* ---------LOGOUT  ---------- */
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()), //expires immediately the coookie, so any further request won't have a valid cookie and in  the front I can redirect to landing page
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

/* --------- UPDATE USER ---------- */
const updateUser = async (req , res) => {
  const { bookmarks } = req.body;
  if (!bookmarks) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user?.userId || '' });
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  user.bookmarks = bookmarks

  await user.save();

  const token = user.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ user, bookmarks: user.bookmarks });
};

export {register, login, getCurrentUser, logout, updateUser}