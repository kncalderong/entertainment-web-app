import express from 'express';
const router = express.Router();
import { createMotionPicture, getAllMotionPictures } from '../controllers/motionPictureController';
import authenticateUser from '../middleware/auth';

router.route('/').post(createMotionPicture).get(authenticateUser, getAllMotionPictures)

export default router