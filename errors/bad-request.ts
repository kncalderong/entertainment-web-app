import { StatusCodes } from 'http-status-codes';
import CustomAPIError from "./custom-api.js";

class BadRequestError extends CustomAPIError {
  statusCode: number
  
  constructor(message: string,) { //this method is called when an object instance is created and initialized
    super(message); // can be a 'property lookup' or a 'function call'...  must be called before the this keyword is used, and before the constructor returns. It calls the parent class's constructor and binds the parent class's public fields, after which the derived class's constructor can further access and modify this.
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export default BadRequestError