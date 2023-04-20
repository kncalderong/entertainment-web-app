import React from 'react'
import SearchBar from '../../components/SearchBar'
import { useAppSelector } from '../../store/hooks'
import Loading from '../../components/Loading'


const Home = () => {
  const isLoading = useAppSelector((state) => state.motionPictures.isLoading)

  return (
    <div>
      <SearchBar category="All" />
      {isLoading ? <Loading/> : <div>Home</div> }
    </div>
  )
}

export default Home
