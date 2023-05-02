import { createSlice } from "@reduxjs/toolkit";

export type ThumbnailType = {
  trending?: {
    small: string,
    large: string
  }
  regular: {
    small: string,
    medium: string,
    large: string
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
  isSearching: boolean
  searchQuery: string
}

const initialState: MotionPicturesState = {
  motionPictures: [],
  totalMotionPictures: 0,
  numOfPages: 0,
  isLoading: false,
  isSearching: false,
  searchQuery: ""
}

export const motionPicturesSlice = createSlice({
  name: "motionPictures",
  initialState,
  reducers: {
    updateMotionPictures: (state, { payload }) => {
      state.motionPictures = payload.motionPictures || state.motionPictures
      state.totalMotionPictures = payload.totalMotionPictures || state.totalMotionPictures
      state.numOfPages = payload.numOfPages || state.numOfPages
    },
    isLoadingMotionPictures: (state, { payload }) => {
      state.isLoading  = payload.isLoading
    },
    isSearchingMotionPictures: (state, { payload }) => {
      state.isSearching = payload.isSearching
    },
    updateSearchQuery: (state, { payload }) => {
      state.searchQuery = payload.searchQuery
    }
  }
})

export const {updateMotionPictures, isSearchingMotionPictures, isLoadingMotionPictures, updateSearchQuery} = motionPicturesSlice.actions

export default motionPicturesSlice.reducer