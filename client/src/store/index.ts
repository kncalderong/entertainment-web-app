import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import motionPicturesReducer from '../features/motionPictures/motionPictureSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    motionPictures: motionPicturesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
