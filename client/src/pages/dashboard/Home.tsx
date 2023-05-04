import { useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Loading from '../../components/Loading'
import getMotionPictures from '../../utils/getMotionPictures'
import { isLoadingMotionPictures, isSearchingMotionPictures, updateMotionPictures } from '../../features/motionPictures/motionPictureSlice'
import { useNavigate } from 'react-router-dom'
import { MotionPictureType } from '../../features/motionPictures/motionPictureSlice'
import MotionPictureGrid from '../../components/MotionPictureGrid'
import MotionPictureSlide from '../../components/MotionPictureSlide'
import updateBookmarks from '../../utils/updateBookmarks'
import { updateBookmarksSlice } from '../../features/user/userSlice'


const Home = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLoading = useAppSelector((state) => state.motionPictures.isLoading)
  const isSearching = useAppSelector((state) => state.motionPictures.isSearching)
  const motionPictures = useAppSelector((state) => state.motionPictures.motionPictures)
  const searchQuery = useAppSelector((state) => state.motionPictures.searchQuery)
  const trendingMotionPictures = motionPictures.filter((motionPicture: MotionPictureType) => motionPicture.isTrending === true)
  const bookmarkedMotionPictures: string[] = useAppSelector((state) => state.user.bookmarks)

  useEffect(() => {
    if (!isSearching) {
      (async () => {
        dispatch(isLoadingMotionPictures({
          isLoading: true,
        }))
        dispatch(isSearchingMotionPictures({
          isSearching: false
        }))
        const motionPictures = await getMotionPictures("All")
        if (motionPictures) {
          dispatch(updateMotionPictures({
            motionPictures: motionPictures.motionPictures,
            numOfPages: motionPictures.numOfPages,
            totalMotionPictures: motionPictures.totalMotionPictures
          }))
          dispatch(isLoadingMotionPictures({
            isLoading: false,
          }))
        }
        if (!motionPictures) {
          dispatch(isLoadingMotionPictures({
            isLoading: false,
          }))
          navigate('/sign-in')
        }
      })()
    }
  }, [isSearching])
  
  const updateBookmarksHandler = async (motionPictureId: string) => {
    const newMotionPictures = await updateBookmarks(motionPictureId, bookmarkedMotionPictures)
    if (newMotionPictures) {
      dispatch(updateBookmarksSlice({
        bookmarks: newMotionPictures
      }))
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (!isLoading && isSearching) {
    return (
      <section className='px-4 pb-16 pt-6 w-full'>
        <p className='text-white text-xl mb-6'>{`Found ${motionPictures.length} results for '${searchQuery}'`}</p>
        <div className='flex flex-wrap gap-4'>
          {motionPictures.map((motionPicture: MotionPictureType) => {
            return (
              <MotionPictureGrid motionPicture={motionPicture} key={motionPicture._id} isBookMarked={bookmarkedMotionPictures.includes(motionPicture._id)} bookmarkHandler={updateBookmarksHandler} />
            )
          })}
        </div>
      </section>
    )
  }
  return (
    <section className='px-4 pb-16 pt-6'>
      <p className='text-white text-xl mb-6'>Trending</p>
      <div className='w-[360px] mr-[-15px] flex relative overflow-auto gap-4 mb-6'>
        {trendingMotionPictures.map((motionPicture: MotionPictureType) => {
          return (
            <MotionPictureSlide isBookMarked={bookmarkedMotionPictures.includes(motionPicture._id)} key={motionPicture._id} motionPicture={motionPicture} bookmarkHandler={updateBookmarksHandler} />
          )
        })}
      </div>
      <p className='text-white text-xl mb-6'>Recommended for you</p>
      <div className='flex flex-wrap gap-4'>
        {motionPictures.map((motionPicture: MotionPictureType) => {
          return (
            <MotionPictureGrid motionPicture={motionPicture} key={motionPicture._id} isBookMarked={bookmarkedMotionPictures.includes(motionPicture._id)} bookmarkHandler={updateBookmarksHandler} />
          )
        })}
      </div>
    </section>
  )
}

export default Home
