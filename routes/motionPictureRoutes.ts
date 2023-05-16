import express from 'express';
const router = express.Router();
import { createMotionPicture, getAllMotionPictures } from 'controllers/motionPictureController.js';
import authenticateUser from 'middleware/auth.js';

router.route('/').post(createMotionPicture).get(authenticateUser, getAllMotionPictures)

export default router