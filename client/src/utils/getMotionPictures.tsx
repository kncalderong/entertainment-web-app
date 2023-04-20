import axios, { AxiosError } from "axios"

const getMotionPictures = async (category: "TV Series" | 'Movie' | "Bookmarked" | "All") => {
  let urlGetMotionPictures = `/api/v1/motion-picture`
  if (category === "TV Series" || category === "Movie") {
    urlGetMotionPictures = urlGetMotionPictures.concat(`?category=${category}`)
  }
  if (category === "Bookmarked") {
    urlGetMotionPictures = urlGetMotionPictures.concat(`?bookmarks=true`)
  }
  try {
    const res = await axios.get(urlGetMotionPictures)
    return res.data
  } catch (error) {
    const err = error as AxiosError
    if (err.response?.status === 401) {
      return
    }
  }
}

export default getMotionPictures