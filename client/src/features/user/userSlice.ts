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

  }
})

export default userSlice.reducer