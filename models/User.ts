import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface User {
  email: string
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: function (this: User) {
        return validator.isEmail
      },
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: [6, 'Please provide at least 6 characters in your password'],
    select: false,
  },
})

export default mongoose.model('User', UserSchema)