import axios, { AxiosError } from "axios"


const updateBookmarks = async (motionPictureId: string, bookmarks: string[]) => {
  let urlUpdateBookmarks = `/api/v1/auth/updateUser`
  const bodyObj = bookmarks.includes(motionPictureId) ? bookmarks.filter((id: string)=> id !== motionPictureId) : bookmarks.concat(motionPictureId);
  try {
    const res = await axios.patch(urlUpdateBookmarks, { bookmarks: bodyObj })
    return res.data.bookmarks    
  } catch (error) {
    const err = error as AxiosError
    if (err.response?.status === 401) {
      return
    }
  }
}

export default updateBookmarks