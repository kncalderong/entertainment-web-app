import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error { //here I'm extending the Error class to control the message sended
  constructor(message: string) {
    super(message);
  }
}

export default CustomAPIError