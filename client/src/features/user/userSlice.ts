import { createSlice } from "@reduxjs/toolkit";

export type userType = {
  email: string
  userId: string
  bookmarks: [string] | []
}

const initialState: userType = {
  email: "",
  userId: "",
  bookmarks: []
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {     
      state.email = payload.email
      state.userId = payload._id
      state.bookmarks = payload.bookmarks
    },
    updateBookmarksSlice: (state, { payload }) => {
      state.bookmarks = payload.bookmarks
    }
  }
})

export const {addUser, updateBookmarksSlice} = userSlice.actions

export default userSlice.reducer