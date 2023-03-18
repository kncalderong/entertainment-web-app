import express from 'express';
const router = express.Router();
import { createMotionPicture } from '../controllers/motionPictureController';

router.route('/').post(createMotionPicture)

export default router