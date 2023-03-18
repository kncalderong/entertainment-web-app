import MotionPicture from "../models/MotionPicture";
import { Request, Response } from 'express';
import { RequestWithUser } from './../middleware/auth';
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

const createMotionPicture = async (req: Request, res: Response) => {
  const {title, thumbnail, year, category, rating, isTrending = false} = req.body
  if (!title || !thumbnail || !year || !category || !rating ) {
    throw new BadRequestError('Please provide all values');
  }
  const motionPicture = await MotionPicture.create({ title, thumbnail, year, category, rating, isTrending })
  res.status(StatusCodes.OK).json({motionPicture})
}

export {createMotionPicture}