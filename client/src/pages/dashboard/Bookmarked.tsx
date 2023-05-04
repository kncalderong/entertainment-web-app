import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Loading from '../../components/Loading'
import getMotionPictures from '../../utils/getMotionPictures'
import { isLoadingMotionPictures, isSearchingMotionPictures, updateMotionPictures } from '../../features/motionPictures/motionPictureSlice'
import { useNavigate } from 'react-router-dom'
import { MotionPictureType } from '../../features/motionPictures/motionPictureSlice'
import MotionPictureGrid from '../../components/MotionPictureGrid'

const Bookmarked = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLoading = useAppSelector((state) => state.motionPictures.isLoading)
  const isSearching = useAppSelector((state) => state.motionPictures.isSearching)
  const motionPictures = useAppSelector((state) => state.motionPictures.motionPictures)
  const searchQuery = useAppSelector((state) => state.motionPictures.searchQuery)
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
        const motionPictures = await getMotionPictures("Bookmarked")
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
              <MotionPictureGrid motionPicture={motionPicture} key={motionPicture._id} isBookMarked={bookmarkedMotionPictures.includes(motionPicture._id)} />
            )
          })}
        </div>
      </section>
    )
  }
  return (
    <section className='px-4 pb-16 pt-6'>
      <p className='text-white text-xl mb-6'>Bookmarked Movies</p>
      <div className='flex flex-wrap gap-4'>
        {motionPictures.filter((motionPicture: MotionPictureType) => motionPicture.category === 'Movie').map((motionPicture: MotionPictureType) => {
          return (
            <MotionPictureGrid motionPicture={motionPicture} key={motionPicture._id} isBookMarked={bookmarkedMotionPictures.includes(motionPicture._id)} />
          )
        })}
      </div>
      <p className='text-white text-xl mb-6 mt-6'>Bookmarked TV Series</p>
      <div className='flex flex-wrap gap-4'>
        {motionPictures.filter((motionPicture: MotionPictureType) => motionPicture.category === 'TV Series').map((motionPicture: MotionPictureType) => {
          return (
            <MotionPictureGrid motionPicture={motionPicture} key={motionPicture._id} isBookMarked={bookmarkedMotionPictures.includes(motionPicture._id)} />
          )
        })}
      </div>
    </section>
  )
}

export default Bookmarked
