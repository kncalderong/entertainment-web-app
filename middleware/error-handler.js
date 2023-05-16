import { StatusCodes } from 'http-status-codes';

/* interface Error {
  statusCode: number;
  message: string
  name?: string
  code?: number
  errors: []
  keyValue?: string
} */

const errorHandlerMiddleware = (err, req, res, next) => {  
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  }
  if (err.name === 'ValidationError') { //this is to handle the info from mongoose validation errors
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = Object.values(err.errors)
      .map((item) => item)
      .join(',')
  }
  if (err.code && err.code === 11000) { //this is to handle the 'unique' catch from mongoose 
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = `${Object.keys(err.keyValue || '')} field has to be unique`
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware