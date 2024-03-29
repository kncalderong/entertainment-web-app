import express from 'express';
const router = express.Router();

import {
  register,
  login,
  getCurrentUser,
  logout, 
  updateUser
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';

router.route('/register').post(register);
router.route('/login').post( login);
router.route('/logout').get(logout);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router;
