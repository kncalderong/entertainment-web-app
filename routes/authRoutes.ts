import express from 'express';
const router = express.Router();
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 request per 15 minutes
  message: 'to many requests from this Ip address, please try again after 15 minutes'
})

import {
  register,
  login,
  getCurrentUser,
  logout, 
  updateUser
} from '../controllers/authController';
import authenticateUser from '../middleware/auth';

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/logout').get(logout);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router;
