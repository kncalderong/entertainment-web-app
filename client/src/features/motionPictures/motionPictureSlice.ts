import { createSlice } from "@reduxjs/toolkit";

export type ThumbnailType = {
  trending?: {
    small: String,
    large: String
  }
  regular: {
    small: String,
    medium: String,
    large: String
  }
}

export type MotionPictureType = {
  title: string
  thumbnail: ThumbnailType
  year: number
  category: "TV Series" | 'Movie'
  rating: 'PG' | 'E' | '18+'
  isTrending: boolean
  createdAt: string
  updatedAt: string
  _id: string
}

export type MotionPicturesState = {
  motionPictures: [MotionPictureType] | []
  totalMotionPictures: number
  numOfPages: number
  isLoading: boolean
}

const initialState: MotionPicturesState = {
  motionPictures: [],
  totalMotionPictures: 0,
  numOfPages: 0,
  isLoading: false
}

export const motionPicturesSlice = createSlice({
  name: "motionPictures",
  initialState,
  reducers: {
    updateMotionPictures: (state, { payload }) => {
      state.motionPictures = payload.motionPictures || initialState.motionPictures
      state.totalMotionPictures = payload.totalMotionPictures || initialState.totalMotionPictures
      state.numOfPages = payload.numOfPages || initialState.numOfPages
      state.isLoading = payload.isLoading
    }
  }
})

export const {updateMotionPictures} = motionPicturesSlice.actions

export default motionPicturesSlice.reducer