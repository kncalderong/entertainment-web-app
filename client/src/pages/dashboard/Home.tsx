import { useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Loading from '../../components/Loading'
import getMotionPictures from '../../utils/getMotionPictures'
import { isLoadingMotionPictures, isSearchingMotionPictures, updateMotionPictures } from '../../features/motionPictures/motionPictureSlice'
import { useNavigate } from 'react-router-dom'
import { MotionPictureType } from '../../features/motionPictures/motionPictureSlice'

const Home = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLoading = useAppSelector((state) => state.motionPictures.isLoading)
  const isSearching = useAppSelector((state) => state.motionPictures.isSearching)
  const motionPictures = useAppSelector((state) => state.motionPictures.motionPictures)
  const trendingMotionPictures = motionPictures.filter((motionPicture: MotionPictureType) => motionPicture.isTrending === true)

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
  return (
    <div>
      <SearchBar category="All" />
      {isLoading ? <Loading /> : isSearching ? <section>
        Here the results from search
      </section> : <section>
        {motionPictures.map((motionPicture: MotionPictureType) => {
          return (
            <article>
              1
            </article>
          )
        })}
      </section>}
    </div>
  )
}

export default Home
