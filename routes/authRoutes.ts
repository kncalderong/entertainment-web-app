import express from 'express';
const router = express.Router();

import {
  register,
  login,
  getCurrentUser,
  logout
} from '../controllers/authController';
import authenticateUser from '../middleware/auth';

router.route('/register').post( register);
router.route('/login').post(login);
router.route('/logout').get(login);
router.route('/getCurrentUser').get(authenticateUser ,getCurrentUser);

export default router;
