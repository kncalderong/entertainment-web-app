import MotionPicture from "../models/MotionPicture";
import { Request, Response } from 'express';
import { RequestWithUser } from './../middleware/auth';
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

interface QueryObject {
  category?: string
  title?: any
}


/**----------- CREATE MOTIONPICTURE -----------**/
const createMotionPicture = async (req: Request, res: Response) => {
  const {title, thumbnail, year, category, rating, isTrending = false} = req.body
  if (!title || !thumbnail || !year || !category || !rating ) {
    throw new BadRequestError('Please provide all values');
  }
  const motionPicture = await MotionPicture.create({ title, thumbnail, year, category, rating, isTrending })
  res.status(StatusCodes.OK).json({motionPicture})
}


/**----------- CET ALL MOTION PICTURES -----------**/
const getAllMotionPictures = async (req: Request, res: Response) => {
  const { category, sort = 'a-z', search } = req.query;
  
  let queryObject: QueryObject = {}
  
  if (category && category !== 'all' && typeof category === 'string') {
    queryObject.category = category
  }
  if (search) {
    queryObject.title = { $regex: search, $options: 'i' };
  }
  
  let result = MotionPicture.find(queryObject)
  
  // chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('title');
  }
  if (sort === 'z-a') {
    result = result.sort('-title');
  }
  
   // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  
  const motionPictures = await result
  
  const totalMotionPictures = await MotionPicture.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalMotionPictures / limit);
  
  res.status(StatusCodes.OK).json({ motionPictures, totalMotionPictures, numOfPages });
}
export {createMotionPicture, getAllMotionPictures}