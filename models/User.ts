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
      validator: function (this: User) { //this is invoked when a user is created or modified with save() method
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
    select: false, //this is to do not share the password in the response back
  },
})

UserSchema.pre('save', async function () { //This is only triggered when a user is created or modified with save() method
  // console.log(this.modifiedPaths()) 
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


//This is a custom method for the document instances
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model('User', UserSchema)