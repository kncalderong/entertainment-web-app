import mongoose from "mongoose";

const MotionPictureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: 150,
  },
  thumbnail: {
    trending: {
      small: String,
      large: String
    },
    regular: {
      small: String,
      medium: String,
      large: String
    }
  },
  year: Number,
  category: {
    type: String,
    enum: ['TV Series', 'Movie'],
    required: [true, 'Please provide a category'],
  },
  rating: {
    type: String,
    enum: ['PG', 'E', '18+'],
    required: [true, 'Please provide a rating'],
  },
  isTrending: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true }
)

export default mongoose.model('MotionPicture', MotionPictureSchema)